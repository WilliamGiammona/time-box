import React from 'react';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
function Settings() {
    return (
        <div className="h-[90vh] dark:bg-neutral-900 bg-neutral-100">
            <div className="settings max-w-[400px] mx-auto py-10 w-full h-full">
                <h1 className="font-bold text-3xl mb-4">Settings</h1>

                <div className="setting__items flex-col">
                    <div className="item border-l pl-4">
                        <h1 className="font-bold text-xl">Apperance</h1>
                        <h2 className="text-sm mb-4 dark:text-neutral-500">
                            Light or Dark
                        </h2>
                        <ThemeToggle />
                    </div>

                    <div className="item mt-4 border-l pl-4">
                        <h1 className="font-bold text-xl">Apperance</h1>
                        <h2 className="text-sm mb-4 dark:text-neutral-500">
                            Light or Dark
                        </h2>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
