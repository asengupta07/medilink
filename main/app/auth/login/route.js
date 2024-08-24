"use server"

import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import { UserSchema } from "@/app/_models/schema";
import mongoose from 'mongoose';
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

async function posthandler(req) {
    await connectToDatabase();

    let body;

    try {
        body = await req.json();
    }
    catch (error) {
        console.error("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isValid = await compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "30d" });

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error("Error logging in user", error);
        return NextResponse.json({ error: "Error logging in user" }, { status: 500 });
    }
}

export {
    posthandler as POST
}