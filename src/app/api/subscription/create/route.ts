import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "../../convert-xml/route";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(
      `${process.env.COOKIE_NAME as string}`
    )?.value;
    const { plan } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "no token found" });
    }

    const token_data = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJWTPayload;

    if (!token_data.id) {
      return NextResponse.json({ success: false, message: "token expired" });
    }

    const user = await prisma.user.findFirst({ where: { id: token_data.id } });

    if (!user) {
      return NextResponse.json({ success: false, message: "user not found" });
    }

    // const create_subscription = await prisma.subscription.create({
    //   data: {
    //     userId: user.id,
    //     amount: 0,
    //     plan: plan,
    //     endDate: new Date(),
    //     startDate: new Date(),
    //     maxConversions: 20,
    //     conversions_done: 0,
    //     status: "ACTIVE",
    //   },
    // });

    // if (!create_subscription) {
    //   return NextResponse.json({
    //     success: false,
    //     message: "failed to create subscription",
    //   });
    // }

    return NextResponse.json({ success: true, message: "ok" });
  } catch (error) {
    console.log("error while creating subscription: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
