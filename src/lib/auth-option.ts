import { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    maxAge: parseInt(process.env.NEXT_PUBLIC_SESSION_MAXAGE as string), // 30 minutes in seconds
  },
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          // check input
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No input found", status: 401 };
          }
          // auth
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );

          if (response?.data?.data) {
            return {
              ...response?.data?.data.user,
              token: response?.data?.data.token,
              expired_token: response?.data?.data.expired_token,
            };
          } else {
            return null;
          }
        } catch (error: any) {
          // console.log({ error });
          // console.log(error.response.data.message);
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // the token object is passed done to the session call back for persistence
      // if (trigger === "update" && session?.patokBatas) {
      //   token.patokBatas = session.patokBatas;
      // }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      // console.log({ session, token });

      return session;
    },
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};
