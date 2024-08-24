"use server";

import { NextResponse } from "next/server";
import { OrderSchema, MedicineSchema } from "@/app/_models/schema";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import { verifyToken } from "@/app/_middleware/auth";

async function posthandler(req) {
    await connectToDatabase();

    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const token = req.headers.get('Authorization');
    const userId = await verifyToken(token);

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", MedicineSchema);
    const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

    const newOrder = new Order({
        userId,
        providerId: body.providerId,
        name: body.name,
        phone: body.phone,
        cart: body.cart
    });

    try {
        await newOrder.save();

        // Update stock levels
        for (const item of body.cart) {
            const medicine = await Medicine.findOne({ _id: item.medicineId });

            if (medicine) {
                if (medicine.stock < item.quantity) {
                    return NextResponse.json({ error: `Insufficient stock for ${item.name}` }, { status: 400 });
                }
                medicine.stock -= item.quantity;
                medicine.inStock = medicine.stock > 0;
                await medicine.save();
            } else {
                return NextResponse.json({ error: `Medicine not found: ${item.name}` }, { status: 404 });
            }
        }

        return NextResponse.json({ message: "Order placed successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error saving order", error);
        return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
    }
}

export { 
    posthandler as POST
}