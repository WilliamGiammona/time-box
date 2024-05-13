'use server';

import { Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '@/auth';
import { doc, updateDoc } from 'firebase/firestore';

interface UpdateEventData {
    eventId: string;
    start: Timestamp;
    end: Timestamp;
    newDate?: Timestamp;
}
export default async function updateUserTask(data: UpdateEventData) {
    const session = await auth();
    const email = session?.user?.email;

    if (email) {
        try {
            const userDocRef = doc(db, 'users', email);
            const eventsCollectionRef = doc(userDocRef, 'events', data.eventId);

            await updateDoc(eventsCollectionRef, {
                ...(data.newDate && { date: data.newDate }),
                start: data.start,
                end: data.end,
            });
        } catch (error) {
            console.error('Error updating user task:', error);
        }
    }
}
