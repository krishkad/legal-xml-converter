import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "../../convert-xml/route";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(`${process.env.COOKIE_NAME as string}`)?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "token not found" });
    }

    const token_data = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJWTPayload;

    if (!token_data.id) {
      return NextResponse.json({ success: false, message: "token expired" });
    }

    const subs = await prisma.subscription.findMany({
      where: { userId: token_data.id },
    });

    if (!subs || subs.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "no subscription yet",
      });
    }

    return NextResponse.json({ success: true, message: "ok", data: subs });
  } catch (error) {
    console.log("error while getting all subscription: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
