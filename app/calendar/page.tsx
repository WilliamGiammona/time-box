'use server';

import Calendar from '../calendar-client-actions/Calendar';
import { auth } from '@/auth';
import getUserTasks from '../calendar-server-actions/getUserTasks';
import getBrainDumpTasks from '../calendar-server-actions/getBrainDump';

export default async function NewCalendar() {
    const session = await auth();

    const email = session?.user?.email;

    if (!email) return;
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
