import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
      user: "resend",
      pass: process.env.RESEND
    }
  })
  