"use server";
import { Resend } from "resend";
import { InviteEmailTemplateProps } from "../../emails";
import { InviteEmailTemplate } from "../../emails/index";

export const inviteUser = async (data: InviteEmailTemplateProps) => {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY as string);

    await resend.emails.send({
      from: "Stockify <semenjakpetang176@gmail.com>",
      to: data?.loginEmail,
      subject: `Join Stockify Inventory Management System as${data?.role}`,
      react: (
        <InviteEmailTemplate
          firstName={data?.firstName}
          password={data?.password}
          invitedByUsername={data?.invitedByUsername}
          invitedByEmail={data?.invitedByEmail}
          loginEmail={data?.loginEmail}
          role={data?.role}
          inviteLink={data?.inviteLink}
        />
      ),
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
