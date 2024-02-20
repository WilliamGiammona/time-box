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
            {session?.status}
            <h1>Hi</h1>
        </>
    );
}

App.requireAuth = true;
