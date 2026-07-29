
import React from 'react';
import {
    Title,
    Text,
    Group,
    Card,
    TextInput,
    Select,
    Button as MantineButton,
    rem,
} from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import { useCategories } from '../hooks/useCategories';
import CategoryTable from '../features/categories/components/CategoryTable';
import CategoryModal from '../features/categories/components/CategoryModal';
import { ConfirmModal } from '../components/common';

export default function CategoriesPage() {
    const {
        categories,
        totalCount,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        isModalOpen,
        selectedCategory,
        categoryToDelete,
        setCategoryToDelete,
        handleOpenModal,
        handleCloseModal,
        handleSaveCategory,
        handleDeleteCategory
    } = useCategories();

    return (
        <div style={{ padding: '24px' }}>
            {/* Header Section */}
            <Group justify="space-between" mb="lg">
                <div>
                    <Title order={2}>Categories Management</Title>
                    <Text c="dimmed" size="sm">Manage your blog post categories and structures ({totalCount} total)</Text>
                </div>
                <MantineButton
                    leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}
                    onClick={() => handleOpenModal()}
                >
                    Add Category
                </MantineButton>
            </Group>

            {/* Filter & Search Card */}
            <Card shadow="sm" padding="md" radius="md" withBorder mb="lg">
                <Group justify="space-between">
                    <TextInput
                        placeholder="Search by name or slug..."
                        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ flex: 1, maxWidth: 350 }}
                    />

                    <Select
                        placeholder="Filter by Status"
                        data={['All', 'Active', 'Inactive']}
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ width: 180 }}
                        clearable={false}
                    />
                </Group>
            </Card>

            {/* Main Categories Table Card */}
            <Card shadow="sm" padding="md" radius="md" withBorder>
                <CategoryTable
                    categories={categories}
                    onEdit={(cat) => handleOpenModal(cat)}
                    onDelete={(cat) => setCategoryToDelete(cat)}
                />
            </Card>

            {/* Add/Edit Modal */}
            <CategoryModal
                opened={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveCategory}
                category={selectedCategory}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                opened={!!categoryToDelete}
                onClose={() => setCategoryToDelete(null)}
                onConfirm={() => handleDeleteCategory(categoryToDelete?.id)}
                title="Delete Category"
                message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                confirmColor="red"
            />
        </div>
    );
}