import { OrderSchema } from "@/app/_models/schema";
import connectToDatabase from "@/app/_middleware/mongodb";
import mongoose from "mongoose";
import { verifyToken } from "@/app/_middleware/auth";

async function gethandler(req) {
    await connectToDatabase();

    const token = req.headers.get('Authorization');
    const providerId = await verifyToken(token);

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

    try {
        const orders = await Order.find({ providerId, status: 'New' });
        const num = orders.length;
        return NextResponse.json(num, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export {
    gethandler as GET
}