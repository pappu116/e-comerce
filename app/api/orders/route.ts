import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

// ১. নতুন অর্ডার তৈরি করা (Create)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newOrder = await Order.create(data);
    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ২. সব অর্ডার দেখা (Read)
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}