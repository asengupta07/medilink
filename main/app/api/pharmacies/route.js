"use server";

import { ProviderSchema, RatingSchema } from "@/app/_models/schema";
import { NextResponse } from "next/server";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (angle) => angle * (Math.PI / 180);
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

async function posthandler(req) {
    await connectToDatabase();

    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.log("Error parsing request body", error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { latitude, longitude } = body;

    if (latitude === undefined || longitude === undefined) {
        return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 });
    }

    const maxRadius = 40000;
    let radius = 10000;
    let services = [];

    const Providers = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);

    try {
        while (radius <= maxRadius && services.length < 40) {
            services = await Providers.find({
                type: "Pharmacy",
                location: {
                    $near: {
                        $geometry: { type: "Point", coordinates: [longitude, latitude] },
                        $maxDistance: radius
                    }
                }
            }).limit(40);

            if (services.length < 40) {
                radius += 10000;
            }
        }

        const Rating = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);

        const resultsPromises = services.map(async (service) => {
            const distance = calculateDistance(latitude, longitude, service.location.coordinates[1], service.location.coordinates[0]);
            const ratingDocument = await Rating.findOne({ providerId: service._id }).exec();
            const rating = ratingDocument ? ratingDocument.rating : null;

            return {
                id: service._id,
                name: service.name,
                type: service.type,
                rating: rating,
                distance: parseFloat(distance.toFixed(1)),
                address: service.address,
            };
        });

        const results = await Promise.all(resultsPromises);

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error("Error fetching services", error);
        return NextResponse.json({ error: "Error fetching services" }, { status: 500 });
    }
}

export {
    posthandler as POST
}