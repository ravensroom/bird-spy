import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import env from '../env.js';
import { User } from '../types/type.js';
//@ts-ignore
import { users } from '@bird-spy/services/dist/main.js';
import bcrypt from 'bcrypt';

const encryptPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const generateToken = (userId: string): string => {
  const payload = { userId, timestamp: Date.now() };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '10 days' });
};

const sendSuccessAuthResponse = (res: Response, userId: string) => {
  const token = generateToken(userId);

  // Set the JWT as an HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // Enable if serving over HTTPS
    sameSite: 'strict',
  });

  // Send the response back to the client
  res.send({ message: 'Login successful', userId });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, localData } = req.body;
    await users.saveUser(
      {
        ...user,
        password: await encryptPassword(user.password),
      },
      localData
    );
    res.send({ message: 'Signup successful', userId: user.id });
  } catch (error) {
    next(error);
  }
};

const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', { session: false }, loginCallback)(
    req,
    res,
    next
  );

  function loginCallback(err: Error, user: User | false, info: any) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    sendSuccessAuthResponse(res, user.id);
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt', {
    secure: true,
    sameSite: 'strict',
  });

  res.send({ message: 'Logout successful' });
};

const initiateGoogleLogin = passport.authenticate('google', {
  scope: ['openid', 'email', 'profile'],
});

const handleGoogleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate('google', { session: false }, googleCallback)(
    req,
    res,
    next
  );

  async function googleCallback(err: Error, user: User | string) {
    if (err) {
      return next(err);
    }

    if (typeof user === 'string') {
      // user is profile.id
      try {
        const { user: newUser, localData } = req.body;
        newUser.googleId = user;
        await users.saveUser(newUser, localData);
        sendSuccessAuthResponse(res, newUser.id);
      } catch (error) {
        next(error);
      }
    } else {
      sendSuccessAuthResponse(res, user.id);
    }
  }
};

const initiateGithubLogin = passport.authenticate('github', {
  scope: ['user:email'],
});

const handleGithubCallback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate('github', { session: false }, githubCallback)(
    req,
    res,
    next
  );

  async function githubCallback(err: Error, user: User | string) {
    if (err) {
      return next(err);
    }

    if (typeof user === 'string') {
      // user is profile.id
      try {
        const { user: newUser, localData } = req.body;
        newUser.githubId = user;
        await users.saveUser(newUser, localData);
        sendSuccessAuthResponse(res, newUser.id);
      } catch (error) {
        next(error);
      }
    } else {
      sendSuccessAuthResponse(res, user.id);
    }
  }
};

const usersController = {
  signup,
  login,
  logout,
  initiateGoogleLogin,
  handleGoogleCallback,
  initiateGithubLogin,
  handleGithubCallback,
};

export default usersController;
