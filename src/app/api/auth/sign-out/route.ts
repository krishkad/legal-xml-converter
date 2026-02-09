import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(`${process.env.COOKIE_NAME as string}`)?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "not authenticated",
      });
    }

    const response = NextResponse.json({
      success: true,
      message: "logout successful",
    });
    response.cookies.delete(`${process.env.COOKIE_NAME as string}`);
    return response;
  } catch (error) {
    console.log("error while logging out: ", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
