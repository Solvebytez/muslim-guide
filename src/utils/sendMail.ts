import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import dotEnv from "dotenv";

dotEnv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  service: process.env.SMTP_SERVICE,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const renderFile = async (templatename: string, data: any):Promise<string> => {
  const templatePathAbsolute = path.join(
    process.cwd(),
    `src/email-templates/${templatename}.ejs`
  );
  return await ejs.renderFile(templatePathAbsolute, data);
};

export const sendMail = async (
  to: string,
  subject: string,
  templateName: string,
  data: any
) => {
  try {
    const html = await renderFile(templateName, data);
    const mailOptions = {
      from: `<${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
