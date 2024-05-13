'use client';
import { Button } from '../../components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { fireauth } from '@/app/firebase';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const resetEmail = () => {
        sendPasswordResetEmail(fireauth, email);
    };
    return (
        <>
            <DialogHeader>
                <h1 className="mx-auto mt-4 font-bold">Forgot Password</h1>
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

                        <Button
                            type="submit"
                            className="w-[100%] my-5"
                            onClick={() => resetEmail()}
                            disabled={!email}
                        >
                            Send Forgot Password Email
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
