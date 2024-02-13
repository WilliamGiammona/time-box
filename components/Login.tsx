'use client';

import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

function Login() {
    return (
        <>
            <Button onClick={() => signIn('google')}>Log In</Button>
        </>
    );
}

export default Login;
