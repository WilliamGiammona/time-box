'use server';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebase';

//Server function
export default async function getUserTasks(email) {
    try {
        //Create reference to the user using their email
        const userDocRef = doc(db, 'users', email);
        //Find the events collection
        const eventsCollectionRef = collection(userDocRef, 'events');
        //Get the documents within the events collection
        const querySnapshot = await getDocs(eventsCollectionRef);
        const tasks = [];

        //Add events to the array for each item in the events collection
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            tasks.push({
                id: doc.id,
                ...docData,
                date: docData.date && docData.date.toDate(),
                start: docData.start && docData.start.toDate(),
                end: docData.end && docData.end.toDate(),
            });
        });
        // console.log('Tasks', tasks);

        return tasks;
    } catch (error) {
        console.error('Error getting documents:', error);
        return [];
    }
}
