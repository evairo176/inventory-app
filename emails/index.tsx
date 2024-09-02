import Logo from "@/components/global/logo";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export interface InviteEmailTemplateProps {
  firstName?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
  role?: string;
  password: string;
  loginEmail: string;
}
export const InviteEmailTemplate = ({
  firstName,
  password,
  invitedByUsername,
  invitedByEmail,
  loginEmail,
  role,
  inviteLink,
}: InviteEmailTemplateProps) => {
  const previewText = `Join Stockify Inventory Management System as ${role}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px] flex items-center justify-center">
              <Logo />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Welcome to <strong>Stockify</strong> Inventory Management System
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {firstName},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to join <strong>Stockify</strong> as{" "}
              <strong>{role}</strong>.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We are pleased to inform you that you have been granted access to
              our Inventory Management System. Below are your login credentials
              and a link to access the system.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Login Credentials:
              <Hr />
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>Username</strong>: {loginEmail}
              <Hr />
              <strong>Temporary Password</strong>: {password}
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Please follow the link below to log in and set your permanent
              password:
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// VercelInviteUserEmail.PreviewProps = {
//   username: "alanturing",
//   userImage: `${baseUrl}/static/vercel-user.png`,
//   invitedByUsername: "Alan",
//   invitedByEmail: "alan.turing@example.com",
//   teamName: "Enigma",
//   teamImage: `${baseUrl}/static/vercel-team.png`,
//   inviteLink: "https://vercel.com/teams/invite/foo",
//   inviteFromIp: "204.13.186.218",
//   inviteFromLocation: "São Paulo, Brazil",
// } as VercelInviteUserEmailProps;

export default InviteEmailTemplate;
