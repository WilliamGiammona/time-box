'use server';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export default async function deleteBrainDumpTask(id: string) {
    const session = await auth();
    const email = session?.user?.email;
    // console.log(id);
    // console.log(typeof id);
    try {
        await deleteDoc(doc(db, `users/${email}/braindump/${id}`));
    } catch (error) {
        console.log('Error deleting braindump task: ' + id);
    }
    revalidatePath('/calendar');
}
