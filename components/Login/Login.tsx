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

function Login() {
    return (
        <>
            <Dialog>
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
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="col-span-3 m-3"
                            />
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                className="col-span-3 m-3"
                            />

                            <Button type="submit" className="w-[100%] my-5">
                                Sign In
                            </Button>
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
                                variant={'secondary'}
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
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Login;
