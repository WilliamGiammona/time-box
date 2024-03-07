'use client';
import React from 'react';
import Login from '../Login/Login';
import Image from 'next/image';
import timeboxLogoLong from '../../assets/timebox-long.svg';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logout from '../Logout/Logout';
import SignUp from '../Signup/Signup';

export default function Navbar() {
    const session = useSession();

    return (
        <>
            <nav className={styles.navbar}>
                <div className="nav__logo">
                    <Link href="/">
                        <Image
                            src={timeboxLogoLong}
                            width={120}
                            height={30}
                            alt="Timebox logo"
                        ></Image>
                    </Link>
                </div>

                <div className={styles.nav__links}>
                    {session?.data?.user ? (
                        <Logout />
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
                </div>
            </nav>
        </>
    );
}
