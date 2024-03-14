import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';

function Feedback() {
    return (
        <>
            <Button variant={'outline'}>
                <Link href="https://forms.gle/TnvG4iLis5jRnFzk7">Feedback</Link>
            </Button>
        </>
    );
}

export default Feedback;
