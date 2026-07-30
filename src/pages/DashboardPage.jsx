
import React from 'react';
import { Stack, Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useDashboard } from '../hooks/useDashboard';
import DashboardHeader from '../features/dashboard/components/DashboardHeader';
import DashboardMetrics from '../features/dashboard/components/DashboardMetrics';
import RecentPostsCard from '../features/dashboard/components/RecentPostsCard';
import TrafficSourcesCard from '../features/dashboard/components/TrafficSourcesCard';
import { Spinner } from '../components/common';

export default function DashboardPage() {
    
    const { metrics, trafficSources, recentPosts, loading } = useDashboard();
    const navigate = useNavigate();

    const handleNewPost = () => {
        navigate('/posts');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <Stack gap="lg" p="md">
            {/* Header */}
            <DashboardHeader
                title="Dashboard Overview"
                subtitle="Welcome back, here is what’s happening with your CMS today."
                onNewPost={handleNewPost}
            />

            {/* Metric Cards */}
            <DashboardMetrics
                metrics={metrics}
            />

            {/* Bottom Cards */}
            <Grid gutter="lg">
                <Grid.Col
                    xs={12}
                    md={6}
                >
                    <RecentPostsCard
                        posts={recentPosts}
                    />
                </Grid.Col>

                <Grid.Col
                    xs={12}
                    md={6}
                >
                    <TrafficSourcesCard
                        trafficSources={trafficSources}
                    />
                </Grid.Col>
            </Grid>
        </Stack>
    );
}