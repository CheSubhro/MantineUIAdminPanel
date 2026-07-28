
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Title, Text, Container } from '@mantine/core';

import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}