'use server';

import { revalidatePath } from 'next/cache';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '@/auth';

export default async function addToBrainDump(formData: FormData) {
    const session = await auth();
    const email = session?.user?.email;

    if (email) {
        try {
            const userDocRef = doc(db, 'users', email);
            const eventsCollectionRef = collection(userDocRef, 'braindump');
            const taskDocRef = doc(eventsCollectionRef);

            //Custom form object to send to the Firebase. Only need title as its in the braindump
            const data = {
                title: formData.get('title'),
                createdAt: serverTimestamp(),
            };

            await setDoc(taskDocRef, data);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    revalidatePath('/calendar');
}
