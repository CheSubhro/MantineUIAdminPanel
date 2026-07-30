
import React from 'react';
import { Card, Badge } from '../../../components/common';
import { Title, Text, Group, Stack } from '@mantine/core';

export default function RecentPostsCard({ posts = [] }) {
    return (
        <Card className="p-5 lg:col-span-2 shadow-sm">
            <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Recent Posts
            </Title>

            <Stack className="divide-y divide-gray-200 dark:divide-gray-700" gap={0}>
                {posts?.length > 0 ? (
                    posts.map((post) => (
                        <Group key={post.id} justify="space-between" align="center" className="py-3">
                            <Stack gap={2}>
                                <Text size="sm" fw={500} className="text-gray-900 dark:text-gray-100">
                                    {post.title}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    By {post.author} • {post.date}
                                </Text>
                            </Stack>
                            <Badge color="blue">Published</Badge>
                        </Group>
                    ))
                ) : (
                    <Text size="sm" c="dimmed" className="py-4 text-center">
                        No recent posts found.
                    </Text>
                )}
            </Stack>
        </Card>
    );
}