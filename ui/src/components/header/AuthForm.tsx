import { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import AuthSocialButton from './AuthSocialButton';
import api from '../../apis/api';
import { useHeaderMessageContext } from '../../contexts/SaveMessageProvider';
import { useUserIdContext } from '../../contexts/UserIdProvider';
import { User } from '../../types/types';

type Variant = 'LOGIN' | 'REGISTER';

const GOOGLE_AUTH_URL = 'http://localhost:3000/api/users/login/google';
const GITHUB_AUTH_URL = 'http://localhost:3000/api/users/login/github';

interface AuthFormProps {
  handleClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const { setHeaderMessage } = useHeaderMessageContext();
  const { userId } = useUserIdContext();

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER');
    if (variant === 'REGISTER') setVariant('LOGIN');
  }, [variant]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (variant === 'LOGIN') {
      try {
        await api.users.loginWithEmail(email, password);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    if (variant === 'REGISTER') {
      if (password !== confirmPassword) {
        // Password and confirm password mismatch
        setHeaderMessage('Passwords do not match!');
        setTimeout(() => setHeaderMessage(''), 3000);
        setIsLoading(false);
        return;
      }
      try {
        const user: User = {
          id: userId,
          email,
          password,
        };
        const localConfigs = await api.configs.getLocalConfigs();
        const localArchives = await api.archives.getLocalArchives();
        const localData = {
          configs: localConfigs,
          archives: localArchives,
        };
        await api.users.signup(user, localData);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="fixed bg-white p-8 rounded shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-gray-800 mb-2 font-semibold"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-gray-800 mb-2 font-semibold"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
              disabled={isLoading}
            />
          </div>
          {variant === 'REGISTER' && (
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-800 mb-2 font-semibold"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
                disabled={isLoading}
              />
            </div>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 ml-auto text-white px-4 py-2 rounded font-semibold"
          >
            {variant === 'REGISTER' ? 'Register' : 'Sign In'}
          </button>
        </form>
        <div
          onClick={handleClose}
          className="absolute font-extrabold w-4 h-4 rounded-sm text-white top-2 right-2 flex items-center justify-center cursor-pointer bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700"
        >
          x
        </div>
        <div className="mt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} href={GITHUB_AUTH_URL} />
            <AuthSocialButton icon={BsGoogle} href={GOOGLE_AUTH_URL} />
          </div>
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            {variant === 'LOGIN'
              ? "Don't have an account?"
              : 'Already have an account?'}
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('root')!
  );
};

export default AuthForm;
