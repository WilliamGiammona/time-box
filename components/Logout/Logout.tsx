import React from 'react';
import { signOut } from 'next-auth/react';
import { IoExitOutline } from 'react-icons/io5';

export default function Logout() {
    return (
        <h1
            className="flex justify-center items-center"
            onClick={() => signOut()}
        >
            <IoExitOutline className="mr-2" /> Sign Out
        </h1>
    );
}
