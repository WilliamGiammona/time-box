'use server';

import { revalidatePath } from 'next/cache';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '@/auth';

export default async function addToCalendar(formData: {
    title: string;
    eventData: object;
}) {
    const session = await auth();
    const email = session?.user?.email;

    if (email) {
        try {
            const userDocRef = doc(db, 'users', email);
            const eventsCollectionRef = collection(userDocRef, 'events');
            const taskDocRef = doc(eventsCollectionRef);
            const { title, eventData } = formData;

            await setDoc(taskDocRef, { title, ...eventData });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    revalidatePath('/calendar');
}
