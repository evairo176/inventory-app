import { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      imageUrl: string;
      role: any;
      session_expiry?: string;
      token: string;
      refreshToken: string;
      iat: number;
      exp: number;
      expired_token: number;
    };
  }
}
