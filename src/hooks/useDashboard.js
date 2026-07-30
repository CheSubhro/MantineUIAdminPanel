
import { useState, useEffect } from 'react';

export const useDashboard = () => {
    const [metrics, setMetrics] = useState({
        totalViews: 45230,
        uniqueVisitors: 12450,
        totalPosts: 24,
        totalUsers: 142
    });

    const [trafficSources, setTrafficSources] = useState([
        { source: 'Search', percentage: 50 },
        { source: 'Direct', percentage: 30 },
        { source: 'Social', percentage: 20 }
    ]);

    const [recentPosts, setRecentPosts] = useState([
        { id: 1, title: 'Mastering React and Vite', author: 'Subhro Mondal', date: '2026-07-28' },
        { id: 2, title: 'Building Scalable UI Components', author: 'Admin User', date: '2026-07-26' },
        { id: 3, title: 'Understanding Form Validation in React', author: 'Subhro Mondal', date: '2026-07-25' }
    ]);

    const [recentUsers, setRecentUsers] = useState([
        { id: 1, name: 'Alex Johnson', email: 'alex@example.com' },
        { id: 2, name: 'Sarah Smith', email: 'sarah@example.com' },
        { id: 3, name: 'Michael Brown', email: 'michael@example.com' }
    ]);

    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
    }, []);

    return {
        metrics,
        trafficSources,
        recentPosts,
        recentUsers,
        loading
    };
};