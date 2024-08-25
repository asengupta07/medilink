"use server";

import { MedicineSchema } from "@/app/_models/schema";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";

async function posthandler(req) {
    await connectToDatabase();

    const { providerId } = await req.json();

    const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);
    
    const provider = await Medicine.findById(providerId);
    if (!provider) {
        return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }
    const data = {
        provider: provider
    };

    return NextResponse.json({ data });
}

export {
    posthandler as POST
}