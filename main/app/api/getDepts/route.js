"use server";

import { ProviderSchema, DepartmentSchema } from "@/app/_models/schema";
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
    const Departments = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);

    const provider = await Providers.findById(id);
    if (!provider) {
        return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const departmentsDoc = await Departments.findOne({ providerId: id });
    const departments = departmentsDoc ? departmentsDoc.departments : [];

    const data = {
        departments: departments
    };

    return NextResponse.json(data);
}

export {
    posthandler as POST
}
