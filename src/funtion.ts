// import nodemailer from "nodemailer"
// import dotenv from "dotenv"
// dotenv.config()
// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS,
//       },
// })


// export const sendOTPEmail = async(email, otp, role) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject:`verify your email @ ${email} role: ${role} your otp code is   ${otp}`,
//            html: `
//           <!DOCTYPE html>
//           <html lang="en">
//           <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Email Verification - Event-Plan/title>
//           </head>
//           <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color:'#87BCFF' color: #fff;">
//             <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
//               <tr>
//                 <td style="padding: 20px; text-align: center; background-color: customPink; color: white; border-top-left-radius: 12px; border-top-right-radius: 12px;">
//                   <h1 style="font-size: 28px; margin: 0; font-weight: bold; font-family: 'Helvetica', sans-serif;">E_Ride</h1>
//                 </td>
//               </tr>
//               <tr>
//                 <td style="padding: 40px 30px;">
//                   <h2 style="font-size: 24px; color: #fff; margin-bottom: 20px; font-weight: 600; font-family: 'Helvetica', sans-serif;">Verify Your Email</h2>
//                   <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 20px;">
//                     Hello ${email || "there"},role: ${role}
//                   </p>
//                   <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 30px;">
//                     Thank you for signing up with E_Ride! To complete your registration and secure your account, please verify your email address by entering the following 6-digit verification code:
//                   </p>
//                   <div style="text-align: center; margin: 30px 0; background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
//                     <span style="display: inline-block; font-size: 32px; font-weight: bold; color: customPink; letter-spacing: 6px; font-family: 'Helvetica', sans-serif;">
//                       ${otp}
//                     </span>
//                   </div>
//                   <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 20px;">
//                     This code will expire in 24 hours for your security. If you didn’t request this verification, please ignore this email or contact our support team at <a href="mailto:support@e-ride.com" style="color: #7E22CE; text-decoration: none; font-weight: 500;">support@e-ride.com</a>.
//                   </p>
//                   <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 30px;">
//                     If you have any questions, feel free to reach out to us. We’re here to help you get started with E_Ride!
//                   </p>
//                   <div style="text-align: center; margin-top: 30px;">
                  
//                        style="display: inline-block; padding: 12px 30px; background-color: customPink; color: white; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; font-family: 'Helvetica', sans-serif; transition: background-color 0.3s;">
//                       Verify Now
//                     </a>
//                   </div>
//                   <p style="font-size: 14px; color: #999; text-align: center; margin-top: 40px; font-family: 'Arial', sans-serif;">
//                     © 2025 E_Ride. All rights reserved.
//                   </p>
//                 </td>
//               </tr>
//             </table>
//           </body>
//           </html>
//         `,
//     }

//     try {
//         const sentMail = await transporter.sendMail(mailOptions)
//         console.log("email sent seuccessfully:", sentMail)
//         return {success: true}
//     } catch (error) {
//         console.error("Email sending error:", error);
//       return { success: false, error: error.message };
//     }
// }




import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

interface SendOTPEmailResponse {
    success: boolean;
    error?: string;
}

export const sendOTPEmail = async (email: string, otp: string, role: string): Promise<SendOTPEmailResponse> => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Verify your email @ ${email} role: ${role} your OTP code is ${otp}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification - E_Ride</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: '#87BCFF'; color: #fff;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
              <tr>
                <td style="padding: 20px; text-align: center; background-color: customPink; color: white; border-top-left-radius: 12px; border-top-right-radius: 12px;">
                  <h1 style="font-size: 28px; margin: 0; font-weight: bold; font-family: 'Helvetica', sans-serif;">E_Ride</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="font-size: 24px; color: #fff; margin-bottom: 20px; font-weight: 600; font-family: 'Helvetica', sans-serif;">Verify Your Email</h2>
                  <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 20px;">
                    Hello ${email || "there"}, role: ${role}
                  </p>
                  <p style="font-size: 16px; line-height: 1.6; color: #fff; margin-bottom: 30px;">
                    Thank you for signing up with E_Ride! To complete your registration and secure your account, please verify your email address by entering the following 6-digit verification code:
                  </p>
                  <div style="text-align: center; margin: 30px 0; background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
                    <span style="display: inline-block; font-size: 32px; font-weight: bold; color: customPink; letter-spacing: 6px; font-family: 'Helvetica', sans-serif;">
                      ${otp}
                    </span>
                  </div>
                  <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 20px;">
                    This code will expire in 24 hours for your security. If you didn’t request this verification, please ignore this email or contact our support team at <a href="mailto:support@e-ride.com" style="color: #7E22CE; text-decoration: none; font-weight: 500;">support@e-ride.com</a>.
                  </p>
                  <p style="font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 30px;">
                    If you have any questions, feel free to reach out to us. We’re here to help you get started with E_Ride!
                  </p>
                  <div style="text-align: center; margin-top: 30px;">
                    <a href="#" style="display: inline-block; padding: 12px 30px; background-color: customPink; color: white; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; font-family: 'Helvetica', sans-serif; transition: background-color 0.3s;">
                      Verify Now
                    </a>
                  </div>
                  <p style="font-size: 14px; color: #999; text-align: center; margin-top: 40px; font-family: 'Arial', sans-serif;">
                    © 2025 E_Ride. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
    };

    try {
        const sentMail = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", sentMail);
        return { success: true };
    } catch (error: any) {
        console.error("Email sending error:", error);
        return { success: false, error: error.message };
    }
};