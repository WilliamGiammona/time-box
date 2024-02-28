'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import * as React from 'react';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import CreateTasks from '@/components/Tasks/CreateTasks';

//State management for tasks

export default function App() {
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/');
        },
    });

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
                            <CreateTasks />
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
