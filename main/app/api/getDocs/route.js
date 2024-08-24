"use server";

import { ProviderSchema, DoctorSchema, DepartmentSchema } from "@/app/_models/schema";
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
    const Providers = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);
    const Doctors = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);

    const provider = await Providers.findById(id);
    if (!provider) {
        return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }
    const allDoctors = await Doctors.find();
    if (!allDoctors.length) {
        console.log("No doctors found");
        return NextResponse.json({ error: "No doctors found for this provider" }, { status: 404 });
    }

    const filteredDoctors = allDoctors.filter(doctor => doctor.providerId.toString() === id);

    if (!filteredDoctors.length) {
        console.log("No doctors found for this provider ID");
        return NextResponse.json({ error: "No doctors found for this provider" }, { status: 404 });
    }

    const data = filteredDoctors.map(doctor => ({
        id: doctor._id,
        name: doctor.name,
        department: doctor.specialization,
        rating: doctor.rating,
        fee: doctor.fee,
        image: "/pp.png",
        qualifications: doctor.education.join(", "),
        experience: doctor.experience,
        availability: doctor.timings.map(timing => timing.day.slice(0, 3)) 
    }));

    return NextResponse.json(data);
}

export {
    posthandler as POST
}
