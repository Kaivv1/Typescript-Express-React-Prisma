import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../prisma-client.js";
import { createError } from "../utils/error-handling.js";

type SocialProfile = {
  displayName: string;
  emails: { value: string; verified: boolean }[];
  photos: { value: string }[];
  provider: string;
};

export const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "http://localhost:4000/user/auth/github/callback",
  },
  async function (
    accessToken: any,
    refreshToken: any,
    profile: SocialProfile,
    done: any
  ) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: { email: profile.emails.at(0)?.value },
      });
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = await prisma.user.create({
          data: {
            email: profile.emails.at(0)?.value!,
            fullName: profile.displayName,
            avatar: profile.photos.at(0)?.value,
            provider: profile.provider,
          },
        });
        return done(null, user);
      }
    } catch (error) {
      return done(createError(500, "Error creating github user"));
    }
  }
);

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:4000/user/auth/google/callback",
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: { email: profile?.emails?.at(0)?.value },
      });
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = await prisma.user.create({
          data: {
            email: profile?.emails?.at(0)?.value!,
            fullName: profile.displayName,
            avatar: profile.photos?.at(0)?.value,
            provider: profile.provider,
          },
        });
        return done(null, user);
      }
    } catch (error) {
      return done(createError(500, "Error creating google user"));
    }
  }
);
