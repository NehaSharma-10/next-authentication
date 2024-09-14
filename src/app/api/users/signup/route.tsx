import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import {sendEmail} from '@/helpers/mailer'

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    // create and save user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log(savedUser);

    // send email for verification email 
    await sendEmail({
      email, emailType:"VERIFY", userId: savedUser._id
    })
    
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
