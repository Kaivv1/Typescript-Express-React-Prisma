import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { client } from "../constants.js";

type EmailBody = {
  body: {
    name: string;
    action?:
      | {
          instructions: string;
          button: {
            color: string;
            text: string;
            link: string;
          };
        }
      | undefined;
    intro: string;
    outro: string;
  };
};

export type EmailProps = {
  name: string;
  userEmail: string;
  text: string;
  subject: string;
  button?: {
    instructions?: string | undefined;
    text: string;
    link?: string;
    buttonLinkType?: "default" | "reset";
  };
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASS,
  },
});

const MailGenerator = new Mailgen({
  theme: "cerberus",
  product: {
    name: "FileDrive",
    link: `${client}`,
    copyright: "Copyright © 2024 FileDrive All rights reserved.",
  },
});

type MailProps = {
  emailObj: EmailProps;
  token?: string;
};

export const sendMail = async ({ emailObj, token }: MailProps) => {
  const { name, text, subject, userEmail, button } = emailObj;

  const email: EmailBody = {
    body: {
      name,
      intro: text,
      action: button
        ? {
            instructions: button.instructions!,
            button: {
              color: "#e11d48",
              text: button.text,
              link:
                button.buttonLinkType === "reset"
                  ? `${client}/reset-password?token=${token}`
                  : button.link!,
            },
          }
        : undefined,
      outro:
        "Need help, or have question? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = MailGenerator.generate(email);

  const message = {
    from: process.env.APP_EMAIL,
    to: userEmail,
    subject,
    text,
    html: emailBody,
  };

  await transporter.sendMail(message);
};
