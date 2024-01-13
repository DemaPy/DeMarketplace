import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
      user: "resend",
      pass: "re_G59KWn26_9dXN34tqKo2jUtx1KcnGLwcX"
    }
  })
  