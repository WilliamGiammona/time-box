'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import * as React from 'react';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

//State management for tasks
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    example: string;
    exampleRequired: string;
};

// type Inputs = {
//     title: string;
//     description?: string;
//     date?: Date;
// };

export default function App() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const [handleHover, setHandleHover] = React.useState(false);

    const [date, setDate] = React.useState<Date>();
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/');
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    console.log(watch('example')); // watch input value by passing the name of it

    return (
        <>
            <div className="bg-white h-full w-full transition-all duration-500">
                <div className="row flex">
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="border"
                    >
                        <ResizablePanel
                            className="flex justify-center p-3"
                            minSize={15}
                            maxSize={50}
                        >
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        Add a task
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add a task</DialogTitle>
                                    </DialogHeader>
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="grid gap-4 py-3"
                                    >
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="task"
                                                className="text-right"
                                            >
                                                Task name
                                            </Label>
                                            <Input
                                                id="task"
                                                placeholder="Task"
                                                className="col-span-3"
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="task"
                                                className="text-right"
                                            >
                                                Date
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-[280px] justify-start text-left font-normal',
                                                            !date &&
                                                                'text-muted-foreground'
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? (
                                                            format(date, 'PPP')
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={setDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="task"
                                                className="text-right"
                                            >
                                                Select Hour
                                            </Label>

                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Hour" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">
                                                        1
                                                    </SelectItem>
                                                    <SelectItem value="2">
                                                        2
                                                    </SelectItem>
                                                    <SelectItem value="3">
                                                        3
                                                    </SelectItem>
                                                    <SelectItem value="4">
                                                        4
                                                    </SelectItem>
                                                    <SelectItem value="5">
                                                        5
                                                    </SelectItem>
                                                    <SelectItem value="6">
                                                        6
                                                    </SelectItem>
                                                    <SelectItem value="7">
                                                        7
                                                    </SelectItem>
                                                    <SelectItem value="8">
                                                        8
                                                    </SelectItem>
                                                    <SelectItem value="9">
                                                        9
                                                    </SelectItem>
                                                    <SelectItem value="10">
                                                        10
                                                    </SelectItem>
                                                    <SelectItem value="11">
                                                        11
                                                    </SelectItem>
                                                    <SelectItem value="12">
                                                        12
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                                htmlFor="task"
                                                className="text-right"
                                            >
                                                Select Minutes
                                            </Label>

                                            <div className="flex">
                                                <Select>
                                                    <SelectTrigger className="w-[100px]">
                                                        <SelectValue placeholder="Minutes" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="00">
                                                            00
                                                        </SelectItem>

                                                        <SelectItem value="15">
                                                            15
                                                        </SelectItem>

                                                        <SelectItem value="30">
                                                            30
                                                        </SelectItem>

                                                        <SelectItem value="45">
                                                            45
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                <Select>
                                                    <SelectTrigger className="w-[80px]">
                                                        <SelectValue placeholder="AM" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="AM">
                                                            AM
                                                        </SelectItem>

                                                        <SelectItem value="PM">
                                                            PM
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <input
                                            defaultValue="test"
                                            {...register('example')}
                                        />

                                        {/* include validation with required or other standard HTML validation rules */}
                                        <input
                                            {...register('exampleRequired', {
                                                required: true,
                                            })}
                                        />
                                        {/* errors will return when field validation fails  */}
                                        {errors.exampleRequired && (
                                            <span>This field is required</span>
                                        )}

                                        <input type="submit" />
                                    </form>
                                    <DialogFooter>
                                        <Button type="submit">Add</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </ResizablePanel>
                        <ResizableHandle
                            className="h-screen"
                            withHandle={handleHover}
                            onMouseOver={() => setHandleHover(true)}
                            onMouseLeave={() => setHandleHover(false)}
                        />
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
