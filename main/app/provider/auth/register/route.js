"use server";

import { NextResponse } from "next/server";
import { ProviderSchema } from "@/app/_models/schema";
import mongoose from 'mongoose'
import connectToDatabase from "@/app/_middleware/mongodb"
import { hash } from "bcrypt"
import jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET_KEY

async function posthandler(req) {
    await connectToDatabase();
    let body;

    try {
        body = await req.json();
    } catch (error) {
        console.log("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, email, phone, type, password, latitude, longitude } = body;

    if (!name || !email || !phone || !type || !password || !latitude || !longitude) {
        console.log("haha error")
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const Provider = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);

    const hashedPassword = await hash(password, 10);

    try {
        const existingProvider = await Provider.findOne({ email });
        if (existingProvider) {
            console.log("Provider already exists")
            return NextResponse.json({ error: "Provider already exists" }, { status: 400 });
        }
        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }

        const provider = new Provider({ name, email, phone, type, password: hashedPassword, location });

        await provider.save();

        const token = jwt.sign({ providerId: provider._id }, secretKey, { expiresIn: "30d" });

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.log("Error saving provider", error);
        return NextResponse.json({ error: "Error saving provider" }, { status: 500 });
    }
}

export {
    posthandler as POST
}