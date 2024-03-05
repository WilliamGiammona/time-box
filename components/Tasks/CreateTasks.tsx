'use client';
import { db } from '@/app/firebase';
import { addDoc, collection } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useSession } from 'next-auth/react';

export default function CreateTasks() {
    const [open, setOpen] = useState(false);

    const session = useSession();

    const [task, setTask] = useState({
        taskName: '',
        description: '',
        date: '',
        userEmail: '',
    });

    useEffect(() => {
        setTask((prevTask) => ({
            ...prevTask,
            userEmail: session.data?.user?.email || '',
        }));
    }, [session]);

    const handleCreate = async () => {
        console.log(task);
        const tasksCollection = collection(db, 'tasks');
        await addDoc(tasksCollection, task);
        setOpen(!open);
        setTask({
            taskName: '',
            description: '',
            date: '',
            userEmail: '',
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="my-4 max-w-30 mx-auto">
                        Add a task
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add a task</DialogTitle>
                    </DialogHeader>
                    <form
                        className="grid gap-4 py-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreate();
                        }}
                    >
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="task" className="text-right">
                                Task name
                            </Label>
                            <Input
                                id="task"
                                name="taskName"
                                placeholder={'Task'}
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

                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Description"
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
                                            !task.date &&
                                                'text-muted-foreground'
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {task.date ? (
                                            task.date?.toDateString()
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
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
