import { type ClassValue, clsx } from 'clsx';
import { Timestamp } from 'firebase/firestore';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type TaskItem = {
    // Define the properties of a task item object
    id: string | null;
    allDay: boolean;
    date: Timestamp | null;
    dateStr: string;
    start: Timestamp | null;
    end: Timestamp | null;
    title: string;
    tag: string | undefined;
};

export function convertFirebaseEventDates(tasks: TaskItem[]) {
    return tasks.map((item) => {
        return {
            id: item.id,
            allDay: item.allDay,
            date: item.date && new Date(item.date.seconds * 1000),
            dateStr: item.dateStr,
            start: item.start && new Date(item.start.seconds * 1000),
            end: item.end && new Date(item.end.seconds * 1000),
            title: item.title,
            tag: item.tag,
        };
    });
}
