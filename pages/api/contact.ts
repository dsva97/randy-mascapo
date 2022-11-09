import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  SMTP_MAIL_RECEIVER,
  SMTP_MAIL_SENDER,
  SMTP_HOST,
  SMTP_PASS,
} from "../../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(401).json({ error: "Method unsupported." });

  console.log(req.body);
  const { subject, content } = req.body;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: SMTP_MAIL_SENDER,
      pass: SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Randy Mailer" <${SMTP_MAIL_SENDER}>`,
    to: SMTP_MAIL_RECEIVER,
    subject,
    text: content,
  });

  res.status(200).json({ data: info });
}
