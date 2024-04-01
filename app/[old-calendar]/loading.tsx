import { Loader2 } from 'lucide-react';
import React from 'react';

const loading = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-slate-200">
            <Loader2 className="animate-spin text-blue-400 h-20 w-20" />
            <h1 className="text-3xl font-bold text-blue-400">Loading...</h1>
        </div>
    );
};

export default loading;
