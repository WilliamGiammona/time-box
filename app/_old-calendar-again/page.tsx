// 'use client';
// import React, {
//     Dispatch,
//     SetStateAction,
//     useState,
//     DragEvent,
//     FormEvent,
//     useRef,
//     useEffect,
//     useMemo,
// } from 'react';
// import { FiPlus, FiTrash, FiEdit2 } from 'react-icons/fi';
// import { motion } from 'framer-motion';
// import { FaFire, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
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

// import {
//     Dialog,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from '@/components/ui/dialog';

// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';

// const options: Intl.DateTimeFormatOptions = {
//     weekday: 'short',
//     month: 'short',
//     day: 'numeric',
// };

// export const Calendar = () => {
//     const [calendarView, setCalendarView] = useState('week');
//     const [today, setToday] = useState(new Date());
//     const [dates, setDates] = useState<{ date: string; isToday: boolean }[]>(
//         []
//     );
//     const [isToday, setIsToday] = useState(true);

//     const incrementDate = (daysToAdd: number) => {
//         setToday((prevDate) => {
//             const newDate = new Date(prevDate);
//             newDate.setDate(newDate.getDate() + daysToAdd);
//             return newDate;
//         });
//     };

//     const incrementMonth = (monthsToAdd: number) => {
//         setToday((prevDate) => {
//             const newDate = new Date(prevDate);
//             newDate.setMonth(newDate.getMonth() + monthsToAdd);
//             return newDate;
//         });
//     };

//     const calculateDates = (today: Date, calendarView: string) => {
//         const dates = [];
//         const currentYear = today.getFullYear();
//         const currentMonth = today.getMonth();
//         // const options = {
//         //     weekday: 'short',
//         //     month: 'short',
//         //     day: 'numeric',
//         // };

//         if (calendarView === 'day') {
//             const date = new Date(today);
//             const formattedDate = date.toLocaleDateString('en-US', options);
//             const isToday = date.toDateString() === new Date().toDateString(); // Check if date matches current date
//             dates.push({ date: formattedDate, isToday });
//         }

//         if (calendarView === 'week') {
//             for (let i = -6; i <= 0; i++) {
//                 const date = new Date(today);
//                 date.setDate(today.getDate() + i);
//                 const formattedDate = date.toLocaleDateString('en-US', options);
//                 const isToday =
//                     date.toDateString() === new Date().toDateString(); // Check if date matches current date
//                 dates.push({ date: formattedDate, isToday });
//             }
//         }

//         if (calendarView === 'month') {
//             const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
//             const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

//             for (
//                 let date = firstDayOfMonth;
//                 date <= lastDayOfMonth;
//                 date.setDate(date.getDate() + 1)
//             ) {
//                 const formattedDate = date.toLocaleDateString('en-US', options);
//                 const isToday =
//                     date.toDateString() === new Date().toDateString(); // Check if date matches current date
//                 dates.push({ date: formattedDate, isToday });
//             }
//         }

//         return dates;
//     };

//     useMemo(() => {
//         const newDates = calculateDates(today, calendarView);
//         setDates(newDates);

//         setIsToday(newDates.some((dateObj) => dateObj.isToday));
//     }, [today, calendarView]);

//     console.log(dates);
//     return (
//         <>
//             <div className="h-[91vh] w-full bg-neutral-100 dark:bg-neutral-900 text-neutral-50">
//                 <Board
//                     dates={dates}
//                     calendarView={calendarView}
//                     setCalendarView={setCalendarView}
//                     incrementDate={incrementDate}
//                     incrementMonth={incrementMonth}
//                     isToday={isToday}
//                 />
//             </div>
//         </>
//     );
// };

// interface BoardProps {
//     dates: { date: string; isToday: boolean }[];
//     calendarView: string;
//     setCalendarView: React.Dispatch<React.SetStateAction<string>>;
//     incrementDate: (daysToAdd: number) => void;
//     incrementMonth: (monthsToAdd: number) => void;
//     isToday: boolean;
// }

// async function AddCardsToFirebase(newCard: CardType) {
//     const tasksCollection = collection(db, 'tasks');
//     await addDoc(tasksCollection, newCard);
// }

// const Board = ({
//     dates,
//     calendarView,
//     setCalendarView,
//     incrementDate,
//     incrementMonth,
// }: BoardProps) => {
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
//                         hour: data.hour,
//                     };
//                 })
//             );
//         });

//         return unsubscribe;
//     }, [session]);
//     const boardRef = useRef<HTMLDivElement>(null);

