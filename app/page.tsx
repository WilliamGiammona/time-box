'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <>
            <header className="">
                <div className="flex max-w-[1200px] w-[100%] mx-auto flex flex-col text-center h-screen items-center justify-center">
                    <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-5xl font-bold">
                        Get things done.
                    </h1>
                    <h2 className="my-3">
                        Timebox helps you organise your thoughts and plan your
                        day in a beautiful and simple app.
                    </h2>
                    <Button
                        className="my-5"
                        onClick={() => router.push('/calendar')}
                    >
                        Get started
                    </Button>
                </div>
            </header>
        </>
    );
}
