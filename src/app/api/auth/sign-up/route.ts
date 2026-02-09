import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email, password, fname, lname, companyOrOrganization, phoneNo } =
      await req.json();

    if (
      !email ||
      !password ||
      !fname ||
      !lname ||
      !companyOrOrganization ||
      !phoneNo
    ) {
      return NextResponse.json({
        success: false,
        message: "all fields are required",
      });
    }

    const is_user = await prisma.user.findFirst({ where: { email } });

    if (is_user) {
      return NextResponse.json({
        success: false,
        message: "account already exist",
      });
    }

    const hashed_password = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        fname,
        lname,
        email,
        password: hashed_password,
        companyOrOrganization,
        phoneNo,
        profilePicUrl: "",
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "failed to create account",
      });
    }

    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 30);

    const subs = await prisma.subscription.create({
      data: {
        userId: user.id,
        status: "ACTIVE",
        plan: "FREE",
        endDate,
        amount: 0,
        stripeSubscriptionId: randomUUID(),
      },
    });

    if (!subs) {
      return NextResponse.json({
        success: false,
        message: "failed to create subscription",
      });
    }

    const token_data = {
      id: user.id,
      email: user.email,
    };

    const { password: _, ...others } = user;

    const token = jwt.sign(token_data, process.env.JWT_SECRET_KEY as string);

    const response = NextResponse.json({
      success: true,
      message: "account created successfully",
      data: others,
    });

    response.cookies.set(`${process.env.COOKIE_NAME as string}`, token, {
      httpOnly: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    console.log("error while creating account: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
