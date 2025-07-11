import { logout } from '@/actions/auth_actions';
import '../globals.css';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

const AuthLayout = ({ children }) => <>
    <header id='auth-header'>
        <p>Welcome Back!</p>
        <form action={logout}>
            <button>Logout</button>
        </form>
    </header>
    {children}
</>;

export default AuthLayout;