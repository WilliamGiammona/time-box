// 'use client';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// import {
//     ResizableHandle,
//     ResizablePanel,
//     ResizablePanelGroup,
// } from '@/components/ui/resizable';
// import CreateTasks from '@/components/Tasks/CreateTasks';
// import { db } from '../firebase';
// import { useEffect } from 'react';

// import {
//     onSnapshot,
//     collection,
//     query,
//     where,
//     updateDoc,
//     doc,
//     deleteDoc,
// } from 'firebase/firestore';
// import { Button } from '@/components/ui/button';
// import {
//     Dialog,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Calendar } from '@/components/ui/calendar';

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from '@/components/ui/popover';
// import { Textarea } from '@/components/ui/textarea';
// import { cn } from '@/lib/utils';
// import { CalendarIcon, Pencil, Trash2 } from 'lucide-react';
// import { motion, Reorder } from 'framer-motion';

// interface Task {
//     id: string;
//     taskName: string;
//     description: string;
//     date: string;
//     email?: string;
// }

// export default function App() {
//     const session = useSession();
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [tasks, setTasks] = useState<Task[]>([]);

//     const [task, setTask] = useState({
//         taskName: '',
//         description: '',
//         date: '',
//         userEmail: '',
//     });

//     useEffect(() => {
//         const userEmail = session?.data?.user?.email;
//         if (!userEmail) {
//             console.error('User email is undefined in session data');
//             return;
//         }

//         const emailRef = query(
//             collection(db, 'tasks'),
//             where('userEmail', '==', userEmail)
//         );

//         const unsubscribe = onSnapshot(emailRef, (snapshot) => {
//             setTasks(
//                 snapshot.docs.map((doc) => {
//                     const data = doc.data();
//                     const date = data.date
//                         ? data.date.toDate().toDateString()
//                         : '';
//                     return {
//                         id: doc.id,
//                         taskName: data.taskName,
//                         description: data.description,
//                         email: data.userEmail,
//                         date: date,
//                     };
//                 })
//             );
//         });

//         return unsubscribe;
//     }, [session]);
//     useSession({
//         required: true,
//         onUnauthenticated() {
//             redirect('/');
//         },
//     });

//     const editDocument = async (
//         id: string,
//         name: string,
//         desc: string,
//         date: string
//     ) => {
//         console.log(id, name, desc, date);
//         console.log(task.taskName, task.description, task.date);

//         await updateDoc(doc(db, 'tasks', id), {
//             taskName: task.taskName,
//             description: task.description,
//             date: task.date,
//         });
//     };

//     const deleteDocument = async (id: string) => {
//         console.log(id);
//         await deleteDoc(doc(db, 'tasks', id));
//     };

//     const getTaskDetails = (
//         id: string,
//         name: string,
//         desc: string,
//         date: string
//     ) => {
//         setTask({
//             ...task,
//             taskName: name,
//             description: desc,
//             date: date,
//         });
//     };

//     const dateRange = getDateRange();

//     function getDateRange() {
//         const currentDate = new Date();
//         const startDate = new Date(currentDate);
//         startDate.setDate(startDate.getDate() - 7); // Get date 7 days before current date
//         const endDate = new Date(currentDate);
//         endDate.setDate(endDate.getDate() + 7); // Get date 7 days after current date

//         const dates = [];
//         const currentDateIter = new Date(startDate);
//         while (currentDateIter <= endDate) {
//             dates.push(new Date(currentDateIter));
//             currentDateIter.setDate(currentDateIter.getDate() + 1);
//         }

//         return dates;
//     }

