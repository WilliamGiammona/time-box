'use client';
import React from 'react';
import Login from '../Login/Login';
import Image from 'next/image';
import timeboxLogoLong2 from '../../assets/evocal.png';
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
                <div className="nav__log">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={timeboxLogoLong2}
                            width={50}
                            height={50}
                            alt="Timebox logo"
                        ></Image>
                        <h1 className="font-medium poppins text-slate-500">
                            EvoCal
                        </h1>
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
