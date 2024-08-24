"use server";

import { NextResponse } from "next/server";
import { AppointmentSchema } from "@/app/_models/schema";
import mongoose from 'mongoose'
import connectToDatabase from "@/app/_middleware/mongodb"
import { verifyToken } from "@/app/_middleware/auth";

const secretKey = process.env.SECRET_KEY

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

    const { token } = req.headers.get('Authorization');

    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const { time, docId } = body;

    try {
        const providerId = verifyToken(token);

        const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
        const appointments = await Appointment.find({ time, docId });

        return NextResponse.json({ appointments }, { status: 200 });
    } catch (error) {
        console.error("Error getting appointments", error);
        return NextResponse.json({ error: "Error getting appointments" }, { status: 500 });
    }
}

export {
    posthandler as POST
}