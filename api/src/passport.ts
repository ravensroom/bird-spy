//@ts-ignore
import { users } from '@bird-spy/services/dist/main.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import bcrypt from 'bcrypt';
import env from './env.js';
import { User } from './types/type.js';

// Configure Local Strategy for email/password authentication
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done: any) => {
      try {
        // Find user in the database based on email
        const user: User | null = await users.getUserByEmail(email);

        if (!user || !user?.email || !user?.password) {
          return done(null, false, { message: 'Incorrect email' });
        }

        // Compare password with the hashed password in the database
        const passwordMatch: boolean = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        // User authentication successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Configure Google Strategy for Google login
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        // Find or create user in the database based on Google ID
        const user: User | null = await users.getUserByGoogleId(profile.id);

        if (!user) {
          return done(null, profile.id);
        }

        // User authentication successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Configure GitHub Strategy for GitHub login
passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: env.GITHUB_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        // Find or create user in the database based on GitHub ID
        const user: User | null = await users.getUserByGithubId(profile.id);

        if (!user) {
          return done(null, profile.id);
        }

        // User authentication successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
