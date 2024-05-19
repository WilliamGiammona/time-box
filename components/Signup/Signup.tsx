'use client';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fireauth } from '@/app/firebase';
import { Loader2, ShieldX, UserRoundCheck } from 'lucide-react';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const signup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== passwordAgain) {
            setError('Passwords do not match');
            setLoading(false);
        } else {
            setSuccess(false);
            setLoading(true);
            setError('');
            try {
                await createUserWithEmailAndPassword(fireauth, email, password);
                setLoading(false);
                setSuccess(true);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(getRefinedFirebaseAuthErrorMessage(error.message));
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
                setSuccess(false);
            }
        }
    };

    function getRefinedFirebaseAuthErrorMessage(errorMesssage: string): string {
        return errorMesssage.replace('Firebase: ', '').replace('auth/', '');
    }

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
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin text-blue-400 h-20 w-20" />
                        </>
                    ) : (
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-center w-80 m-auto">
                                <form
                                    action="#"
                                    method="POST"
                                    onSubmit={(e) => signup(e)}
                                >
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        className="col-span-3 m-3"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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

                                    <div
                                        style={{
                                            visibility:
                                                password.length > 0 &&
                                                passwordAgain.length > 0 &&
                                                password !== passwordAgain
                                                    ? 'visible'
                                                    : 'hidden',
                                        }}
                                        className="text-red-500 text-sm text-center"
                                    >
                                        Passwords do not match
                                    </div>

                                    {error && (
                                        <div className="text-red-500 text-sm text-center flex w-full items-center justify-center mx-auto">
                                            <ShieldX />
                                            {error}
                                        </div>
                                    )}

                                    {success && (
                                        <div className="text-green-500 text-sm text-center w-full flex items-center justify-center">
                                            <UserRoundCheck />
                                            Account successfully made
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-[100%] my-5"
                                        disabled={
                                            !email ||
                                            !password ||
                                            !passwordAgain
                                        }
                                    >
                                        Sign Up
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SignUp;
