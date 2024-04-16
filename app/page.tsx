'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import appMockupLight from '@/assets/Lightmode-mockup.png';
import appMockupDark from '@/assets/Darkmode-mockup.png';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Avatar } from '@/components/ui/avatar';
export default function Home() {
    const router = useRouter();
    const session = useSession();

    return (
        <>
            <header>
                <div className="flex max-w-[1200px] w-[100%] mx-auto flex flex-col text-center h-full items-center justify-start my-10 mb-4">
                    <h1 className="animate-fade-in-bottom bg-gradient-to-r from-blue-600 to-indigo-400 inline-block text-transparent bg-clip-text text-6xl font-bold h-auto poppins py-4 ">
                        Get things done.
                    </h1>
                    <h2 className="mb-4 poppins animate-fade-in-bottom">
                        Organise your thoughts and plan your day in a beautiful
                        and simple app.
                    </h2>
                    <Button
                        className="mb-10 bg-gradient-to-r from-blue-600 to-indigo-400 dark:hover:from-neutral-900 hover:from-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-50 transition duration-300 hover:to-neutral-100 dark:hover:to-transparent py-6 px-4 text-md border"
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
                        Try EvoCal - It&apos;s Free
                    </Button>
                </div>
                <div className="relative animate-fade-in-bottom left-0 w-full lg:h-[60vh] md:h-[40vh]">
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
                </div>
                <div className="absolute translate-y-[-100px] z-[-1]">
                    <div className="gradient relative w-[120vw] h-[500px] translate-x-[-100px] bg-gradient-to-t dark:from-background backdrop-blur-3xl dark:via-neutral-900 blur-3xl dark:to-background opacity-100 left-[0] z-[-10] from-neutral-300 via-neutral-300 to-neutral-100" />
                </div>
                <div className="flex max-w-[1200px] w-[100%] mx-auto flex flex-col text-center items-center justify-center my-10">
                    <section id="testimonials" className="flex gap-x-8 mt-10">
                        <div className="testimonial shadow-lg flex flex-col items-start justify-center border-2 border-neutral-400 my-10 py-4 px-6 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 max-w-[400px]">
                            <h1 className="text-xl w-full text-left font-medium">
                                &quot;If you want to supercharge your day,
                                Evocal is&nbsp;
                                <span className="font-bold">
                                    the application&quot;
                                </span>
                            </h1>
                            <div className="user flex items-center w-full my-4">
                                <Avatar className="mr-4">
                                    <AvatarFallback className="dark:bg-neutral-300 bg-gradient-to-r from-blue-600 to-blue-400 w-full flex items-center justify-center text-neutral-50   font-bold">
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

                        <div className="testimonial shadow-lg flex flex-col items-start justify-center border-2 border-neutral-400 my-10 py-4 px-6 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 max-w-[400px]">
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
                                    <AvatarFallback className="dark:bg-neutral-300 bg-gradient-to-r from-blue-600 to-blue-400 w-full flex items-center justify-center text-neutral-50  font-bold">
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

                        <div className="testimonial shadow-lg flex flex-col items-start justify-center border-2 border-neutral-400 my-10 py-4 px-6 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 max-w-[400px]">
                            <h1 className="text-xl w-full text-left font-medium">
                                &quot;My days have never looked&nbsp;
                                <span className="font-bold">
                                    more organised
                                </span>
                                &quot;
                            </h1>
                            <div className="user flex items-center w-full my-4">
                                <Avatar className="mr-4">
                                    <AvatarFallback className="dark:bg-neutral-300 bg-gradient-to-r from-blue-600 to-blue-400 w-full flex items-center justify-center text-neutral-50 font-bold">
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
                    </section>
                </div>
            </header>
        </>
    );
}
