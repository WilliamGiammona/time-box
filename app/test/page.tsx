// 'use client';
// import React, {
//     Dispatch,
//     SetStateAction,
//     useState,
//     DragEvent,
//     FormEvent,
//     useRef,
//     useEffect,
// } from 'react';
// import { FiPlus, FiTrash } from 'react-icons/fi';
// import { motion } from 'framer-motion';
// import { FaFire } from 'react-icons/fa';
// import {
//     addDoc,
//     collection,
//     deleteDoc,
//     doc,
//     onSnapshot,
//     query,
//     updateDoc,
//     where,
// } from 'firebase/firestore';
// import { db } from '../firebase';
// import {
//     ResizableHandle,
//     ResizablePanel,
//     ResizablePanelGroup,
// } from '@/components/ui/resizable';
// import { useSession } from 'next-auth/react';
// import { Button } from '@/components/ui/button';

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';

// const options: Intl.DateTimeFormatOptions = {
//     weekday: 'short',
//     month: 'short',
//     day: 'numeric',
// };

// export const Calendar = () => {
//     const [calendarView, setCalendarView] = useState('week');

//     const today = new Date();

//     const dates: { date: string; isToday: boolean }[] = [];

//     if (calendarView === 'day') {
//         const date = new Date(today);

//         date.setDate(today.getDate());
//         const formattedDate = date.toLocaleDateString('en-US', options);

//         const isToday = date.toDateString() === today.toDateString(); // Check if date is today

//         dates.push({ date: formattedDate, isToday });
//     }

//     if (calendarView === 'month') {
//         for (let i = -15; i <= 15; i++) {
//             const date = new Date(today);

//             date.setDate(today.getDate() + i);
//             const formattedDate = date.toLocaleDateString('en-US', options);

//             const isToday = date.toDateString() === today.toDateString(); // Check if date is today

//             dates.push({ date: formattedDate, isToday });
//         }
//     }

//     if (calendarView === 'week') {
//         for (let i = -7; i <= 7; i++) {
//             const date = new Date(today);

//             date.setDate(today.getDate() + i);
//             const formattedDate = date.toLocaleDateString('en-US', options);

//             const isToday = date.toDateString() === today.toDateString(); // Check if date is today

//             dates.push({ date: formattedDate, isToday });
//         }
//     }

//     console.log(dates);
//     return (
//         <>
//             <div className="h-[91vh] w-full bg-neutral-100 dark:bg-neutral-900 text-neutral-50">
//                 <Board
//                     dates={dates}
//                     calendarView={calendarView}
//                     setCalendarView={setCalendarView}
//                 />
//             </div>
//         </>
//     );
// };

// interface BoardProps {
//     dates: { date: string; isToday: boolean }[];
//     calendarView: string;
//     setCalendarView: React.Dispatch<React.SetStateAction<string>>;
// }

// async function AddCardsToFirebase(newCard: CardType) {
//     const tasksCollection = collection(db, 'tasks');
//     await addDoc(tasksCollection, newCard);
// }

// const Board = ({ dates, calendarView, setCalendarView }: BoardProps) => {
//     const session = useSession();
//     const [cards, setCards] = useState<CardType[]>([]);

//     useEffect(() => {
//         console.log(calendarView);
//     }, [calendarView]);

//     useEffect(() => {
//         console.log(cards);
//     }, [cards]);

//     useEffect(() => {
//         const userEmail = session?.data?.user?.email;
//         if (!userEmail) {
//             console.error('User email is undefined in session data');
//             return;
//         }

//         const emailRef = query(
//             collection(db, 'tasks'),
//             where('email', '==', userEmail)
//         );

//         const unsubscribe = onSnapshot(emailRef, (tasks) => {
//             console.log(tasks);
//             setCards(
//                 tasks.docs.map((doc, index) => {
//                     const data = doc.data();
//                     const date = data.column;

//                     return {
//                         id: (index + 1).toString(),
//                         docId: doc.id,
//                         taskName: data.taskName,
//                         description: data.description,
//                         email: data.userEmail,
//                         column: date,
//                     };
//                 })
//             );
//         });

//         return unsubscribe;
//     }, [session]);
//     const boardRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         // Find the index of today's column
//         const todayIndex = dates.findIndex((dateObj) => dateObj.isToday);
//         if (todayIndex !== -1 && boardRef.current) {
//             // Calculate the scroll position based on the width of each column
//             const columnWidth = boardRef.current.children[0].clientWidth + 3; // Adding 3 for the gap
//             const scrollLeft = todayIndex * columnWidth;
//             // Set the scroll position
//             boardRef.current.scrollLeft = scrollLeft;
//         }
//     }, [dates]);