//     const editButton = (
//         id: string,
//         name: string,
//         desc: string,
//         date: string
//     ) => {
//         return (
//             <>
//                 <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//                     <DialogTrigger asChild>
//                         <Button
//                             variant={'ghost'}
//                             className="w-full p-2 flex justify-start"
//                             onClick={(e) => {
//                                 getTaskDetails(id, name, desc, date);
//                                 setDialogOpen(true); // Open the dialog
//                                 e.stopPropagation(); // Stop event propagation
//                             }}
//                         >
//                             <Pencil className="h-4 w-4 mr-2" />
//                             Edit
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent
//                         className="sm:max-w-[425px]"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <DialogHeader>
//                             <DialogTitle>Edit task</DialogTitle>
//                         </DialogHeader>
//                         <form
//                             className="grid gap-4 py-3"
//                             onSubmit={(e) => {
//                                 e.preventDefault();
//                                 editDocument(id, name, desc, date);
//                                 setDialogOpen(false);
//                             }}
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="task" className="text-right">
//                                     Task name
//                                 </Label>
//                                 <Input
//                                     id="task"
//                                     name="taskName"
//                                     placeholder={name}
//                                     className="col-span-3"
//                                     onChange={(e) => {
//                                         setTask({
//                                             ...task,
//                                             taskName: e.target.value,
//                                         });
//                                     }}
//                                     required={true}
//                                     value={task.taskName}
//                                 />

//                                 <Label
//                                     htmlFor="description"
//                                     className="text-right"
//                                 >
//                                     Description
//                                 </Label>
//                                 <Textarea
//                                     id="description"
//                                     name="description"
//                                     placeholder={desc}
//                                     className="col-span-3"
//                                     maxLength={100}
//                                     onChange={(e) =>
//                                         setTask({
//                                             ...task,
//                                             description: e.target.value,
//                                         })
//                                     }
//                                     value={task.description}
//                                     required={true}
//                                 />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="task" className="text-right">
//                                     Date
//                                 </Label>
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <Button
//                                             variant={'outline'}
//                                             className={cn(
//                                                 'w-[280px] justify-start text-left font-normal',
//                                                 !date && 'text-muted-foreground'
//                                             )}
//                                         >
//                                             <CalendarIcon className="mr-2 h-4 w-4" />
//                                             {task.date ? (
//                                                 task.date?.toLocaleString()
//                                             ) : (
//                                                 <span>Pick a date</span>
//                                             )}
//                                         </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0">
//                                         <Calendar
//                                             mode="single"
//                                             selected={task.date}
//                                             onSelect={(selectedDate) => {
//                                                 setTask({
//                                                     ...task,
//                                                     date: selectedDate,
//                                                 });
//                                             }}
//                                             required={true}
//                                             initialFocus
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                             </div>
//                             <DialogFooter>
//                                 <Button type="submit">Edit</Button>
//                             </DialogFooter>
//                         </form>
//                     </DialogContent>
//                 </Dialog>
//             </>
//         );
//     };

//     return (
//         <>
//             <div className="bg-white w-full transition-all duration-500">
//                 <div className="row flex h-[90vh]">
//                     <ResizablePanelGroup
//                         direction="horizontal"
//                         className="border"
//                     >
//                         <ResizablePanel
//                             className="flex flex-col align-center p-3"
//                             defaultSize={15}
//                             minSize={15}
//                             maxSize={50}
//                         >
//                             <CreateTasks />

//                             <ul>
//                                 <Reorder.Group
//                                     values={tasks}
//                                     onReorder={setTasks}
//                                 >
//                                     {tasks
//                                         .filter((task) => !task.date) // Filter tasks with null or empty date
//                                         .map(
//                                             (task) => (
//                                                 console.log(task),
//                                                 (
//                                                     <motion.div
//                                                         key={task.id}
//                                                         draggable="true"
//                                                         className=""
//                                                     >
//                                                         <li
//                                                             key={task.id}
//                                                             className="flex flex-col border border-slate-300 p-3 my-3  min-w-32 rounded-lg max-w-content cursor-grab active:animate-pulse active:cursor-grabbing"
//                                                         >
//                                                             <div className="flex place-content-between">
//                                                                 <h2 className="text-lg font-bold">
//                                                                     {
//                                                                         task.taskName
//                                                                     }
//                                                                 </h2>
//                                                                 <DropdownMenu>
//                                                                     <DropdownMenuTrigger>
//                                                                         <svg
//                                                                             xmlns="http://www.w3.org/2000/svg"
//                                                                             width="24"
//                                                                             height="24"
//                                                                             viewBox="0 0 24 24"
//                                                                             fill="none"
//                                                                             stroke="currentColor"
//                                                                             strokeWidth="2"
//                                                                             strokeLinecap="round"
//                                                                             strokeLinejoin="round"
//                                                                             className="lucide lucide-ellipsis text-slate-400"
//                                                                         >
//                                                                             <circle
//                                                                                 cx="12"
//                                                                                 cy="12"
//                                                                                 r="1"
//                                                                             />
//                                                                             <circle
//                                                                                 cx="19"
//                                                                                 cy="12"
//                                                                                 r="1"
//                                                                             />
//                                                                             <circle
//                                                                                 cx="5"
//                                                                                 cy="12"
//                                                                                 r="1"
//                                                                             />
//                                                                         </svg>
//                                                                     </DropdownMenuTrigger>
//                                                                     <DropdownMenuContent className="flex flex-col items-start min-w-[3rem] w-full">
//                                                                         {editButton(
//                                                                             task.id,
//                                                                             task.taskName,
//                                                                             task.description,
//                                                                             task.date
//                                                                         )}

