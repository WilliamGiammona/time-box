'use client';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

import googleLogo from '../../assets/google-logo.svg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignUp from '../Signup/Signup';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default">Sign In</Button>
                </DialogTrigger>
                <DialogContent className="lg">
                    <DialogHeader>
                        <h1 className="text-2xl font-bold">
                            Sign in to Timebox
                        </h1>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-center w-80 m-auto">
                            <form action="#" method="POST">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="col-span-3 m-3"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <div
                                    className="text-xs cursor-pointer text-right"
                                    onClick={() => {
                                        router.push('/forgot-password');
                                        setOpen(false);
                                    }}
                                >
                                    Forgot password?
                                </div>
                                <Input
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="col-span-3 m-3"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <Button
                                    type="submit"
                                    className="w-full m-3"
                                    onClick={(e) => {
                                        signIn('credentials', {
                                            email,
                                            password,
                                            redirect: true,
                                            callbackUrl: '/app',
                                        });
                                        e.preventDefault();
                                    }}
                                    disabled={!email || !password}
                                >
                                    Sign In
                                </Button>
                            </form>
                        </div>

                        <div className="flex items-center justify-center w-30 m-auto">
                            <Separator className="w-10" />
                            <h2 className="mx-3 inline">Or continue with</h2>
                            <Separator className="w-10" />
                        </div>

                        <div className="flex items-center justify-center flex-col w-80 m-auto">
                            <Button
                                className="w-[100%] my-5"
                                onClick={() => signIn('google')}
                                variant={'outline'}
                            >
                                <Image
                                    src={googleLogo}
                                    alt="Google logo"
                                    width={15}
                                    height={15}
                                    className="m-3"
                                ></Image>
                                Google
                            </Button>
                        </div>
                        <div className="flex items-center justify-center flex-col w-80 m-auto">
                            <SignUp />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Login;