//     const DayView = () => {
//         return (
//             <div ref={boardRef} className="flex overflow-scroll h-full">
//                 {dates.map((dateObj) => (
//                     <Column
//                         key={dateObj.date}
//                         title={dateObj.date}
//                         column={dateObj.date}
//                         headingColor="text-neutral-500"
//                         cards={cards}
//                         setCards={setCards}
//                         isToday={dateObj.isToday}
//                     />
//                 ))}
//             </div>
//         );
//     };

//     const WeekView = () => {
//         return (
//             <div ref={boardRef} className="flex overflow-scroll h-full">
//                 {dates.map((dateObj) => (
//                     <Column
//                         key={dateObj.date}
//                         title={dateObj.date}
//                         column={dateObj.date}
//                         headingColor="text-neutral-500"
//                         cards={cards}
//                         setCards={setCards}
//                         isToday={dateObj.isToday}
//                     />
//                 ))}
//             </div>
//         );
//     };

//     const MonthView = () => {
//         return (
//             <div
//                 ref={boardRef}
//                 className="flex flex-wrap justify-center overflow-scroll h-full"
//             >
//                 {dates.map((dateObj) => (
//                     <Column
//                         key={dateObj.date}
//                         title={dateObj.date}
//                         column={dateObj.date}
//                         headingColor="text-neutral-500"
//                         cards={cards}
//                         setCards={setCards}
//                         isToday={dateObj.isToday}
//                     />
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <div className="flex flex-col h-full w-full gap-3 px-12 py-4">
//             <div className="task__actions flex space-between border-b-2 p-2">
//                 <div className="actions__left w-full"></div>
//                 <div className="actions__right w-full flex justify-end">
//                     <Select
//                         value={calendarView}
//                         onValueChange={(value) => setCalendarView(value)}
//                         defaultValue="week"
//                     >
//                         <SelectTrigger className="w-[180px]">
//                             <SelectValue placeholder="Calendar" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectLabel>Calendar View</SelectLabel>
//                                 <SelectItem
//                                     value="day"
//                                     onSelect={() => setCalendarView('day')}
//                                 >
//                                     Day
//                                 </SelectItem>
//                                 <SelectItem
//                                     value="week"
//                                     onSelect={() => setCalendarView('week')}
//                                 >
//                                     Week
//                                 </SelectItem>
//                                 <SelectItem
//                                     value="month"
//                                     onSelect={() => setCalendarView('month')}
//                                 >
//                                     Month
//                                 </SelectItem>
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                     <Button className="max-w-32">Read Calendar</Button>
//                 </div>
//             </div>
//             <ResizablePanelGroup
//                 direction="horizontal"
//                 className="flex flex-row"
//             >
//                 <ResizablePanel
//                     defaultSize={15}
//                     minSize={15}
//                     maxSize={50}
//                     className="border dark:border-neutral-800 p-2 rounded-lg flex flex-col items-center"
//                 >
//                     <h2 className="font-bold dark:text-neutral-50 text-neutral-800">
//                         Brain Dump🧠
//                     </h2>

//                     <div className="tasks">
//                         <>
//                             <Column
//                                 title={'Tasks'}
//                                 cards={cards}
//                                 column={'braindump'}
//                                 headingColor="text-purple-400"
//                                 setCards={setCards}
//                                 isToday={false}
//                             ></Column>
//                         </>
//                     </div>
//                 </ResizablePanel>
//                 <ResizableHandle className="bg-transparent rounded-lg mr-4" />
//                 <ResizablePanel>
//                     {calendarView === 'day' && <DayView />}
//                     {calendarView === 'week' && <WeekView />}
//                     {calendarView === 'month' && <MonthView />}
//                 </ResizablePanel>
//                 <section id="burn-barrel" className="">
//                     <BurnBarrel setCards={setCards} />
//                 </section>
//             </ResizablePanelGroup>
//         </div>
//     );
// };

// type ColumnProps = {
//     title: string;
//     headingColor: string;
//     cards: CardType[];
//     column: ColumnType;
//     setCards: Dispatch<SetStateAction<CardType[]>>;
// };

// const Column = ({
//     title,
//     column,
//     headingColor,
//     cards,
//     setCards,
//     isToday,
// }: ColumnProps & { isToday: boolean }) => {
//     const [active, setActive] = useState(false);

//     const handleDragStart = (e: DragEvent, card: CardType) => {
//         e.dataTransfer.setData('cardId', card.id);
//         e.dataTransfer.setData('docId', card.docId);
//     };

//     const handleDragEnd = async (e: DragEvent) => {
//         const cardId = e.dataTransfer.getData('cardId');
//         const docId = e.dataTransfer.getData('docId');
//         setActive(false);
//         clearHighlights();

