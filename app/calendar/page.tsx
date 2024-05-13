'use server';

import Calendar from '../calendar-client-actions/Calendar';
import { auth } from '@/auth';
import getUserTasks from '../calendar-server-actions/getUserTasks';
import getBrainDumpTasks from '../calendar-server-actions/getBrainDump';
type BraindumpItem = {
    title: string;
};

type EventsItem = {
    // Define the properties of a task item object
    id: string;
    allDay: boolean;
    date: Date;
    dateStr: string;
    end: Date;
    start: Date;
    title: string;
    // Add more properties as needed
};

export type CalendarProps = {
    braindump: BraindumpItem;
    tasks: EventsItem[];
};

export default async function NewCalendar() {
    const session = await auth();

    const email = session?.user?.email;

    const tasks = await getUserTasks(email);
    const braindump = await getBrainDumpTasks(email);

    return (
        <>
            <div className="calendar__wrapper flex flex-col dark:bg-neutral-900 bg-neutral-50 pt-[5.9rem] h-full">
                <div className="flex">
                    <Calendar braindump={braindump} tasks={tasks} />
                </div>
            </div>
        </>
    );
}
