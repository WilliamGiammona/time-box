'use client';
import React from 'react';
import Login from '../Login/Login';
import Image from 'next/image';
import timeboxLogo from '../../assets/evocal-2.png';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logout from '../Logout/Logout';
import SignUp from '../Signup/Signup';
import Feedback from '../../app/feedback';
import { CiCalendar } from 'react-icons/ci';
import { MdOutlineFeedback } from 'react-icons/md';

import { Separator } from '@/components/ui/separator';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ModeToggle from '../ModeToggle/ModeToggle';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const session = useSession();
    const pathName = usePathname();

    return (
        <>
            <nav
                className={`${styles.navbar} fixed left-1/2 translate-x-[-50%] top-0 rounded-3xl ${pathName == '/' ? 'dark:bg-black/30 bg-neutral-200/30' : 'dark:bg-neutral-900'} px-6 py-2 my-4 z-40 backdrop-blur-md`}
            >
                <div className="nav__log">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={timeboxLogo}
                            width={50}
                            height={50}
                            alt="Timebox logo"
                            className="dark:invert rounded-3xl"
                        ></Image>
                        <h1 className="font-bold poppins dark:text-neutral-50 text-neutral-800 ml-4">
                            Evo<span className="text-neutral-500">Cal</span>
                        </h1>
                    </Link>
                </div>

                <div
                    className={`${styles.nav__links} flex items-center justify-center`}
                >
                    {session?.data?.user ? (
                        <></>
                    ) : (
                        <>
                            <Login />
                            <SignUp />
                            <div className="flex items-center justify-center mx-2">
                                <ModeToggle />
                            </div>
                        </>
                    )}

                    <div>
                        {session?.data?.user && (
                            <>
                                <div className=" flex items-center justify-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Avatar className="mx-3">
                                                <AvatarImage
                                                    src={
                                                        session?.data?.user
                                                            ?.image || ''
                                                    }
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
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>
                                                {session.data.user.name
                                                    ? session.data.user.name
                                                    : session?.data?.user.email}
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link
                                                    href="/calendar"
                                                    className="flex items-center justify-center"
                                                >
                                                    {' '}
                                                    <CiCalendar className="mr-2" />
                                                    Go to Calendar
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <div className="flex items-center justify-center">
                                                    <MdOutlineFeedback className="mr-2" />
                                                    <Feedback />
                                                </div>
                                            </DropdownMenuItem>
                                            <Separator className="my-2"></Separator>
                                            <DropdownMenuItem>
                                                <Logout />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <ModeToggle />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
