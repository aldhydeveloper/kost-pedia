import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // const user = {}
        try {
          const user: any = await fetch("http://localhost:8000/v1/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const data = await user.json();
          // console.log(data);
          if (data.error !== undefined) {
            return data;
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // async jwt({ token, user, account }: any) {
    //   if (user && account) {
    //     return { ...token, ...user };
    //   }
    //   return token;
    // },
    // async session({ session, token }: any) {
    //   // console.log(token);
    //   // console.log(token.data, session);
    //   // if (
    //   //   typeof token === "object" &&
    //   //   typeof token.data === "object" &&
    //   //   "data" in token &&
    //   //   // "access_token" in token.data &&
    //   //   token.data &&
    //   //   typeof token.data!.access_token === "string"
    //   // ) {
    //   session.user = token?.data.access_token;
    //   return session;
    //   // }
    //   // return null;
    // },
    jwt: async ({ token, user }: any) => {
      if (user) {
        // token.email = user?.data.auth.email;
        // token.username = user.data.auth.userName;
        // token.userType = user.data.auth.userType;
        token.accessToken = user?.data.access_token;
      }

      return token;
    },
    session: ({ session, token, user }: any) => {
      if (token) {
        // session.user.email = token.email;
        // session.user.username = token.userName;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