//     // useEffect(() => {
//     //     // Find the index of today's column
//     //     const todayIndex = dates.findIndex((dateObj) => dateObj.isToday);
//     //     if (todayIndex !== -1 && boardRef.current) {
//     //         // Calculate the scroll position based on the width of each column
//     //         const columnWidth = boardRef.current.children[0].clientWidth + 3; // Adding 3 for the gap
//     //         const scrollLeft = todayIndex * columnWidth;
//     //         // Set the scroll position
//     //         boardRef.current.scrollLeft = scrollLeft;
//     //     }
//     // }, [dates]);

//     const DayView = () => {
//         return (
//             <>
//                 <div className="date__changer flex gap-x-4">
//                     <button
//                         onClick={() => incrementDate(-1)}
//                         className="bg-neutral-800 text-neutral-50 text-xl p-2 rounded-full"
//                     >
//                         <FaAngleLeft />
//                     </button>
//                     <button
//                         onClick={() => incrementDate(1)}
//                         className="bg-neutral-800 text-neutral-50 text-xl p-2 rounded-full"
//                     >
//                         <FaAngleRight />
//                     </button>
//                 </div>
//                 <div className="flex overflow-scroll h-full w-full">
//                     <div className="sticky left-0 mr-18">
//                         {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
//                             <div className="relative h-28" key={hour}>
//                                 <div className="absolute inset-0 flex items-center w-full">
//                                     <div
//                                         className={`z-10 bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-500 w-full`}
//                                     >
//                                         {hour}:00
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     {dates
//                         .filter((dateObj) => dateObj.date !== 'braindump')
//                         .map((dateObj) => (
//                             <HourColumn
//                                 key={dateObj.date}
//                                 title={dateObj.date}
//                                 column={dateObj.date}
//                                 headingColor="text-neutral-500"
//                                 cards={cards}
//                                 setCards={setCards}
//                                 isToday={dateObj.isToday}
//                                 boardRef={boardRef}
//                             />
//                         ))}
//                 </div>
//             </>
//         );
//     };

//     const WeekView = () => {
//         const boardRef = useRef<HTMLDivElement>(null);

//         return (
//             <div className="flex flex-col overflow-scroll h-full">
//                 <div className="date__changer flex gap-x-4">
//                     <button
//                         onClick={() => incrementDate(-7)}
//                         className="bg-neutral-200  text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 text-xl p-2 rounded-full"
//                     >
//                         <FaAngleLeft />
//                     </button>
//                     <button
//                         onClick={() => incrementDate(7)}
//                         className="bg-neutral-200  text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 text-xl p-2 rounded-full"
//                     >
//                         <FaAngleRight />
//                     </button>
//                 </div>
//                 <div className="flex overflow-scroll h-full" ref={boardRef}>
//                     <>
//                         {/* <div className="relative">
//                     {hoursArray.map((hour) => (
//                         <React.Fragment key={hour}>
//                             <div className="my-20">{hour}:00</div>
//                             <hr className="absolute w-[250vw] z-[1]"></hr>
//                         </React.Fragment>
//                     ))}
//                 </div> */}
//                         <div className="sticky left-0 ">
//                             {Array.from({ length: 24 }, (_, i) => i).map(
//                                 (hour) => (
//                                     <div className="relative h-28" key={hour}>
//                                         <div className="absolute inset-0 flex items-center border-b border-neutral-300 dark:border-neutral-700">
//                                             <div
//                                                 className={`z-10 bg-neutral-100 dark:bg-neutral-800 px-2 text-sm font-medium text-neutral-500`}
//                                             >
//                                                 {hour}:00
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )
//                             )}
//                         </div>
//                         {dates
//                             .filter((dateObj) => dateObj.date !== 'braindump')
//                             .map((dateObj) => (
//                                 <HourColumn
//                                     key={dateObj.date}
//                                     title={dateObj.date}
//                                     column={dateObj.date}
//                                     headingColor="text-neutral-500"
//                                     cards={cards}
//                                     setCards={setCards}
//                                     isToday={dateObj.isToday}
//                                     boardRef={boardRef}
//                                 />
//                             ))}
//                     </>
//                 </div>
//             </div>
//         );
//     };

