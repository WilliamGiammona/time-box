'use server';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { TaskItem } from '@/lib/utils';

//Server function
export type EventItem = {
    // Define the properties of a task item object
    id: string | null;
    allDay: boolean;
    date: Date | null;
    dateStr: string;
    start: Date | null;
    end: Date | null;
    title: string;
    tag: string | undefined;
};

export default async function getUserTasks(email: string) {
    try {
        //Create reference to the user using their email
        const userDocRef = doc(db, 'users', email);
        //Find the events collection
        const eventsCollectionRef = collection(userDocRef, 'events');
        //Get the documents within the events collection
        const querySnapshot = await getDocs(eventsCollectionRef);
        const tasks: TaskItem[] = [];

        //Add events to the array for each item in the events collection
        querySnapshot.forEach((doc) => {
            const { allDay, date, dateStr, start, end, title, tag } =
                doc.data();
            tasks.push({
                id: doc.id,
                allDay,
                tag,
                date,
                dateStr,
                start: start || undefined, // Format start
                end: end || undefined, // Format end
                title,
            });
        });

        return tasks;
    } catch (error) {
        console.error('Error getting documents:', error);
        return [];
    }
}
