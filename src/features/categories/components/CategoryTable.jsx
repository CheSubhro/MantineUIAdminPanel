
import React, { useState } from 'react';
import { Table, Group, Text, ActionIcon, Avatar } from '@mantine/core';
import { IconEdit, IconTrash, IconFolder, IconSearch, IconPlus } from '@tabler/icons-react';
import {
    Button,
    Input,
    Badge,
    Card,
    EmptyState,
    ErrorBoundary,
    Pagination,
    ConfirmModal,
    Spinner,
    Tooltip
} from '../../../components/common';

function CategoryTableContent({
    categories,
    searchQuery,
    onSearchChange,
    onAddClick,
    onEditClick,
    onDeleteClick,
    loading = false
}) {
    const [deleteId, setDeleteId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5;

    const paginatedCategories = categories.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

    const handleDeleteConfirmClick = (id) => {
        setDeleteId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId) {
            onDeleteClick(deleteId);
            setIsConfirmOpen(false);
            setDeleteId(null);
        }
    };

    const getShortDescription = (text) => {
        if (!text) return 'No description';
        const words = text.split(' ');
        if (words.length <= 3) return text;
        return words.slice(0, 3).join(' ') + '...';
    };

    const rows = paginatedCategories.map((category) => (
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
                <Tooltip label={category.description || 'No description'} position="top">
                    <Text size="sm" c="dimmed">
                        {getShortDescription(category.description)}
                    </Text>
                </Tooltip>
            </Table.Td>
            <Table.Td>
                <Badge variant="light">
                    {category.postCount} Posts
                </Badge>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="dot"
                    color={category.status === 'Active' ? 'green' : 'red'}
                >
                    {category.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Group gap="xs" justify="flex-end">
                    <Tooltip label="Edit Category" position="top">
                        <ActionIcon
                            variant="subtle"
                            color="blue"
                            onClick={() => onEditClick(category)}
                        >
                            <IconEdit size={18} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Delete Category" position="top">
                        <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDeleteConfirmClick(category.id)}
                        >
                            <IconTrash size={18} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card p="md" radius="md" withBorder>
            {/* Top Bar: Search and Add Button */}
            <Group justify="space-between" mb="md" wrap="wrap">
                <Input
                    placeholder="Search by name or slug..."
                    leftSection={<IconSearch size={16} />}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    w={{ base: '100%', sm: 300 }}
                />
                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={onAddClick}
                >
                    Add Category
                </Button>
            </Group>

            {/* Content / Table Area */}
            {loading ? (
                <Group justify="center" py="xl">
                    <Spinner size="lg" />
                </Group>
            ) : categories.length > 0 ? (
                <>
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
                            <Table.Tbody>
                                {rows}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>

                    {/* Pagination Component */}
                    {categories.length > itemsPerPage && (
                        <Group justify="flex-end" mt="md">
                            <Pagination
                                total={Math.ceil(categories.length / itemsPerPage)}
                                value={activePage}
                                onChange={setActivePage}
                            />
                        </Group>
                    )}
                </>
            ) : (
                <EmptyState
                    icon={<IconFolder size={48} />}
                    title="No Categories Found"
                    description="We couldn't find any categories matching your search or criteria."
                    actionText="Add Category"
                    onAction={onAddClick}
                />
            )}

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
                confirmText="Delete"
                confirmColor="red"
            />
        </Card>
    );
}

export default function CategoryTable(props) {
    return (
        <ErrorBoundary>
            <CategoryTableContent {...props} />
        </ErrorBoundary>
    );
}