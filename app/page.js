import { AuthForm } from '@/components/auth-form';

const Home = async ({ searchParams }) => {
    let { mode } = await searchParams;
    if(!mode) mode = 'login';
    return <AuthForm mode={mode}/>;
}

export default Home;