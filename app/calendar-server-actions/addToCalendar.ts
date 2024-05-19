'use server';

import { revalidatePath } from 'next/cache';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '@/auth';

export default async function addToCalendar(eventItem: {
    id: string | null; // Generate or retrieve an ID for the event
    title: string;
    tag: string;
    date: Date | null;
    start: Date | null;
    end: Date | null;
    allDay: boolean;
    dateStr: string;
}) {
    const session = await auth();
    const email = session?.user?.email;

    if (email) {
        try {
            const userDocRef = doc(db, 'users', email);
            const eventsCollectionRef = collection(userDocRef, 'events');
            const taskDocRef = doc(eventsCollectionRef);

            await setDoc(taskDocRef, eventItem);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    revalidatePath('/calendar');
}
