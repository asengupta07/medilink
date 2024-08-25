"use server";

import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/_middleware/mongodb'; // Your MongoDB connection utility
import { ProviderSchema } from '@/app/_models/schema';
import mongoose from "mongoose";
import { verifyToken } from '@/app/_middleware/auth';

async function gethandler(req) {
    await connectToDatabase();

    const Provider = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);

    const { token} = req.headers.get('Authorization');

    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    try {
        const providerId = await verifyToken(token);
        const providers = await Provider.findOne({ _id: providerId });
        return NextResponse.json({ providers }, { status: 200 });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export {
    gethandler as GET
}