//                                                                         <Button
//                                                                             variant={
//                                                                                 'ghost'
//                                                                             }
//                                                                             className="w-full p-2 flex justify-start"
//                                                                             onClick={() =>
//                                                                                 deleteDocument(
//                                                                                     task.id
//                                                                                 )
//                                                                             }
//                                                                         >
//                                                                             <Trash2 className="w-4 h-4 mr-2" />
//                                                                             Delete
//                                                                         </Button>
//                                                                     </DropdownMenuContent>
//                                                                 </DropdownMenu>
//                                                             </div>
//                                                             <p>
//                                                                 {
//                                                                     task.description
//                                                                 }
//                                                             </p>
//                                                             <div className="inline-flex items-center border border-white p-1 rounded-lg max-w-44 bg-slate-100">
//                                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                                 {task.date || (
//                                                                     <>
//                                                                         <p className="text-slate-400">
//                                                                             No
//                                                                             date
//                                                                         </p>
//                                                                     </>
//                                                                 )}
//                                                             </div>
//                                                             {/* <p>{task.email}</p>
//                                             <p>{task.id}</p> */}
//                                                         </li>
//                                                     </motion.div>
//                                                 )
//                                             )
//                                         )}
//                                 </Reorder.Group>
//                             </ul>
//                         </ResizablePanel>
//                         <ResizableHandle className="h-screen" />

//                         <ResizablePanel className="p-4 flex flex-col">
//                             <div className="dates flex flex-nowrap overflow-x-auto h-full">
//                                 {dateRange.map((date) => {
//                                     const currentDate = new Date();
//                                     const isToday =
//                                         date.getDate() ===
//                                             currentDate.getDate() &&
//                                         date.getMonth() ===
//                                             currentDate.getMonth() &&
//                                         date.getFullYear() ===
//                                             currentDate.getFullYear();

//                                     // Filter tasks for the current date
//                                     const tasksForDate = tasks.filter(
//                                         (task) => {
//                                             const taskDate = new Date(
//                                                 task.date
//                                             );
//                                             return (
//                                                 taskDate.getDate() ===
//                                                     date.getDate() &&
//                                                 taskDate.getMonth() ===
//                                                     date.getMonth() &&
//                                                 taskDate.getFullYear() ===
//                                                     date.getFullYear()
//                                             );
//                                         }
//                                     );

//                                     return (
//                                         <div
//                                             key={date.toISOString()}
//                                             className={`flex flex-col items-center`}
//                                             onDragEnter={(e) => {
//                                                 e.preventDefault();
//                                                 console.log(date);
//                                             }}
//                                         >
//                                             <div className="date bg-slate-200 date-item flex-shrink-0 h-16 p-4 m-2 flex items-center justify-center  rounded-md">
//                                                 <h1 className="font-medium mx-2">
//                                                     {new Date(
//                                                         date
//                                                     ).toLocaleDateString(
//                                                         'en-US',
//                                                         {
//                                                             weekday: 'short',
//                                                         }
//                                                     )}
//                                                 </h1>

