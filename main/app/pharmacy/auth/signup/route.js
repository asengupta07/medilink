import { ProviderSchema, RatingSchema } from "@/app/_models/schema";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { hash } from "bcrypt";
import { NextResponse } from 'next/server';

const secretKey = process.env.SECRET_KEY;

async function posthandler(req) {
    await connectToDatabase();
    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.log("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, email, phone, password, type, address, latitude, longitude } = body;

    if (!name || !email || !phone || !password || !type || !address || latitude === undefined || longitude === undefined) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const Provider = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);
    const Rating = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);

    const hashedPassword = await hash(password, 10);

    try {
        const existingProvider = await Provider.findOne({ email });
        if (existingProvider) {
            return NextResponse.json({ error: "Provider already exists" }, { status: 400 });
        }

        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        };

        const provider = new Provider({
            name,
            email,
            phone,
            password: hashedPassword,
            type,
            address,
            location
        });

        await provider.save();

        const rating = new Rating({ providerId: provider._id, rating: 0 });
        await rating.save();

        const token = jwt.sign({ providerId: provider._id }, secretKey, { expiresIn: "30d" });

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error("Error saving provider", error);
        return NextResponse.json({ error: "Failed to register provider" }, { status: 500 });
    }
}

export {
    posthandler as POST
}