//     const MonthView = () => {
//         return (
//             <>
//                 <div className="date__changer flex gap-x-4">
//                     <button
//                         onClick={() => incrementMonth(-1)}
//                         className="bg-neutral-800 text-neutral-50 text-xl p-2 rounded-full"
//                     >
//                         <FaAngleLeft />
//                     </button>
//                     <button
//                         onClick={() => incrementMonth(1)}
//                         className="bg-neutral-800 text-neutral-50 text-xl p-2 rounded-full"
//                     >
//                         <FaAngleRight />
//                     </button>
//                 </div>
//                 <div className="flex flex-wrap justify-center overflow-scroll h-full">
//                     {dates.map((dateObj) => (
//                         <Column
//                             key={dateObj.date}
//                             title={dateObj.date}
//                             column={dateObj.date}
//                             headingColor="text-neutral-500"
//                             cards={cards}
//                             setCards={setCards}
//                             isToday={dateObj.isToday}
//                             calendarView={calendarView}
//                         />
//                     ))}
//                 </div>
//             </>
//         );
//     };

//     const HourSection = ({
//         hour,
//         cards,
//         handleDragOver,
//         handleDragEnd,
//         handleDragStart,
//         activeHour,
//         indicators,
//     }) => {
//         const filteredCards = cards.filter((c) => c.hour === hour);

