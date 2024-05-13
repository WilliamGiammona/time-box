'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import appMockupLight from '@/assets/Mockup-2.webp';
import appMockupDark from '@/assets/Mockup-1.webp';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Avatar } from '@/components/ui/avatar';
import preciseImg from '@/assets/time-management.png';
import preciseImgLight from '@/assets/time-management-light.png';
import braindumpImg from '@/assets/braindump.png';
import braindumpImgLight from '@/assets/braindump-light.png';
import Link from 'next/link';
import monthImg from '@/assets/month-view.png';
import monthImgLight from '@/assets/month-view-light.png';
import { HiCursorClick } from 'react-icons/hi';

import { FaCalendarWeek, FaFire } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
    const router = useRouter();
    const session = useSession();

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <>
            <header>
                <div className="flex max-w-[1200px] w-[100%] mx-auto flex-col text-center h-full items-center justify-start pt-20 mb-4">
                    <motion.h1 className=" bg-gradient-to-r from-purple-500 to-purple-300 inline-block text-transparent bg-clip-text text-6xl font-bold h-auto poppins py-4 ">
                        Get things done.
                    </motion.h1>
                    <motion.h2
                        className="mb-4 poppins "
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        Organise your thoughts and plan your day in a beautiful
                        and simple app.
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        <Button
                            className="flex transition-all duration-100 poppins mb-10 bg-gradient-to-r from-purple-600 to-purple-500 dark:hover:from-neutral-900  hover:from-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-50 hover:to-neutral-100 dark:hover:to-black py-6 px-4 text-md border group"
                            onClick={() => {
                                router.push('/calendar');
                                if (!session.data?.user) {
                                    toast('❌ Cannot access page', {
                                        description:
                                            'Sign in to access the calendar page',
                                        action: {
                                            label: 'Ok',
                                            onClick: () =>
                                                console.log(
                                                    'Sign in to access the calendar page'
                                                ),
                                        },
                                    });
                                }
                            }}
                        >
                            Try EvoCal{' '}
                            <span className="text-[0.6em] p-[0.1em] mx-1 border border-neutral-50 rounded-sm ">
                                {' '}
                                BETA
                            </span>{' '}
                            - It&apos;s Free
                            <FaFire className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300 fill-red-500" />
                        </Button>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.6,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                    className="relative left-0 w-full lg:h-[60vh] md:h-[40vh]"
                >
                    <Image
                        src={appMockupLight}
                        className="absolute object-contain block dark:hidden left-0 top-0 w-full rounded-lg z-10 max-h-[60vh]"
                        alt="laptop-screen-dark"
                        width={2000}
                        height={1200}
                    />
                    <Image
                        src={appMockupDark}
                        className="absolute object-contain hidden dark:block left-0 top-0 w-full rounded-lg z-10 max-h-[60vh]"
                        alt="laptop-screen-dark"
                        width={2000}
                        height={1200}
                    />
                </motion.div>
                <motion.div className="absolute translate-y-[-100px] z-[-1] w-full">
                    <div className="gradient relative w-full h-[500px] translate-x-[-100px] bg-gradient-to-t dark:from-background backdrop-blur-3xl dark:via-neutral-900 blur-3xl dark:to-background opacity-100 left-[0] z-[-10] from-neutral-300 via-neutral-200 to-neutral-100" />
                </motion.div>
                <div className="flex max-w-[1200px] w-[100%] mx-auto flex-col text-center items-center justify-center my-10">
                    <section id="bento" ref={ref}>
                        <h1 className=" bg-gradient-to-r from-purple-500 to-purple-300 inline-block text-transparent bg-clip-text text-6xl font-bold h-auto poppins py-4 ">
                            Build your day
                        </h1>

                        <div className="py-16">
                            <div className="mx-auto px-6 max-w-6xl text-neutral-500">
                                <div className="relative">
                                    <div className="relative z-10 grid gap-3 grid-cols-6">
                                        <motion.div
                                            initial={{ x: '-10vw', opacity: 0 }}
                                            animate={
                                                isInView
                                                    ? { x: 0, opacity: 1 }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 0.6,
                                                ease: 'easeInOut',
                                                delay: 0,
                                            }}
                                            className="col-span-full lg:col-span-2 overflow-hidden flex relative p-8 rounded-xl bg-white border border-gray-200 dark:border-neutral-800 dark:bg-neutral-900"
                                        >
                                            <div className="size-fit m-auto relative">
                                                <div className="relative h-24 w-full flex items-center">
                                                    <svg
                                                        className="absolute inset-0 size-full text-neutral-200 dark:text-neutral-600"
                                                        viewBox="0 0 254 104"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                    <span className="w-fit block mx-auto text-5xl font-semibold text-transparent bg-clip-text bg-purple-600">
                                                        100%
                                                    </span>
                                                </div>
                                                <h2 className="mt-6 text-center font-semibold text-gray-950 dark:text-white text-3xl">
                                                    Free to use
                                                </h2>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ y: '-10vw', opacity: 0 }}
                                            animate={
                                                isInView
                                                    ? { y: 0, opacity: 1 }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 0.6,
                                                ease: 'easeInOut',
                                                delay: 0.2,
                                            }}
                                            className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-neutral-800 dark:bg-neutral-900"
                                        >
                                            <div>
                                                <div className="relative aspect-square rounded-full size-32 flex border mx-auto dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
                                                    <span className="w-full h-full flex items-center justify-center mx-auto text-5xl font-semibold text-transparent">
                                                        <svg
                                                            className="fill-violet-600 "
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            x="0px"
                                                            y="0px"
                                                            width="50"
                                                            height="50"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            {' '}
                                                            <path d="M21.612,17.714l-2.125-13c-0.059-0.358-0.307-0.657-0.649-0.78c-0.342-0.121-0.724-0.05-0.997,0.189l-3.247,2.845 l-1.829-3.551c-0.166-0.321-0.492-0.528-0.853-0.541c-0.362-0.013-0.701,0.169-0.89,0.478L9.93,5.14L7.592,0.521 c-0.191-0.377-0.603-0.585-1.019-0.54c-0.42,0.054-0.76,0.366-0.85,0.78l-3.7,17.026c-0.117,0.539,0.225,1.072,0.765,1.189 c0.027,0.006,0.054,0.005,0.081,0.009c0.003,0.001,0.004,0.004,0.007,0.005l8.455,4.875C11.485,23.955,11.657,24,11.83,24 c0.174,0,0.348-0.045,0.503-0.136l8.795-5.125C21.486,18.53,21.679,18.123,21.612,17.714z M11.801,5.915l1.242,2.411l-1.039,0.91 l-1.012-1.998L11.801,5.915z M10.451,10.597l-3.244,2.842l2.56-4.193L10.451,10.597z M7.079,3.937l1.626,3.211l-3.607,5.907 L7.079,3.937z M11.827,21.844l-6.742-3.887l7.357-6.446c0.007-0.008,0.016-0.012,0.023-0.02l5.339-4.677l1.724,10.543L11.827,21.844 z"></path>{' '}
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="mt-6 text-center relative z-10 space-y-2">
                                                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">
                                                        Secure by default
                                                        <span className="font-thin text-md">
                                                            *
                                                        </span>
                                                    </h2>
                                                    <p className="dark:text-gray-300 text-gray-700">
                                                        Made with Firebase
                                                    </p>
                                                    <Link
                                                        href="https://firebase.google.com/support/privacy#:~:text=Firebase%20services%20encrypt%20data%20in,Cloud%20Firestore"
                                                        className="text-xs hover:text-violet-300"
                                                    >
                                                        *Firebase services
                                                        encrypt data in transit
                                                        using HTTPS and
                                                        logically isolate
                                                        customer data.&quot;
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ y: '10vh', opacity: 0 }}
                                            animate={
                                                isInView
                                                    ? { y: 0, opacity: 1 }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 0.6,
                                                ease: 'easeInOut',
                                                delay: 0.3,
                                            }}
                                            className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-neutral-800 dark:bg-neutral-900 flex items-center justify-center"
                                        >
                                            <div>
                                                <div className="pt-6 lg:px-6">
                                                    <Image
                                                        src={preciseImg}
                                                        alt="alt"
                                                        width={400}
                                                        height={400}
                                                        className="hidden dark:block"
                                                    />
                                                    <Image
                                                        src={preciseImgLight}
                                                        alt="alt"
                                                        width={400}
                                                        height={400}
                                                        className="dark:hidden block"
                                                    />
                                                </div>
                                                <div className="mt-4 text-center relative z-10 space-y-2">
                                                    <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">
                                                        Precise Task Management
                                                    </h2>
                                                    <p className="dark:text-gray-300 text-gray-700">
                                                        Easily manage your
                                                        events in blocks
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ y: '10vh', opacity: 0 }}
                                            animate={
                                                isInView
                                                    ? { y: 0, opacity: 1 }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 0.6,
                                                ease: 'easeInOut',
                                                delay: 0.2,
                                            }}
                                            className="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-neutral-800 dark:bg-neutral-900"
                                        >
                                            <div className="grid sm:grid-cols-2">
                                                <div className="flex flex-col justify-between relative z-10 space-y-12 lg:space-y-6">
                                                    <div className="relative aspect-square rounded-full size-12 flex border dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
                                                        <HiCursorClick className="w-full h-full p-3" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h2 className="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white">
                                                            Drag and drop your
                                                            day
                                                        </h2>
                                                        <p className="dark:text-gray-300 text-gray-700">
                                                            List your daily
                                                            tasks in the
                                                            Braindump 🧠 and
                                                            drop them into your
                                                            Calendar
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden relative mt-6 sm:mt-auto h-fit -mb-[34px] -mr-[34px] sm:ml-6 py-6 p-6 border rounded-tl-lg dark:bg-[#161616] bg-[#fafafa] dark:border-white/10">
                                                    <div className="absolute flex gap-1 top-2 left-3">
                                                        <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                                        <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                                        <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                                                    </div>
                                                    <Image
                                                        src={braindumpImg}
                                                        className="dark:block hidden rounded-lg"
                                                        alt="alt"
                                                        width={500}
                                                        height={500}
                                                    />
                                                    <Image
                                                        src={braindumpImgLight}
                                                        className="dark:hidden block rounded-lg"
                                                        alt="alt"
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ x: '10vw', opacity: 0 }}
                                            animate={
                                                isInView
                                                    ? { x: 0, opacity: 1 }
                                                    : {}
                                            }
                                            transition={{
                                                duration: 0.6,
                                                ease: 'easeInOut',
                                                delay: 0.2,
                                            }}
                                            className="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-neutral-800 dark:bg-[#161616]"
                                        >
                                            <div className="h-full w-full grid sm:grid-cols-1 md:grid-cols-2">
                                                <div className="flex flex-col justify-between relative z-10 space-y-12 lg:space-y-6 pb-4">
                                                    <div className="relative aspect-square rounded-full size-12 flex border dark:bg-white/5 dark:border-white/10 before:absolute before:-inset-2 before:border dark:before:border-white/5 dark:before:bg-white/5 before:rounded-full">
                                                        <FaCalendarWeek className="w-full h-full flex items-center justify-center p-3" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <h2 className="text-lg font-medium text-gray-800 transition  dark:text-white">
                                                            Day, Week, Month
                                                        </h2>
                                                        <p className="dark:text-gray-300 text-gray-700">
                                                            Your schedule at a
                                                            glance
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="lg:absolute sm:relative lg:p-10 sm:-mr-[--card-padding]">
                                                    <div className="relative flex flex-col justify-center h-full w-full">
                                                        <Image
                                                            src={monthImg}
                                                            alt="alt"
                                                            className="dark:block hidden rounded-lg w-full h-full object-cover object-left opacity-75"
                                                            width={800}
                                                            height={800}
                                                        />
                                                        <Image
                                                            src={monthImgLight}
                                                            alt="alt"
                                                            className="dark:hidden block rounded-lg w-full h-full object-cover object-left opacity-75"
                                                            width={800}
                                                            height={800}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        id="testimonials"
                        className="flex flex-col items-center justify-center"
                    >
                        <h1 className=" bg-gradient-to-r from-purple-500 to-purple-300 inline-block text-transparent bg-clip-text text-6xl font-bold h-auto poppins py-4 ">
                            Made for power users
                        </h1>

                        <div className="flex gap-x-4 mt-10">
                            <div className="testimonial shadow-lg flex flex-col items-start justify-center border-2 border-neutral-200 dark:border-neutral-800 my-10 py-4 px-6 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 max-w-[400px]">
                                <h1 className="text-xl w-full text-left font-medium">
                                    &quot;If you want to supercharge your day,
                                    Evocal is&nbsp;
                                    <span className="font-bold">
                                        the application&quot;
                                    </span>
                                </h1>
                                <div className="user flex items-center w-full my-4">
                                    <Avatar className="mr-4">
                                        <AvatarFallback className="bg-violet-600 text-neutral-50 w-full flex items-center justify-center text-neutral-50   font-bold">
                                            A
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h2 className="text-left font-bold">
                                            Andreas{' '}
                                        </h2>
                                        <p className="text-sm dark:text-neutral-300 text-neutral-800">
                                            Football Coach
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="testimonial shadow-lg flex flex-col items-start justify-center border-2 border-neutral-200 dark:border-neutral-800 my-10 py-4 px-6 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 max-w-[400px]">
                                <h1 className="text-xl w-full text-left font-medium">
                                    &quot;Helps me keep track of my
                                    <span className="font-bold">
                                        {' '}
                                        upcoming gigs
                                    </span>
                                    &quot;
                                </h1>
                                <div className="user flex items-center w-full my-4">
                                    <Avatar className="mr-4">
                                        <AvatarFallback className="bg-violet-600 text-neutral-50 w-full flex items-center justify-center text-neutral-50  font-bold">
                                            L
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h2 className="text-left font-bold">
                                            Lawson{' '}
                                        </h2>
                                        <p className="text-sm dark:text-neutral-300 text-neutral-800">
                                            Musician
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="testimonial shadow-lg flex flex-col items-start justify-center border-2 border-neutral-200 dark:border-neutral-800 my-10 py-4 px-6 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 max-w-[400px]">
                                <h1 className="text-xl w-full text-left font-medium">
                                    &quot;My days have never looked&nbsp;
                                    <span className="font-bold">
                                        more organised
                                    </span>
                                    &quot;
                                </h1>
                                <div className="user flex items-center w-full my-4">
                                    <Avatar className="mr-4 pointer-events-none">
                                        <AvatarFallback className=" bg-violet-600 text-neutral-50 w-full flex items-center justify-center text-neutral-50 font-bold">
                                            W
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h2 className="text-left font-bold">
                                            William
                                        </h2>
                                        <p className="text-sm dark:text-neutral-300 text-neutral-800">
                                            Front-End Engineer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="links">
                        <ul className="flex gap-x-4 text-sm dark:text-neutral-300 text-neutral-800">
                            {/* <li>
                                <Link
                                    href="/about"
                                    className="hover:opacity-50 transition-all duration-300"
                                >
                                    About EvoCal
                                </Link>
                            </li> */}
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="hover:opacity-50 transition-all duration-300"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:opacity-50 transition-all duration-300"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </section>
                </div>
            </header>
        </>
    );
}
