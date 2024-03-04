'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import CreateTasks from '@/components/Tasks/CreateTasks';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

import {
    onSnapshot,
    collection,
    query,
    where,
    updateDoc,
    doc,
    deleteDoc,
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface Task {
    id: string;
    taskName: string;
    description: string;
    date: string;
    email?: string;
}

export default function App() {
    const session = useSession();
    const [open, setOpen] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const [task, setTask] = useState({
        taskName: '',
        description: '',
        date: '',
        userEmail: '',
    });

    useEffect(() => {
        const userEmail = session?.data?.user?.email;
        if (!userEmail) {
            console.error('User email is undefined in session data');
            return;
        }

        const emailRef = query(
            collection(db, 'tasks'),
            where('userEmail', '==', userEmail)
        );

        const unsubscribe = onSnapshot(emailRef, (snapshot) => {
            setTasks(
                snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const date = data.date
                        ? data.date.toDate().toDateString()
                        : '';
                    return {
                        id: doc.id,
                        taskName: data.taskName,
                        description: data.description,
                        email: data.userEmail,
                        date: date,
                    };
                })
            );
        });

        return unsubscribe;
    }, [session]);
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/');
        },
    });

    const editDocument = async (
        id: string,
        name: string,
        desc: string,
        date: string
    ) => {
        console.log(id, name, desc, date);
        console.log(task.taskName, task.description, task.date);

        await updateDoc(doc(db, 'tasks', id), {
            taskName: task.taskName,
            description: task.description,
            date: task.date,
        });
    };

    const deleteDocument = async (id: string) => {
        console.log(id);
        await deleteDoc(doc(db, 'tasks', id));
    };

    const getTaskDetails = (
        id: string,
        name: string,
        desc: string,
        date: string
    ) => {
        setTask({
            ...task,
            taskName: name,
            description: desc,
            date: date,
        });
    };

    const editButton = (
        id: string,
        name: string,
        desc: string,
        date: string
    ) => {
        return (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="secondary"
                            className="my-4 max-w-30 mx-auto"
                            onClick={() => getTaskDetails(id, name, desc, date)}
                        >
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit task</DialogTitle>
                        </DialogHeader>
                        <form
                            className="grid gap-4 py-3"
                            onSubmit={(e) => {
                                e.preventDefault();
                                editDocument(id, name, desc, date);
                            }}
                        >
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="task" className="text-right">
                                    Task name
                                </Label>
                                <Input
                                    id="task"
                                    name="taskName"
                                    placeholder={name}
                                    className="col-span-3"
                                    onChange={(e) =>
                                        setTask({
                                            ...task,
                                            taskName: e.target.value,
                                        })
                                    }
                                    required={true}
                                    value={task.taskName}
                                />

                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder={desc}
                                    className="col-span-3"
                                    maxLength={100}
                                    onChange={(e) =>
                                        setTask({
                                            ...task,
                                            description: e.target.value,
                                        })
                                    }
                                    value={task.description}
                                    required={true}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="task" className="text-right">
                                    Date
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[280px] justify-start text-left font-normal',
                                                !date && 'text-muted-foreground'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {task.date ? (
                                                task.date?.toLocaleString()
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={task.date}
                                            onSelect={(selectedDate) => {
                                                setTask({
                                                    ...task,
                                                    date: selectedDate,
                                                });
                                            }}
                                            required={true}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={() => setOpen(!open)}
                                >
                                    Edit
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        );
    };

    return (
        <>
            <div className="bg-white h-full w-full transition-all duration-500">
                <div className="row flex">
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="border"
                    >
                        <ResizablePanel
                            className="flex flex-col align-center p-3"
                            minSize={15}
                            maxSize={50}
                        >
                            <CreateTasks />

                            <ul>
                                {tasks.map(
                                    (task) => (
                                        console.log(task),
                                        (
                                            <li
                                                key={task.id}
                                                className="flex flex-col border border-slate-300 p-3 my-3  min-w-32 rounded-lg max-w-content"
                                            >
                                                <h2 className="text-lg font-bold">
                                                    {task.taskName}
                                                </h2>
                                                <p>{task.description}</p>
                                                <div className="inline-flex items-center border border-white p-1 rounded-lg max-w-44 bg-slate-100">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {task.date || (
                                                        <>
                                                            <p className="text-slate-400">
                                                                No date
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                                {/* <p>{task.email}</p>
                                                <p>{task.id}</p> */}

                                                <div className="task__manage">
                                                    {editButton(
                                                        task.id,
                                                        task.taskName,
                                                        task.description,
                                                        task.date
                                                    )}
                                                    <Button
                                                        className="mx-3"
                                                        onClick={() =>
                                                            deleteDocument(
                                                                task.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </ResizablePanel>
                        <ResizableHandle className="h-screen" />
                        <ResizablePanel className="p-4">
                            Calendar Tasks Main
                        </ResizablePanel>
                    </ResizablePanelGroup>
                    <div className="border-y border-solid bg-white p-4 min-w-40 flex justify-center">
                        Timebox
                    </div>
                </div>
            </div>
        </>
    );
}

App.requireAuth = true;
