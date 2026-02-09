import { NextRequest, NextResponse } from "next/server";
import { CustomJWTPayload } from "../../convert-xml/route";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(
      `${process.env.COOKIE_NAME as string}`
    )?.value;

    if (!token) {
      return new Response("to token found", { status: 400 });
    }

    const token_data = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJWTPayload;

    if (!token_data || !token_data.id) {
      return new Response("token expired", { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, message: "user not found" });
    }

    const { password, stripeCustomerId, ...others } = user;

    return NextResponse.json({ success: true, message: "ok", data: others });
  } catch (error) {
    console.log("error while getting user: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
