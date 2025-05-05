import { betterAuth } from "better-auth";
import { PrismaClient } from "@/services/database";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  twoFactor,
  organization,
  magicLink,
  emailOTP,
  genericOAuth,
} from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    twoFactor(),
    organization(),
    magicLink({
      async sendMagicLink() {},
    }),
    emailOTP({
      async sendVerificationOTP() {},
    }),
    genericOAuth({
      config: [
        {
          providerId: "github",
          clientId: "",
          clientSecret: "",
        },
      ],
    }),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    async sendResetPassword() {},
    user: {
      additionalFields: {},
    },
    changeEmail: {
      enabled: true,
      async sendChangeEmailVerification() {},
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.OAUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    async sendVerificationEmail() {},
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async onEmailVerification() {},
  },
});
