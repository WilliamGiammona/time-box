'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import appMockupLight from '@/assets/evocal-mockup-light.png';
import appMockupDark from '@/assets/evocal-mockup-dark.png';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

export default function Home() {
    const router = useRouter();
    const session = useSession();

    return (
        <>
            <header>
                <div className="flex max-w-[1200px] w-[100%] mx-auto flex flex-col text-center h-screen items-center justify-center">
                    <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-6xl font-bold h-auto poppins">
                        Get things done.
                    </h1>
                    <h2 className="my-3 mb-8 poppins">
                        Timebox helps you organise your thoughts and plan your
                        day in a beautiful and simple app.
                    </h2>
                    <Button
                        className="my-5"
                        onClick={() => {
                            router.push('/calendar');
                            if (!session.data?.user) {
                                toast('❌ Cannot access page', {
                                    description:
                                        'You must be signed in to access this',
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
                        Get started
                    </Button>
                    <div>
                        <div className="relative mx-auto border-neutral-800 dark:border-neutral-800 bg-neutral-800 border-[8px] rounded-t-xl h-[302px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                            <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-neutral-800">
                                <Image
                                    src={appMockupLight}
                                    className="dark:hidden h-[156px] md:h-[278px] w-full rounded-xl"
                                    alt="laptop-screen"
                                    width={800}
                                    height={400}
                                />
                                <Image
                                    src={appMockupDark}
                                    className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
                                    alt="laptop-screen-dark"
                                    width={800}
                                    height={400}
                                />
                            </div>
                        </div>
                        <div className="relative mx-auto w-[90vw] bg-neutral-900 dark:bg-neutral-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-neutral-800"></div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
