"use server";

import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/_middleware/mongodb'; // Your MongoDB connection utility
import { ProviderSchema } from '@/app/_models/schema';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { compare } from "bcrypt";

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

    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const Provider = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);

    try {
        const provider = await Provider.findOne({ email });
        if (!provider) {
            return NextResponse.json({ error: "Provider not found" }, { status: 404 });
        }

        const passwordMatch = await compare(password, provider.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const token = jwt.sign({ providerId: provider._id }, secretKey, { expiresIn: "30d" });

        return NextResponse.json({ token }, { status: 200 });
    }
    catch (error) {
        console.error("Error logging in provider", error);
        return NextResponse.json({ error: "Failed to log in provider" }, { status: 500 });
    }
}

export {
    posthandler as POST
}
