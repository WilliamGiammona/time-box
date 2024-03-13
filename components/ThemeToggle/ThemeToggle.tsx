'use client';

import { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';
import styles from './ThemeToggle.module.css'; // Import the CSS file

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        theme === 'dark' ? setDarkMode(true) : setDarkMode(false);
    }, []);

    useEffect(() => {
        if (darkMode === true) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <>
            <div
                className="relative w-20 h-8 flex items-center dark:bg-black-900 bg-white-300 cursor-pointer rounded-full p-1 mt-1 border"
                onClick={() => setDarkMode(!darkMode)}
            >
                <FaMoon className="text-slate-800" size={20} />
                <div
                    className="absolute bg-white z-10 dark:bg-muted w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
                    style={darkMode ? { left: '2px' } : { right: '2px' }}
                ></div>
                <BsSunFill className={`ml-auto ${styles.sun}`} size={18} />
            </div>
        </>
    );
};

export default ThemeToggle;
