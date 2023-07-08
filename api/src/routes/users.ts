import express from 'express';
import usersController from '../controllers/users.js';

const router = express.Router();

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/logout', usersController.logout);

router.get('/login/google', usersController.initiateGoogleLogin);
router.get('/login/google/callback', usersController.handleGoogleCallback);
router.get('/login/github', usersController.initiateGithubLogin);
router.get('/login/github/callback', usersController.handleGithubCallback);

export default router;