//         const indicators = getIndicators();
//         const { element } = getNearestIndicator(e, indicators);

//         const before = element.dataset.before || '-1';

//         if (before !== cardId) {
//             let copy = [...cards];

//             let cardToTransfer = copy.find((c) => c.id === cardId);
//             if (!cardToTransfer) return;
//             cardToTransfer = { ...cardToTransfer, column };

//             copy = copy.filter((c) => c.id !== cardId);

//             const moveToBack = before === '-1';

//             if (moveToBack) {
//                 copy.push(cardToTransfer);
//             } else {
//                 const insertAtIndex = copy.findIndex((el) => el.id === before);
//                 if (insertAtIndex === undefined) return;

//                 copy.splice(insertAtIndex, 0, cardToTransfer);
//             }

//             setCards(copy);

//             // Update card in Firebase Firestore
//             const docRef = doc(db, 'tasks', docId);
//             await updateDoc(docRef, { column });
//         }
//     };

//     const handleDragOver = (e: DragEvent) => {
//         e.preventDefault();
//         highlightIndicator(e);

//         setActive(true);
//     };

//     const clearHighlights = (els?: HTMLElement[]) => {
//         const indicators = els || getIndicators();

//         indicators.forEach((i) => {
//             i.style.opacity = '0';
//         });
//     };

//     const highlightIndicator = (e: DragEvent) => {
//         const indicators = getIndicators();

//         clearHighlights(indicators);

//         const el = getNearestIndicator(e, indicators);

//         el.element.style.opacity = '1';
//     };

//     const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
//         const DISTANCE_OFFSET = 50;

//         const el = indicators.reduce(
//             (closest, child) => {
//                 const box = child.getBoundingClientRect();

//                 const offset = e.clientY - (box.top + DISTANCE_OFFSET);

//                 if (offset < 0 && offset > closest.offset) {
//                     return { offset: offset, element: child };
//                 } else {
//                     return closest;
//                 }
//             },
//             {
//                 offset: Number.NEGATIVE_INFINITY,
//                 element: indicators[indicators.length - 1],
//             }
//         );

//         return el;
//     };

//     const getIndicators = () => {
//         return Array.from(
//             document.querySelectorAll(
//                 `[data-column="${column}"]`
//             ) as unknown as HTMLElement[]
//         );
//     };

//     const handleDragLeave = () => {
//         clearHighlights();
//         setActive(false);
//     };

//     const filteredCards = cards.filter((c) => c.column === column);

//     return (
//         <div className={`w-56 shrink-0 m-4`}>
//             <div className={`mb-3 flex items-center justify-between`}>
//                 <h3 className={`font-medium ${headingColor} `}>
//                     {title}{' '}
//                     {isToday ? (
//                         <span className="text-blue-500">Today</span>
//                     ) : null}
//                 </h3>
//                 <span className="rounded text-sm text-neutral-400">
//                     {filteredCards.length}
//                 </span>
//             </div>
//             <div
//                 onDrop={handleDragEnd}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 className={`h-full transition-colors ${
//                     active ? 'bg-neutral-800/50' : 'bg-neutral-800/0'
//                 }`}
//             >
//                 {filteredCards.map((c) => {
//                     return (
//                         <Card
//                             key={c.id}
//                             {...c}
//                             handleDragStart={handleDragStart}
//                         />
//                     );
//                 })}
//                 <DropIndicator beforeId={null} column={column} />
//                 <AddCard column={column} setCards={setCards} cards={cards} />
//             </div>
//         </div>
//     );
// };

// type HandleDragStart = (e: DragEvent, card: CardType) => void;

// type CardProps = CardType & {
//     handleDragStart: HandleDragStart;
// };

// const Card = ({
//     id,
//     docId,
//     taskName,
//     description,
//     column,
//     handleDragStart,
// }: CardProps) => {
//     return (
//         <>
//             <DropIndicator beforeId={id} column={column} />
//             <motion.div
//                 layout
//                 layoutId={id}
//                 draggable="true"
//                 onDragStart={(e) =>
//                     handleDragStart(e, { taskName, id, column, docId })
//                 }
//                 className="cursor-grab rounded border dark:border-neutral-700 dark:bg-neutral-800  p-3 active:cursor-grabbing"
//             >
//                 <p className="text-sm dark:text-neutral-100 text-neutral-800">
//                     {taskName}
//                 </p>
//                 <p className="text-xs dark:text-neutral-100 text-neutral-800">
//                     {description}
//                 </p>
//             </motion.div>
//         </>
//     );
// };

// type DropIndicatorProps = {
//     beforeId: string | null;
//     column: string;
// };

