'use client';
import React, { useTransition, useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
    DateClickArg,
    Draggable,
    DropArg,
} from '@fullcalendar/interaction';
// import { Dialog, Transition } from '@headlessui/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import { EventContentArg, EventSourceInput } from '@fullcalendar/core/index.js';
import { Button } from '@/components/ui/button';

import { Transition, Dialog } from '@headlessui/react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import addToBrainDump from '../calendar-server-actions/addToBrainDump';
import deleteBrainDumpTask from '../calendar-server-actions/deleteBrainDumpTask';
import addToCalendar from '../calendar-server-actions/addToCalendar';
import updateUserTask from '../calendar-server-actions/updateUserTask';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import deleteCalendarTask from '../calendar-server-actions/deleteCalendarTask';
import timeboxLogo from '../../assets/evocal-2.png';
import Image from 'next/image';
import { useOptimistic } from 'react';
import { BrainDumpTask } from '../calendar-server-actions/getBrainDump';
import { EventItem } from '../calendar-server-actions/getUserTasks';
import { addMinutes, format } from 'date-fns';

function Calendar({
    braindump,
    tasks,
}: {
    braindump: BrainDumpTask[];
    tasks: EventItem[];
}) {
    const [optimisticBraindump, addOptimisticBraindump] = useOptimistic(
        braindump,
        (state: BrainDumpTask[], newBraindump: BrainDumpTask) => {
            return [...state, newBraindump];
        }
    );
    console.log(tasks);
    const [optimisticTasks, addOptimisticTask] = useOptimistic<
        EventItem[],
        EventItem
    >(tasks, (state, newTask) => {
        return [...state, newTask];
    });

    useEffect(() => {
        console.log(optimisticTasks);
    }, [optimisticTasks]);

    const calendarRef = useRef<FullCalendar | null>(null);
    const [calendarTitle, setCalendarTitle] = useState('');
    const [adding, setAdding] = useState(false);
    const [title, setTitle] = useState('');
    const [deleteLocation, setDeleteLocation] = useState<string | null>(null);

    //Used for the server loading state
    const [isPending, startTransition] = useTransition();

    const [calendarView, setCalendarView] = useState('week');
    const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

    //Modals
    //Delete modal
    const [showDeleteModal, setDeleteModal] = useState(false);
    //Add task modal
    const [showAddTaskModal, setAddTaskModal] = useState(false);

    type EventData = {
        date: Date | null;
        start: Date | null;
        end: Date | null;
        allDay: boolean;
        dateStr: string;
    };

    const [eventData, setEventData] = useState<EventData>({
        date: null,
        start: null,
        end: null,
        allDay: false,
        dateStr: '',
    });

    const [eventTag, setEventTag] = useState('bg-gray-400');

    function handleChangeView(value: string) {
        let calendarView;
        switch (value) {
            case 'day':
                calendarView = 'timeGridDay';
                break;
            case 'week':
                calendarView = 'timeGridWeek';
                break;
            case 'month':
                calendarView = 'dayGridMonth';
                break;
            default:
                calendarView = 'timeGridWeek'; // Default view
                break;
        }

        if (calendarRef.current) {
            calendarRef.current.getApi().changeView(calendarView);
            return getTitle();
        }
    }

    function setToday() {
        calendarRef.current!.getApi().today();
        return getTitle();
    }

    function setPrevious() {
        calendarRef.current!.getApi().prev();
        return getTitle();
    }

    function setNext() {
        calendarRef.current!.getApi().next();
        return getTitle();
    }

    function getTitle() {
        if (calendarRef.current) {
            const view = calendarRef.current.getApi().view;
            setCalendarTitle(view.title);
            return view.title;
        }
        return '';
    }

    function handleDeleteTaskModal(deleteLocation: string, id: string) {
        setDeleteModal(true);
        setDeleteLocation(deleteLocation);
        setTaskIdToDelete(id);
    }

    const handleDeleteTask = async () => {
        setDeleteModal(false);

        if (deleteLocation === 'braindump') {
            if (taskIdToDelete !== null) {
                await deleteBrainDumpTask(taskIdToDelete);
            }
        }

        if (deleteLocation === 'events') {
            if (taskIdToDelete !== null) {
                await deleteCalendarTask(taskIdToDelete);
            }
        }

        setDeleteModal(false);
    };

    function handleDateClick(e: DateClickArg) {
        // Extract the relevant properties from the event object
        const eventDetails = {
            date: e.date,
            start: e.date,
            end: addMinutes(e.date, 60),
            allDay: e.allDay,
            dateStr: e.dateStr,
        };
        setEventData(eventDetails);
        setAddTaskModal(true);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const addToCalendarWithData = async () => {
        const eventItem = {
            id: null, // Generate or retrieve an ID for the event
            title: title as string,
            tag: eventTag as string,
            date: eventData.date,
            start: eventData.start,
            end: eventData.end,
            allDay: eventData.allDay,
            dateStr: eventData.dateStr,
        };

        const eventItemUpload = {
            id: null, // Generate or retrieve an ID for the event
            title: title as string,
            tag: eventTag as string,
            date: eventData.date,
            start: eventData.start,
            end: eventData.end,
            allDay: eventData.allDay,
            dateStr: eventData.dateStr,
        };

        addOptimisticTask(eventItem);

        if (eventItem.date) {
            await addToCalendar(eventItemUpload);
        }
    };

    const addToBrainDumpData = async (formData: FormData) => {
        const title = formData.get('title');
        addOptimisticBraindump({
            id: (Object.keys(optimisticBraindump).length + 1).toString(),
            title: title as string,
            createdAt: serverTimestamp() as Timestamp,
        });
        await addToBrainDump(formData);
    };

    const handleTaskDrop = async (data: DropArg) => {
        const eventDataPlain = {
            id: null,
            title: data.draggedEl.innerHTML,
            date: data.date,
            start: data.date,
            end: addMinutes(data.date, 60),
            tag: eventTag,
            allDay: data.allDay,
            dateStr: data.dateStr,
        };

        startTransition(async () => {
            try {
                await addToCalendar(eventDataPlain);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        });
    };

    const renderEventContent = (argObj: EventContentArg) => {
        const { event } = argObj;

        const tag = event.extendedProps.tag || 'bg-gray-400';

        return (
            <div>
                <div className="flex items-center text-neutral-800 dark:text-neutral-50">
                    <div
                        className={`w-2 h-2 rounded-full border border-neutral-800/50 hover:opacity-50 transition-all duration-300 mx-1 ${tag}`}
                    />
                    <div className="flex flex-col">
                        <div className="w-full">{event.title}</div>
                        <div className="text-xs flex w-full dark:text-neutral-300 text-neutral-600">
                            {event.start && event.end
                                ? `${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}`
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const draggableEl = document.getElementById('draggable-el');

        if (draggableEl) {
            const draggable = new Draggable(draggableEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    const title = eventEl.getAttribute('title');
                    const id = eventEl.getAttribute('id');
                    return { title, id };
                },
            });

            // Cleanup function to destroy the Draggable instance
            return () => {
                draggable.destroy();
            };
        }
    }, []);

    return (
        <>
            <ResizablePanelGroup
                className="w-full h-[90vh] flex items-center justify-center px-16 py-4"
                direction="horizontal"
            >
                <div className="flex justify-start w-full h-full py-4">
                    <ResizablePanel defaultSize={15} minSize={15} maxSize={30}>
                        <div
                            id="draggable-el"
                            className="flex h-full overflow-y-scroll w-full flex-col border-2 rounded-lg py-4 md:p-1"
                        >
                            <h1 className="font-bold lg:text-lg md:text-base md:py-2 text-center  mx-auto py-4 border-b w-full">
                                Brain Dump🧠
                            </h1>
                            <div id="braindump-tasks" className="p-2">
                                <h2 className="mt-1 text-purple-400">Tasks</h2>

                                <div className="flex flex-col w-full items-center justify-center">
                                    {optimisticBraindump.map((task) => (
                                        <motion.div
                                            className={`hover:cursor-pointer relative h-full text-center fc-event w-full my-2 py-2 text-sm dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-800 rounded-lg`}
                                            title={task.title}
                                            key={task.id}
                                            id="draggable-el"
                                            draggable="true"
                                            onClick={() => {
                                                handleDeleteTaskModal(
                                                    'braindump',
                                                    task.id!.toString()
                                                );
                                            }}
                                        >
                                            {task.title}
                                        </motion.div>
                                    ))}
                                </div>

                                {!adding && (
                                    <div
                                        className="flex items-center text-sm mt-4 text-neutral-400 hover:cursor-pointer hover:bg-neutral-200 hover:text-neutral-800 dark:hover:text-neutral-50 dark:hover:bg-neutral-800 p-2 rounded-lg"
                                        onClick={() => setAdding(true)}
                                    >
                                        <h2>Add tasks</h2>
                                        <FiPlus className="mx-2" />
                                    </div>
                                )}

                                {adding && (
                                    <form
                                        className="flex flex-col my-4"
                                        action={addToBrainDumpData}
                                        onSubmit={() => setAdding(false)}
                                    >
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Add a task..."
                                            className="border-2 border-purple-400 rounded-md w-full p-2 bg-purple-400/20 text-md text-purple-400 placeholder:text-sm"
                                        />
                                        <div className="flex w-full justify-end my-4">
                                            <button
                                                type="button"
                                                onClick={() => setAdding(false)}
                                                className="text-sm mx-4"
                                            >
                                                Close
                                            </button>

                                            <button
                                                type="submit"
                                                className="flex items-center text-sm bg-neutral-50 text-neutral-800 p-1 px-2 rounded-lg"
                                            >
                                                Add <FiPlus />
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle
                        withHandle
                        className="bg-transparent rounded-lg mr-4"
                    />

                    <ResizablePanel defaultSize={75}>
                        <div className="w-full h-full rounded-lg">
                            <div className="options flex items-center justify-between mb-8">
                                <div className="left flex items-center justify-center">
                                    <div className="middle mr-8 flex items-center justify-center">
                                        <FaAngleLeft
                                            className="hover:cursor-pointer flex items-center justify-center mx-1 bg-neutral-300 dark:bg-neutral-800 rounded-full h-8 w-8 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
                                            onClick={() => setPrevious()}
                                        ></FaAngleLeft>

                                        <FaAngleRight
                                            className="hover:cursor-pointer flex items-center justify-center bg-neutral-300 dark:bg-neutral-800 rounded-full h-8 w-8 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
                                            onClick={() => setNext()}
                                        ></FaAngleRight>
                                        <Button
                                            className="mx-4 flex items-center justify-center dark:bg-neutral-800 bg-neutral-200 dark:text-neutral-50 text-neutral-800 dark:hover:bg-neutral-700 transition-all"
                                            onClick={setToday}
                                        >
                                            Today
                                        </Button>
                                    </div>
                                    <h1 className="font-bold h-full text-lg">
                                        {calendarTitle}
                                    </h1>
                                </div>

                                <div className="right">
                                    <Select
                                        value={calendarView}
                                        onValueChange={(value) => {
                                            setCalendarView(value);
                                            handleChangeView(value);
                                        }}
                                        defaultValue="week"
                                    >
                                        <SelectTrigger className="w-[180px] text-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
                                            <SelectValue placeholder="View" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Calendar View
                                                </SelectLabel>
                                                <SelectItem value="day">
                                                    Day
                                                </SelectItem>
                                                <SelectItem value="week">
                                                    Week
                                                </SelectItem>
                                                <SelectItem value="month">
                                                    Month
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <FullCalendar
                                ref={calendarRef}
                                height={'100%'}
                                plugins={[
                                    dayGridPlugin,
                                    interactionPlugin,
                                    timeGridPlugin,
                                ]}
                                slotDuration={'00:15:00'}
                                initialView="timeGridWeek"
                                headerToolbar={false}
                                allDayText="All day"
                                events={optimisticTasks as EventSourceInput}
                                nowIndicator={true}
                                editable={true}
                                droppable={true}
                                selectable={true}
                                selectMirror={true}
                                eventContent={(argObj) =>
                                    renderEventContent(argObj)
                                }
                                eventClick={(e) => {
                                    handleDeleteTaskModal('events', e.event.id);
                                }}
                                drop={(data) => handleTaskDrop(data)}
                                dateClick={(e) => handleDateClick(e)}
                                // drop={(data) => addEvent(data)}
                                eventDrop={(data) => {
                                    const { event } = data;

                                    const updateData = {
                                        eventId: event.id,
                                        newDate: event.start as Date,
                                        allDay: event.allDay as boolean,
                                        start: event.start as Date,
                                        end:
                                            (event.end && event.end) ||
                                            (addMinutes(
                                                event.start!,
                                                60
                                            ) as Date),
                                    };

                                    updateUserTask(updateData);
                                }}
                                eventResize={(data) => {
                                    const { event } = data;

                                    const updateData = {
                                        eventId: event.id,
                                        allDay: event.allDay as boolean,
                                        start: event.start as Date,
                                        end: event.end as Date,
                                    };
                                    updateUserTask(updateData);
                                }}
                            />
                        </div>
                    </ResizablePanel>
                </div>

                <Transition.Root
                    show={false}
                    as="div"
                    className="top-0 left-0 absolute w-full h-full z-20 dark:bg-black"
                >
                    <div className="flex flex-col items-center justify-center top-1/2 left-1/2 h-full w-full">
                        <h1 className="flex text-2xl font-base mb-2 z-20 animate-pulse">
                            Uploading
                            {/* <div className="flex">
                                <div className="animate-bounce delay-75">.</div>
                                <div className="animate-bounce delay-100">
                                    .
                                </div>
                                <div className="animate-bounce delay-150">
                                    .
                                </div>
                            </div> */}
                        </h1>
                        <Image
                            src={timeboxLogo}
                            alt="alt"
                            width={80}
                            height={80}
                            className="animate-spin-decelerate"
                        />
                    </div>
                </Transition.Root>

                <Transition.Root show={showDeleteModal} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setDeleteModal(false)}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-neutral-800/80 bg-opacity-75 transition-opacity"></div>
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg dark:bg-neutral-900 bg-neutral-100">
                                        <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                                                    <ExclamationTriangleIcon
                                                        className="h-6 w-6 text-red-600 dark:text-red-600"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-base font-semibold leading-6 text-neutral-900 dark:text-neutral-100"
                                                    >
                                                        Delete Event
                                                    </Dialog.Title>

                                                    <div className="mt-2">
                                                        <p className="text-sm text-neutral-500">
                                                            Are you sure you
                                                            want to delete this
                                                            event?
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-neutral-800 bg-neutral-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-400 sm:ml-3 sm:w-auto"
                                                onClick={handleDeleteTask}
                                            >
                                                Delete
                                            </button>

                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold dark:text-neutral-100 text-neutral-800
                      shadow-sm ring-1 ring-inset dark:ring-neutral-600 ring-neutral-400 dark:hover:bg-neutral-700 hover:bg-neutral-300 sm:mt-0 sm:w-auto"
                                                onClick={() =>
                                                    setDeleteModal(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/*
                    <Transition.Root show={showDeleteModal} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={setShowDeleteModal}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity"></div>
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-neutral-900">
                                            <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                                                        <ExclamationTriangleIcon
                                                            className="h-6 w-6 text-red-600 dark:text-red-600"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-base font-semibold leading-6text-neutral-900"
                                                        >
                                                            Delete Event
                                                        </Dialog.Title>

                                                        <div className="mt-2">
                                                            <p className="text-sm text-neutral-500">
                                                                Are you sure you
                                                                want to delete
                                                                this event?
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-neutral-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    onClick={() =>
                                                        handleDelete()
                                                    }
                                                >
                                                    Delete
                                                </button>

                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-neutral-100 
                      shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-700 sm:mt-0 sm:w-auto"
                                                    onClick={handleCloseModal}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>
*/}
                <Transition.Root show={showAddTaskModal} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => setAddTaskModal(false)}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-neutral-800/80 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg  px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 bg-neutral-100 dark:bg-neutral-900">
                                        <div>
                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <FiCalendar
                                                    className="h-6 w-6 text-green-600"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-base font-semibold leading-6 text-neutral-900 dark:text-neutral-50"
                                                >
                                                    Add Event
                                                </Dialog.Title>
                                                <form
                                                    action={
                                                        addToCalendarWithData
                                                    }
                                                    onSubmit={() => {
                                                        setAddTaskModal(false);
                                                        setEventTag(
                                                            'bg-gray-400'
                                                        );
                                                    }}
                                                >
                                                    <div className="flex mt-2">
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id="title"
                                                            onChange={
                                                                handleTitleChange
                                                            }
                                                            className="block w-full rounded-md border-0 py-1.5 dark:text-neutral-50 dark:text-neutral-100
                            shadow-sm placeholder:text-neutral-400 
                            dark:bg-neutral-800 px-2
                            bg-neutral-100
                            focus-visible:border-none
                            border-transparent focus:border-transparent
                            focus:ring-0
                            focus:ring-offset-0
                            border-none
                            
                            sm:text-sm sm:leading-6"
                                                            placeholder="Title"
                                                        />
                                                        <Select
                                                            value={eventTag}
                                                            onValueChange={(
                                                                value
                                                            ) =>
                                                                setEventTag(
                                                                    value
                                                                )
                                                            }
                                                            defaultValue="bg-gray-400"
                                                        >
                                                            <SelectTrigger className="w-[180px] text-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
                                                                <SelectValue
                                                                    placeholder="Tag Color"
                                                                    className="text-neutral-800"
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="bg-gray-400">
                                                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                                                    </SelectItem>
                                                                    <SelectItem value="bg-purple-400">
                                                                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                                                    </SelectItem>
                                                                    <SelectItem value="bg-blue-400">
                                                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                                                    </SelectItem>
                                                                    <SelectItem value="bg-red-400">
                                                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 sm:col-start-2 disabled:opacity-25"
                                                            disabled={
                                                                title.length <
                                                                    1 ||
                                                                isPending
                                                            }
                                                        >
                                                            Create
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:dark:bg-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 sm:col-start-1 sm:mt-0"
                                                            onClick={() => {
                                                                setAddTaskModal(
                                                                    false
                                                                );
                                                                setEventTag(
                                                                    'bg-gray-400'
                                                                );
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </ResizablePanelGroup>
        </>
    );
}

export default Calendar;
