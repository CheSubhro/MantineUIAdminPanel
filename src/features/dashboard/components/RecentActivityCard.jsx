
import React from 'react';
import { Card, Badge } from '../../../components/common';
import { Title, Text, Group, Stack } from '@mantine/core';

export default function RecentActivityCard({ activities = [] }) {

    const getBadgeColor = (type) => {
        switch (type) {
            case 'edit':
                return 'blue';
            case 'delete':
                return 'red';
            case 'login':
                return 'green';
            default:
                return 'gray';
        }
    };

    return (
        <Card className="p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white">
                    System Audit Logs & Activity History
                </Title>
                <Badge color="blue" variant="light">Real-time</Badge>
            </div>

            <Stack className="divide-y divide-gray-200 dark:divide-gray-700" gap={0}>
                {activities?.length > 0 ? (
                    activities.map((item) => (
                        <div key={item.id} className="py-3 flex justify-between items-center">
                            <div>
                                <Group gap="xs" align="center">
                                    <Text size="sm" fw={600} className="text-gray-900 dark:text-gray-100">
                                        {item.user}
                                    </Text>
                                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                                        {item.role}
                                    </span>
                                </Group>
                                <Text size="sm" className="text-gray-700 dark:text-gray-300 mt-1">
                                    {item.action}
                                </Text>
                                <Group gap="md" mt={2}>
                                    <Text size="xs" c="dimmed">
                                        IP: {item.ip}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {item.time}
                                    </Text>
                                </Group>
                            </div>
                            <Badge color={getBadgeColor(item.type)} variant="light" className="capitalize">
                                {item.type}
                            </Badge>
                        </div>
                    ))
                ) : (
                    <Text size="sm" c="dimmed" className="py-4 text-center">
                        No recent activity logs found.
                    </Text>
                )}
            </Stack>
        </Card>
    );
}