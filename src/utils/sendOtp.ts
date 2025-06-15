import { sendMail } from "./sendMail";

export const sendOtp = async (
  otp: string,
  name: string,
  email: string,
  tamplateName: string
) => {
  const data = {
    otp,
    name,
    email,
    APP_NAME: "Muslim Lifestyle",
    OTP_EXPIRY_SECONDS: 10,
  };

  await sendMail(email, "Email OTP Verification", tamplateName, data);
};
