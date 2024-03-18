'use client';
import React from 'react';
import Login from '../Login/Login';
import Image from 'next/image';
import timeboxLogo from '../../assets/evocal-1.png';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logout from '../Logout/Logout';
import SignUp from '../Signup/Signup';
import Feedback from '../../app/feedback';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default function Navbar() {
    const session = useSession();

    return (
        <>
            <nav className={styles.navbar}>
                <div className="nav__log">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={timeboxLogo}
                            width={50}
                            height={50}
                            alt="Timebox logo"
                            className="dark:invert rounded-lg"
                        ></Image>
                        <h1 className="font-bold poppins dark:text-neutral-50 text-neutral-800 ml-4">
                            Evo<span className="text-slate-500">Cal</span>
                        </h1>
                    </Link>
                </div>

                <div className={styles.nav__links}>
                    {session?.data?.user ? (
                        <>
                            <Feedback />
                            <Logout />
                        </>
                    ) : (
                        <>
                            <Login />
                            <SignUp />
                        </>
                    )}

                    <div>
                        {session?.data?.user && (
                            <Avatar className="mx-3">
                                <AvatarImage
                                    src={session?.data?.user?.image || ''}
                                    alt="User image"
                                    width={30}
                                    height={30}
                                />
                                <AvatarFallback>
                                    {session?.data?.user?.email
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    <ThemeToggle />
                </div>
            </nav>
        </>
    );
}
