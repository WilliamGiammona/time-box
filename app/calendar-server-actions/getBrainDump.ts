'use server';
import {
    collection,
    getDocs,
    doc,
    query,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

//Server function

export type BrainDumpTask = {
    id: string | undefined;
    title: string;
    createdAt: Timestamp;
};

export default async function getBrainDumpTasks(email: string) {
    try {
        //Create reference to the user using their email
        const userDocRef = doc(db, 'users', email);
        //Find the events collection
        const eventsCollectionRef = collection(userDocRef, 'braindump');

        // Create a query with the orderBy clause
        const q = query(eventsCollectionRef, orderBy('createdAt', 'asc'));

        //Get the documents within the events collection
        const querySnapshot = await getDocs(q);
        const braindump: BrainDumpTask[] = [];

        //Add events to the array for each item in the events collection
        querySnapshot.forEach((doc) => {
            const { createdAt, title } = doc.data();
            braindump.push({ id: doc.id, createdAt, title });
        });

        return braindump;
    } catch (error) {
        console.error('Error getting documents:', error);
        return [];
    }
}
