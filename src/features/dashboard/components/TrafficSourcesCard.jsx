
import React from 'react';
import { Card, Badge } from '../../../components/common';
import { Title, Text, Group, Stack } from '@mantine/core';

export default function TrafficSourcesCard({ trafficSources = [] }) {
    return (
        <Card className="p-5 shadow-sm">
            <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Traffic Sources
            </Title>

            <Stack className="divide-y divide-gray-200 dark:divide-gray-700" gap={0}>
                {trafficSources?.length > 0 ? (
                    trafficSources.map((item, index) => (
                        <Group key={index} justify="space-between" align="center" className="py-3">
                            <Text size="sm" fw={500} className="text-gray-900 dark:text-gray-100">
                                {item.source}
                            </Text>
                            <Badge color="blue" variant="light">
                                {item.percentage}%
                            </Badge>
                        </Group>
                    ))
                ) : (
                    <Text size="sm" c="dimmed" className="py-4 text-center">
                        No traffic data found.
                    </Text>
                )}
            </Stack>
        </Card>
    );
}