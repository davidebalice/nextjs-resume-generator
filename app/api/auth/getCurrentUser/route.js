import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectDB from "../../../../database/db";
import User from "../../../../models/user";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.id;

    await connectDB();

    const user = await User.findOne({ _id: id });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
