"use server"

import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import { UserSchema } from "@/app/_models/schema";
import mongoose from 'mongoose';
import { verifyToken } from "@/app/_middleware/auth";

async function gethandler(req) {
    await connectToDatabase();

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const token = req.headers.get('Authorization');

    try {
        const userId = await verifyToken(token);
        const users = await User.findOne({ _id: userId });
        const name = users.firstName + " " + users.lastName;
        return NextResponse.json({ name }, { status: 200 });
    } catch (error) {
        console.error("Error getting users", error);
        return NextResponse.json({ error: "Error getting users" }, { status: 500 });
    }
}

export {
    gethandler as GET
}