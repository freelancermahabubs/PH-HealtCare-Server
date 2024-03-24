import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: config.emailSender.smtp_host,
    service: config.emailSender.smtp_service,
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.emailSender.smtp_email,
      pass: config.emailSender.smtp_password,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"PH Healt Care 👻" <info.freelancermahabub@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Password Link✔", // Subject line
    // text: "Hello world?", // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export default emailSender;
