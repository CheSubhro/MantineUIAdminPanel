
import React from 'react';
import { Card, Badge } from '../../../components/common';
import { Title, Text, Group, Stack, Avatar } from '@mantine/core';

export default function RecentUsersCard({ users = [] }) {
    
    return (
        <Card className="p-5 shadow-sm">
            <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Recent Users
            </Title>

            <Stack className="divide-y divide-gray-200 dark:divide-gray-700" gap={0}>
                {users?.length > 0 ? (
                    users.map((user) => (
                        <Group key={user.id} justify="space-between" align="center" className="py-3">
                            <Group gap="sm">
                                <Avatar color="blue" radius="xl">{user.name.charAt(0)}</Avatar>
                                <div>
                                    <Text size="sm" fw={500} className="text-gray-900 dark:text-gray-100">
                                        {user.name}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {user.email}
                                    </Text>
                                </div>
                            </Group>
                            <Badge color="green" variant="light">New</Badge>
                        </Group>
                    ))
                ) : (
                    <Text size="sm" c="dimmed" className="py-4 text-center">
                        No recent users found.
                    </Text>
                )}
            </Stack>
        </Card>
    );
}