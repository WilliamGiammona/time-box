import { db } from '@/app/firebase';
import { addDoc, collection } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export default function CreateTasks() {
    const [date, setDate] = React.useState<Date>();

    const [task, setTask] = React.useState({
        taskName: '',
        description: '',
        date: date,
    });
    React.useEffect(() => {
        console.log(task);
    }, [task]);

    const handleCreate = async () => {
        console.log(task);
        const tasksCollection = collection(db, 'tasks');
        await addDoc(tasksCollection, task);
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add a task</Button>
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
                                placeholder="Task"
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
                            <Input
                                id="description"
                                name="description"
                                placeholder="Description"
                                className="col-span-3"
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
                                        {date ? (
                                            format(date, 'PPP')
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(selectedDate) => {
                                            setTask({
                                                ...task,
                                                date: selectedDate,
                                            });
                                            setDate;
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

                    {/* include validation with required or other standard HTML validation rules */}
                </DialogContent>
            </Dialog>
        </>
    );
}
