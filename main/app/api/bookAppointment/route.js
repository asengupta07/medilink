"use server";

import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import { verifyToken } from "@/app/_middleware/auth";
import { AppointmentSchema } from "@/app/_models/schema";

async function posthandler(req) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const token = req.headers.get("Authorization");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const Appointments = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
    
    const userId = await verifyToken(token);

    const requiredFields = [
        "patientName",
        "patientAge",
        "patientGender",
        "patientPhone",
        "patientEmail",
        "appointmentDay",
        "appointmentTime",
        "docId",
        "presentingComplaints",
        "history",
    ];

    for (const field of requiredFields) {
        if (!body[field]) {
            console.log(field);
            console.log(body);
            return NextResponse.json({ error: `${field} is required` }, { status: 400 });
        }
    }

    const appointment = new Appointments({
        userId,
        isForSelf: body.isForSelf,
        patientName: body.patientName,
        patientAge: body.patientAge,
        patientGender: body.patientGender,
        patientPhone: body.patientPhone,
        patientEmail: body.patientEmail,
        appointmentDay: body.appointmentDay,
        appointmentTime: body.appointmentTime,
        docId: body.docId,
        presentingComplaints: body.presentingComplaints,
        history: body.history,
        clinicalFindings: body.clinicalFindings,
        medicalHistory: body.medicalHistory,
        medicalConditions: body.medicalConditions
    });

    try {
        const savedAppointment = await appointment.save();
        return NextResponse.json(savedAppointment, { status: 201 });
    } catch (error) {
        console.error("Error saving appointment:", error);
        return NextResponse.json({ error: "Failed to save appointment" }, { status: 500 });
    }
}

export {
    posthandler as POST
}
