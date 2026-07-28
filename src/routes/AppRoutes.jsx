
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Title, Text, Container } from '@mantine/core';

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Container py="xl">
                        <Title order={1}>Welcome to CheSubhro's App</Title>
                        <Text c="dimmed" mt="sm">Your admin panel is ready with Mantine UI!</Text>
                    </Container>
                }
            />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
    );
}