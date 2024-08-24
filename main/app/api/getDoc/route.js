"use server";

import { NextResponse } from "next/server";
import { DoctorSchema, DocReviewSchema, UserSchema } from "@/app/_models/schema";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";

async function posthander(req) {
    await connectToDatabase();

    const Doctors = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
    const DocReviews = mongoose.models.DocReview || mongoose.model('DocReview', DocReviewSchema);
    const Users = mongoose.models.User || mongoose.model('User', UserSchema);

    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { id } = body;
    
    if (!id) {
        return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });
    }

    try {
        const doctor = await Doctors.findById(id);
        const reviews = await DocReviews.find({ doctorId: id });
        if (!doctor) {
            return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
        }
        
        const reviewsWithUserNames = await Promise.all(
            reviews.map(async (review) => {
                const user = await Users.findById(review.userId);
                return {
                    ...review._doc,
                    name: user ? `${user.firstName} ${user.lastName}` : 'Unknown User'
                };
            })
        );

        const data = {
            id: doctor._id,
            name: doctor.name,
            specialization: doctor.specialization,
            providerId: doctor.providerId,
            rating: doctor.rating,
            fee: doctor.fee,
            timings: doctor.timings,
            contactInfo: doctor.contactInfo,
            experience: doctor.experience,
            education: doctor.education.join(", "),
            languages: doctor.languages.join(", "),
            bio: doctor.bio,
            awards: doctor.awards.join(", "),
            createdAt: doctor.createdAt,
            updatedAt: doctor.updatedAt,
            numRev: reviews.length,
            reviews: reviewsWithUserNames.map(review => ({
                id: review._id,
                name: review.name,
                rating: review.rating,
                comment: review.review,
            }))
        };
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching doctor data", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

export {
    posthander as POST
}