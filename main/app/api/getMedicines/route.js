"use server";

import { MedicineSchema } from "@/app/_models/schema";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";

async function posthandler(req) {
    await connectToDatabase();

    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.log("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { id } = body;
    const Medicines = mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);

    const medicine = await Medicines.find({ providerId: id });
    if (!medicine) {
        return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json(medicine);
}

export {
    posthandler as POST
}