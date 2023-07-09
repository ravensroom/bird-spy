import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  href: string;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  href,
}) => {
  return (
    <a
      href={href}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon />
    </a>
  );
};

export default AuthSocialButton;