//                                                 <h1 className="text-slate-500 font-medium">
//                                                     {new Date(
//                                                         date
//                                                     ).toLocaleDateString(
//                                                         'en-US',
//                                                         {
//                                                             month: 'short',
//                                                         }
//                                                     )}
//                                                     <span className="mx-2">
//                                                         {new Date(
//                                                             date
//                                                         ).toLocaleDateString(
//                                                             'en-US',
//                                                             {
//                                                                 day: 'numeric',
//                                                             }
//                                                         )}
//                                                     </span>
//                                                 </h1>
//                                                 {isToday && (
//                                                     <span className="ml-2 text-xs text-blue-600">
//                                                         Today
//                                                     </span>
//                                                 )}
//                                             </div>

//                                             {/* Render tasks for this date */}
//                                             {tasksForDate.map((task) => {
//                                                 return (
//                                                     <motion.div key={task.id}>
//                                                         <li
//                                                             draggable="true"
//                                                             key={task.id}
//                                                             className="flex flex-col border border-slate-300 p-3 my-3  min-w-32 rounded-lg max-w-content cursor-grab active:animate-pulse active:cursor-grabbing"
//                                                         >
//                                                             <div className="flex place-content-between">
//                                                                 <h2 className="text-base font-bold">
//                                                                     {
//                                                                         task.taskName
//                                                                     }
//                                                                 </h2>
//                                                                 <DropdownMenu>
//                                                                     <DropdownMenuTrigger>
//                                                                         <svg
//                                                                             xmlns="http://www.w3.org/2000/svg"
//                                                                             width="24"
//                                                                             height="24"
//                                                                             viewBox="0 0 24 24"
//                                                                             fill="none"
//                                                                             stroke="currentColor"
//                                                                             strokeWidth="2"
//                                                                             strokeLinecap="round"
//                                                                             strokeLinejoin="round"
//                                                                             className="lucide lucide-ellipsis text-slate-400"
//                                                                         >
//                                                                             <circle
//                                                                                 cx="12"
//                                                                                 cy="12"
//                                                                                 r="1"
//                                                                             />
//                                                                             <circle
//                                                                                 cx="19"
//                                                                                 cy="12"
//                                                                                 r="1"
//                                                                             />
//                                                                             <circle
//                                                                                 cx="5"
//                                                                                 cy="12"
//                                                                                 r="1"
//                                                                             />
//                                                                         </svg>
//                                                                     </DropdownMenuTrigger>
//                                                                     <DropdownMenuContent className="flex flex-col items-start min-w-[3rem] w-full">
//                                                                         {editButton(
//                                                                             task.id,
//                                                                             task.taskName,
//                                                                             task.description,
//                                                                             task.date
//                                                                         )}

//                                                                         <Button
//                                                                             variant={
//                                                                                 'ghost'
//                                                                             }
//                                                                             className="w-full p-2 flex justify-start"
//                                                                             onClick={() =>
//                                                                                 deleteDocument(
//                                                                                     task.id
//                                                                                 )
//                                                                             }
//                                                                         >
//                                                                             <Trash2 className="w-4 h-4 mr-2" />
//                                                                             Delete
//                                                                         </Button>
//                                                                     </DropdownMenuContent>
//                                                                 </DropdownMenu>
//                                                             </div>
//                                                             <p className="text-sm">
//                                                                 {
//                                                                     task.description
//                                                                 }
//                                                             </p>
//                                                             <div className="inline-flex items-center border border-white p-1 rounded-lg max-w-44 bg-slate-100">
//                                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                                 {(
//                                                                     <>
//                                                                         <p className="text-slate-400 text-sm">
//                                                                             {' '}
//                                                                             {
//                                                                                 task.date
//                                                                             }{' '}
//                                                                         </p>
//                                                                     </>
//                                                                 ) || (
//                                                                     <>
//                                                                         <p className="text-slate-400 text-sm">
//                                                                             No
//                                                                             date
//                                                                         </p>
//                                                                     </>
//                                                                 )}
//                                                             </div>
//                                                             {/* <p>{task.email}</p>
//                                             <p>{task.id}</p> */}
//                                                         </li>
//                                                     </motion.div>
//                                                 );
//                                             })}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </ResizablePanel>
//                     </ResizablePanelGroup>
//                 </div>
//             </div>
//         </>
//     );
// }

// App.requireAuth = true;
