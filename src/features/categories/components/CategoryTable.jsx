
import React from 'react';
import {
    Table,
    Group,
    Text,
    ActionIcon,
    Avatar,
    Menu,
    rem
} from '@mantine/core';
import {
    IconEdit,
    IconTrash,
    IconDotsVertical
} from '@tabler/icons-react';
import { Badge, EmptyState } from '../../../components/common';

export default function CategoryTable({ categories, onEdit, onDelete }) {

    if (categories.length === 0) {
        return <EmptyState title="No categories found" description="Try adjusting your search or filter to find what you're looking for." />;
    }

    const rows = categories.map((category) => (
        <Table.Tr key={category.id}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar src={category.image} radius="sm" size="md" />
                    <div>
                        <Text size="sm" fw={500}>{category.name}</Text>
                        <Text size="xs" c="dimmed">/{category.slug}</Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text size="sm" lineClamp={1} c="dimmed" style={{ maxWidth: 250 }}>
                    {category.description || 'No description'}
                </Text>
            </Table.Td>
            <Table.Td>
                <Badge variant="light">
                    {category.postCount} Posts
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={category.status === 'Active' ? 'green' : 'gray'}
                    variant="dot"
                >
                    {category.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <Menu
                        transitionProps={{ transition: 'pop' }}
                        position="bottom-end"
                    >
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDotsVertical style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => onEdit(category)}
                            >
                                Edit Category
                            </Menu.Item>
                            <Menu.Item
                                color="red"
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => onDelete(category)}
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={700}>
            <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Posts</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}