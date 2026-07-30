
import React from 'react';
import { Button, Tooltip, Badge } from '../../../components/common';

export default function DashboardHeader({ title, subtitle, onNewPost }) {
    
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
                    <Badge color="blue">Live</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
                <Tooltip label="Create a brand new blog post or article">
                    <Button color="violet" onClick={onNewPost}>
                        + New Post
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}