import Image from 'next/image';
import React from 'react';
import timeboxLogo from '@/assets/evocal-2.png';

const loading = () => {
    return (
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center h-full w-full dark:bg-black ">
            <h1 className="flex text-3xl mb-2 z-20 animate-pulse poppins font-medium dark:text-neutral-50 text-neutral-800 py-4">
                Loading
                {/* <div className="flex">
                                <div className="animate-bounce delay-75">.</div>
                                <div className="animate-bounce delay-100">
                                    .
                                </div>
                                <div className="animate-bounce delay-150">
                                    .
                                </div>
                            </div> */}
            </h1>
            <Image
                src={timeboxLogo}
                alt="alt"
                width={80}
                height={80}
                className="my-8 animate-bounce rounded-3xl"
            />
        </div>
    );
};

export default loading;
