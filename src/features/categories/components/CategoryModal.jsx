
import React, { useState, useEffect } from 'react';
import { Stack, Group } from '@mantine/core';
import { Modal, Input, CustomSelect, Button } from '../../../components/common';

export default function CategoryModal({ opened, onClose, onSave, category }) {

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        status: 'Active'
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name || '',
                slug: category.slug || '',
                description: category.description || '',
                image: category.image || '',
                status: category.status || 'Active'
            });
        } else {
            setFormData({
                name: '',
                slug: '',
                description: '',
                image: '',
                status: 'Active'
            });
        }
        setErrors({});
    }, [category, opened]);

    // Auto-generate slug from name if creating new
    const handleNameChange = (e) => {
        const val = e.target.value;
        setFormData((prev) => ({
            ...prev,
            name: val,
            slug: !category ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug
        }));
        if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Category name is required';
        if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSave(formData);
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={category ? 'Edit Category' : 'Add New Category'}
            size="md"
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <Input
                        label="Category Name"
                        placeholder="e.g. Technology"
                        value={formData.name}
                        onChange={handleNameChange}
                        error={errors.name}
                        required
                    />

                    <Input
                        label="Slug"
                        placeholder="e.g. technology"
                        value={formData.slug}
                        onChange={(e) => {
                            setFormData((prev) => ({ ...prev, slug: e.target.value }));
                            if (errors.slug) setErrors((prev) => ({ ...prev, slug: null }));
                        }}
                        error={errors.slug}
                        required
                    />

                    <Input
                        label="Image URL"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                    />

                    <CustomSelect
                        label="Status"
                        data={['Active', 'Inactive']}
                        value={formData.status}
                        onChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
                    />

                    <Input
                        label="Description"
                        placeholder="Write a short description..."
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {category ? 'Update Category' : 'Create Category'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}