//         return (
//             <div
//                 onDragOver={handleDragOver}
//                 onDrop={(e) => handleDragEnd(e)}
//                 className={`hour-section relative h-28  ${
//                     activeHour == hour &&
//                     `bg-violet-400/20 border border-violet-400 rounded-lg`
//                 }`}
//             >
//                 <div className="absolute inset-0 flex items-center border-b border-neutral-300 dark:border-neutral-700">
//                     <div
//                         className={`z-10 bg-neutral-100 dark:bg-neutral-800 px-2 text-sm font-medium text-neutral-500`}
//                     ></div>
//                 </div>
//                 <div className="">
//                     {filteredCards.map((card) => (
//                         <Card
//                             key={card.id}
//                             handleDragStart={handleDragStart}
//                             {...card}
//                             indicators={indicators}
//                         />
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     type HourColumnProps = {
//         title: string;
//         column: ColumnType;
//         headingColor: string;
//         cards: CardType[];
//         setCards: Dispatch<SetStateAction<CardType[]>>;
//         isToday: boolean;
//         boardRef: React.RefObject<HTMLDivElement>;
//     };

//     const HourColumn = ({
//         title,
//         column,
//         headingColor,
//         cards,
//         setCards,
//         isToday,
//         boardRef,
//     }: HourColumnProps) => {
//         const [activeHour, setActiveHour] = useState<number | null>(null);
//         const [indicators, showIndicators] = useState(false);
//         const [storeScrollLeft, setScrollLeft] = useState<number>(0);
//         const [storeScrollTop, setScrollTop] = useState<number>(0);

//         const handleDragStart = (e: DragEvent, card: CardType) => {
//             e.dataTransfer.setData('cardId', card.id);

//             e.dataTransfer.setData('docId', card.docId);
//             showIndicators(true);
//         };

//         const handleDragOver = (e: DragEvent, hour: number) => {
//             e.preventDefault();
//             setActiveHour(hour);
//         };

//         const handleDragEnd = async (e: DragEvent, targetHour: number) => {
//             e.preventDefault();
//             e.stopPropagation();
//             const boardEl = boardRef.current;
//             if (!boardEl) return;
//             setScrollLeft(boardEl.scrollLeft);
//             setScrollTop(boardEl.scrollTop);

//             const cardId = e.dataTransfer.getData('cardId');
//             const docId = e.dataTransfer.getData('docId');
//             setActiveHour(null);
//             showIndicators(false);

//             const card = cards.find((c) => c.id === cardId);
//             if (!card) return;

//             const updatedCards = cards.map((c) => {
//                 if (c.id === cardId) {
//                     return { ...c, column, hour: targetHour };
//                 }
//                 return c;
//             });

//             setCards(updatedCards);

//             // Update card in Firebase Firestore
//             const docRef = doc(db, 'tasks', docId);
//             await updateDoc(docRef, { column, hour: targetHour });
//             boardEl.scrollLeft = storeScrollLeft;
//             console.log(storeScrollLeft);
//             boardEl.scrollTop = storeScrollTop;
//             console.log(storeScrollTop);
//         };

//         return (
//             <div
//                 className={`${calendarView === 'week' || calendarView === 'month' ? `w-56` : `w-[68vw]`} shrink-0 m-4 relative h-full`}
//             >
//                 <div
//                     className={`mb-3 flex items-center justify-between sticky top-0`}
//                 >
//                     <h3 className={`font-medium ${headingColor} `}>
//                         {title}{' '}
//                         {isToday ? (
//                             <span className="text-blue-500">Today</span>
//                         ) : null}
//                     </h3>
//                     <span className="self-end rounded text-sm text-neutral-400">
//                         {cards.filter((c) => c.column === column).length}
//                     </span>
//                 </div>
//                 {cards
//                     .filter((c) => c.column === column)
//                     .map((card) => (
//                         <div key={card.id} className="">
//                             <Card {...card} handleDragStart={handleDragStart} />
//                         </div>
//                     ))}
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
//                         <SelectTrigger className="w-[180px] text-neutral-800 dark:text-neutral-50">
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
//                     <Button className="ml-4 max-w-32 hover:cursor-not-allowed">
//                         Read Calendar
//                     </Button>
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

//                     <div className="w-full py-8 tasks">
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
//     calendarView: string;
//     boardRef: React.RefObject<HTMLDivElement>;
// };

// const Column = ({
//     title,
//     column,
//     headingColor,
//     cards,
//     setCards,
//     isToday,
//     calendarView,
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
//             // Save the current scroll position
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
//         <div
//             className={`${calendarView === 'month' && 'border rounded-lg p-2'} w-full shrink-0 p-2`}
//         >
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
//                         <>
//                             <Card
//                                 key={c.id}
//                                 {...c}
//                                 handleDragStart={handleDragStart}
//                             />
//                         </>
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
//     hour,
// }: CardProps) => {
//     const [dialogOpen, setDialogOpen] = useState(false);

//     const editCard = async (e: FormEvent<HTMLFormElement>, docId: string) => {
//         e.preventDefault();
//         console.log(e);
//         console.log(docId);

//         await updateDoc(doc(db, 'tasks', docId), {
//             taskName: newTaskName,
//             description: newTaskDescription,
//         });
//         setNewTaskName('');
//         setNewTaskDescription('');
//     };

//     const [newTaskName, setNewTaskName] = useState('');
//     const [newTaskDescription, setNewTaskDescription] = useState('');
//     return (
//         <>
//             <>
//                 <DropIndicator beforeId={id} column={column} />
//             </>

//             <motion.form
//                 layout
//                 layoutId={id}
//                 draggable="true"
//                 onDragStart={(e) =>
//                     handleDragStart(e, { taskName, id, column, docId })
//                 }
//                 className={`group max-w-[500px] flex justify-between absolute translate-y-[${hour * 10}rem] z-[10] cursor-grab rounded border dark:border-neutral-700 dark:bg-neutral-800  p-3 active:cursor-grabbing`}
//             >
//                 <div className="flex flex-col">
//                     <p className="text-sm dark:text-neutral-100 text-neutral-800">
//                         {taskName}
//                     </p>
//                     <p className="text-xs dark:text-neutral-100 text-neutral-800">
//                         {description}
//                     </p>
//                     <p>{hour}</p>
//                 </div>
//                 <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//                     <DialogTrigger asChild>
//                         <FiEdit2 className="invert dark:invert-0 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:cursor-pointer" />
//                     </DialogTrigger>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>Edit Task</DialogTitle>

//                             <label htmlFor="taskName">Name</label>
//                             <Input
//                                 placeholder={taskName}
//                                 id="taskName"
//                                 onChange={(e) => setNewTaskName(e.target.value)}
//                                 className="placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
//                             />
//                             <label htmlFor="taskDescription">Description</label>
//                             <Textarea
//                                 placeholder={description}
//                                 onChange={(e) =>
//                                     setNewTaskDescription(e.target.value)
//                                 }
//                                 id="taskDescription"
//                                 className="placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
//                             />
//                         </DialogHeader>
//                         <DialogFooter>
//                             <Button
//                                 type="submit"
//                                 onClick={(e) => {
//                                     editCard(e, docId);
//                                     setDialogOpen(false);
//                                 }}
//                             >
//                                 Confirm Edit
//                             </Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             </motion.form>
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
//             className="my-0.5 h-0.5 w-full"
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
//             hour: '',
//         };

//         AddCardsToFirebase(newCard);
//         setText('');
//         setDescription('');

//         setAdding(false);
//     };

//     return (
//         <>
//             {adding ? (
//                 <motion.form layout onSubmit={handleSubmit} className="z-10">
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
//                     className="z-10 flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors dark:hover:text-neutral-50 hover:text-neutral-300"
//                 >
//                     <span className="z-10">Add task</span>
//                     <FiPlus className="z-10" />
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
//     hour: number;
// };

// export default Calendar;
