import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "all fields are required",
      });
    }

    const is_user = await prisma.user.findFirst({ where: { email } });

    if (!is_user) {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    const is_correct = bcrypt.compareSync(password, is_user.password as string);

    if (!is_correct) {
      return NextResponse.json({
        success: false,
        message: "invalid credentials",
      });
    }

    if (!is_user) {
      return NextResponse.json({ success: false, message: "no user found" });
    }

    const token_data = {
      id: is_user.id,
      email: is_user.email,
    };

    const { password: _, ...others } = is_user;

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
    console.log("error while signing in: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
