import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CustomJWTPayload } from "../../convert-xml/route";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get(`${process.env.COOKIE_NAME as string}`)?.value;
    const docId = req.nextUrl.searchParams.get("docId");

    if (!token || !docId) {
      return NextResponse.json({
        success: false,
        message: "not authenticated",
      });
    }

    const token_data = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJWTPayload;

    if (!token_data) {
      return NextResponse.json({ success: false, message: "token expired" });
    }

    const doc = await prisma.document.delete({
      where: { id: docId, userId: token_data.id },
    });

    if (!doc) {
      return NextResponse.json({
        success: false,
        message: "no such document exist",
      });
    }

    return NextResponse.json({ success: true, message: "ok", data: doc });
  } catch (error) {
    console.log("error while deleting document: ", error);
    return NextResponse.json({
      success: false,
      messae: "Internal server error",
    });
  }
}
