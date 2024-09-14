import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // hash this token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // expires in 1 hour
      });
    } else if (emailType === "RESET") {
      // send email to user with link to reset password
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // expires in 1 hour
      });
    }

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "87bc2631caa217",
          pass: "dc4619e1aaa86e"
        }

    })

    const mailOptions = ({
        from: "nehasharma@gmail.com",
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html:` <p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify" 
            : "reset your password"}</p>
        `
    })

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  

  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
