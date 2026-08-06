
import { useState, useEffect } from 'react';
import { Stack, Group } from '@mantine/core';
import {
    Modal,
    Input,
    CustomSelect,
    Button,
    ErrorBoundary
} from '../../../components/common';
import { categoryFormSchema, formatZodErrors } from '../../../utils/validators';

function CategoryModalContent({
    isOpen,
    onClose,
    onSave,
    categoryToEdit = null
}) {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        status: 'Active',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (categoryToEdit) {
            setFormData({
                id: categoryToEdit.id,
                name: categoryToEdit.name || '',
                slug: categoryToEdit.slug || '',
                description: categoryToEdit.description || '',
                image: categoryToEdit.image || '',
                status: categoryToEdit.status || 'Active',
            });
        } else {
            setFormData({
                name: '',
                slug: '',
                description: '',
                image: '',
                status: 'Active',
            });
        }
        setErrors({});
    }, [categoryToEdit, isOpen]);

    const handleChange = (field, value) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };

            // Auto-generate slug from name if creating a new category
            if (field === 'name' && !categoryToEdit) {
                updated.slug = value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }
            return updated;
        });

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
        if (field === 'name' && errors.slug && !categoryToEdit) {
            setErrors((prev) => ({ ...prev, slug: null }));
        }
    };

    const validate = () => {
        const validationErrors = formatZodErrors(categoryFormSchema, formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
            onClose();
        }
    };

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={categoryToEdit ? 'Edit Category' : 'Add New Category'}
            size="md"
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <Input
                        label="Category Name"
                        placeholder="e.g. Technology"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={errors.name}
                        required
                    />

                    <Input
                        label="Slug"
                        placeholder="e.g. technology"
                        value={formData.slug}
                        onChange={(e) => handleChange('slug', e.target.value)}
                        error={errors.slug}
                        required
                    />

                    <Input
                        label="Image URL"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={(e) => handleChange('image', e.target.value)}
                    />

                    <CustomSelect
                        label="Status"
                        placeholder="Select status"
                        data={statusOptions}
                        value={formData.status}
                        onChange={(value) => handleChange('status', value)}
                    />

                    <Input
                        label="Description"
                        placeholder="Write a short description..."
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button type="submit">
                            {categoryToEdit ? 'Update Category' : 'Create Category'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

export default function CategoryModal(props) {
    return (
        <ErrorBoundary>
            <CategoryModalContent {...props} />
        </ErrorBoundary>
    );
}