"use server";
import { Resend } from "resend";
import { InviteEmailTemplateProps } from "../../emails";
import { InviteEmailTemplate } from "../../emails/index";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "52e6e77939e23a",
    pass: "6e6d96796cc84d",
  },
});

export const inviteUser = async (data: InviteEmailTemplateProps) => {
  try {
    const emailHtml = render(
      <InviteEmailTemplate
        firstName={data?.firstName}
        password={data?.password}
        invitedByUsername={data?.invitedByUsername}
        invitedByEmail={data?.loginEmail}
        loginEmail={data?.loginEmail}
        role={data?.role}
        inviteLink={data?.inviteLink}
      />,
    );

    const options = {
      from: data?.invitedByEmail,
      to: data?.loginEmail,
      subject: `Join Stockify Inventory Management System as ${data?.role}`,
      html: emailHtml,
    };

    await transporter.sendMail(options);
    return true;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
