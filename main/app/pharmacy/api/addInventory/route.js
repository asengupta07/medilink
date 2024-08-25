"use server";

import { MedicineSchema } from "@/app/_models/schema";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import { verifyToken } from "@/app/_middleware/auth";

async function posthandler(req) {
    await connectToDatabase();

    const { token, name, description, price, quantity, expirationDate } = await req.json();
    const providerId = await verifyToken(token);

    const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);

    const medicine = new Medicine({ providerId, name, description, price, quantity, expirationDate });
    await medicine.save();

    return NextResponse.json({ message: 'Medicine added successfully' });
}

export {
    posthandler as POST
}