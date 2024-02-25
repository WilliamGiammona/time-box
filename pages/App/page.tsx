'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

export default function App() {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/');
        },
    });
    return (
        <>
            <div>{session?.data?.user?.email}</div>
        </>
    );
}

App.requireAuth = true;
