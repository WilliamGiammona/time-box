'use client';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [open, setOpen] = useState(false);

    const signup = () => {
        if (password !== passwordAgain) {
            console.error('Passwords do not match');
        } else {
            createUserWithEmailAndPassword(auth, email, password);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className={'mx-3'}
                        onClick={() => setOpen(false)}
                    >
                        Sign Up
                    </Button>
                </DialogTrigger>
                <DialogContent className="lg">
                    <DialogHeader>
                        <h1 className="text-2xl font-bold">
                            Sign up to Timebox
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

                                <Input
                                    name="passwordAgain"
                                    id="passwordAgain"
                                    type="password"
                                    placeholder="Repeat your password"
                                    className="col-span-3 m-3"
                                    onChange={(e) =>
                                        setPasswordAgain(e.target.value)
                                    }
                                    required
                                />

                                <div></div>

                                <Button
                                    type="submit"
                                    className="w-[100%] my-5"
                                    onClick={() => signup()}
                                    disabled={
                                        !email || !password || !passwordAgain
                                    }
                                >
                                    Sign Up
                                </Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SignUp;
