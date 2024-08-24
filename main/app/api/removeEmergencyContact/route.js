"use server";

import { UserEmergencyContactSchema } from "@/app/_models/schema";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import { verifyToken } from "@/app/_middleware/auth";

async function posthandler(req) {
    await connectToDatabase();

    const { token, contactId } = await req.json();
    const userId = await verifyToken(token);
    const UserEmergencyContact = mongoose.models.UserEmergencyContact || mongoose.model('UserEmergencyContact', UserEmergencyContactSchema);

    const user = await UserEmergencyContact.findOne({ userId });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.emergencyContacts = user.emergencyContacts.filter(contact => contact._id.toString() !== contactId);
    await user.save();

    return NextResponse.json({ message: 'Contact removed successfully' });
}

export {
    posthandler as POST
}