// const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
//     return (
//         <div
//             data-before={beforeId || '-1'}
//             data-column={column}
//             className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
//         />
//     );
// };

// const BurnBarrel = ({
//     setCards,
// }: {
//     setCards: Dispatch<SetStateAction<CardType[]>>;
// }) => {
//     const [active, setActive] = useState(false);

//     const handleDragOver = (e: DragEvent) => {
//         e.preventDefault();
//         setActive(true);
//     };

//     const handleDragLeave = () => {
//         setActive(false);
//     };

//     const handleDragEnd = async (e: DragEvent) => {
//         const cardId = e.dataTransfer.getData('cardId');
//         const docId = e.dataTransfer.getData('docId');
//         const docRef = doc(db, 'tasks', docId);
//         await deleteDoc(docRef);

//         setCards((pv) => pv.filter((c) => c.id !== cardId));

//         setActive(false);
//     };

//     return (
//         <div
//             onDrop={handleDragEnd}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             className={`mt-10 grid h-32 w-32 shrink-0 place-content-center rounded border text-3xl ml-4 flex items-center ${
//                 active
//                     ? 'border-red-800 bg-red-800/20 text-red-500'
//                     : 'border-neutral-500 bg-neutral-500/20 text-neutral-500'
//             }`}
//         >
//             {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
//         </div>
//     );
// };

// type AddCardProps = {
//     column: ColumnType;
//     // setCards: Dispatch<SetStateAction<CardType[]>>;
//     cards: CardType[];
// };

// const AddCard = ({ column, cards }: AddCardProps) => {
//     const session = useSession();

//     const [text, setText] = useState('');
//     const [description, setDescription] = useState('');
//     const [adding, setAdding] = useState(false);

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (!text.trim().length) return;

//         const newCard = {
//             column,
//             taskName: text.trim(),
//             description: description.trim() || '',
//             id: (Object.keys(cards).length + 1).toString(),
//             docId: '',
//             email: session?.data?.user?.email || '',
//         };

//         AddCardsToFirebase(newCard);
//         setText('');
//         setDescription('');

//         setAdding(false);
//     };

//     return (
//         <>
//             {adding ? (
//                 <motion.form layout onSubmit={handleSubmit}>
//                     <textarea
//                         onChange={(e) => setText(e.target.value)}
//                         autoFocus
//                         placeholder="Add task title"
//                         className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm dark:text-neutral-50 text-neutral-800 placeholder-violet-300 focus:outline-0"
//                     />
//                     <textarea
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Add task description"
//                         className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm dark:text-neutral-50 text-neutral-800 placeholder-violet-300 focus:outline-0"
//                     />
//                     <div className="mt-1.5 flex items-center justify-end gap-1.5">
//                         <button
//                             onClick={() => setAdding(false)}
//                             className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-5"
//                         >
//                             Close
//                         </button>
//                         <button
//                             type="submit"
//                             className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
//                         >
//                             <span>Add</span>
//                             <FiPlus />
//                         </button>
//                     </div>
//                 </motion.form>
//             ) : (
//                 <motion.button
//                     layout
//                     onClick={() => setAdding(true)}
//                     className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors dark:hover:text-neutral-50 hover:text-neutral-300"
//                 >
//                     <span>Add task</span>
//                     <FiPlus />
//                 </motion.button>
//             )}
//         </>
//     );
// };

// type ColumnType = string;

// type CardType = {
//     taskName: string;
//     description: string;
//     docId: string;
//     id: string;
//     email: string;
//     column: ColumnType;
// };

// // const DEFAULT_CARDS: CardType[] = [
// //     // BACKLOG
// //     { title: 'Look into render bug in dashboard', id: '1', column: 'backlog' },
// //     { title: 'SOX compliance checklist', id: '2', column: 'backlog' },
// //     { title: '[SPIKE] Migrate to Azure', id: '3', column: 'backlog' },
// //     { title: 'Document Notifications service', id: '4', column: 'backlog' },
// //     // TODO
// //     {
// //         title: 'Research DB options for new microservice',
// //         id: '5',
// //         column: 'todo',
// //     },
// //     { title: 'Postmortem for outage', id: '6', column: 'todo' },
// //     { title: 'Sync with product on Q3 roadmap', id: '7', column: 'todo' },

// //     // DOING
// //     {
// //         title: 'Refactor context providers to use Zustand',
// //         id: '8',
// //         column: 'doing',
// //     },
// //     { title: 'Add logging to daily CRON', id: '9', column: 'doing' },
// //     // DONE
// //     {
// //         title: 'Set up DD dashboards for Lambda listener',
// //         id: '10',
// //         column: 'done',
// //     },
// // ];

// export default Calendar;
