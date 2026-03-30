import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";

// নির্দিষ্ট অর্ডার আপডেট করা (Update)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const data = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updatedOrder);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// অর্ডার ডিলিট করা (Delete)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    await Order.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Order Deleted Successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}