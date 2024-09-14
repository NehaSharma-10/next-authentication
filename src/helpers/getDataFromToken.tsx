import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    // Extract the token from the request cookies
    const token = request.cookies.get("token")?.value || "";

    // Verify the token and decode it
    const decodedToken:any = jwt.verify(token, process.env.SECRET_TOKEN!);

    // Return the decoded data
    return decodedToken.id;
  } catch (error) {
    // Handle the error, returning a consistent response
    throw new Error("Unauthorized");
  }
}
