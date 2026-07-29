
import { useState, useEffect } from 'react';
import { Stack, Group } from '@mantine/core';
import {
    Modal,
    Input,
    CustomSelect,
    Button,
    ErrorBoundary
} from '../../../components/common';

function PageModalContent({
    isOpen,
    onClose,
    onSave,
    pageToEdit = null
}) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        author: 'Subhro Mondal',
        status: 'Published',
    });

    const [errors, setErrors] = useState({});

    const statusOptions = [
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
    ];

    useEffect(() => {
        if (pageToEdit) {
            setFormData({
                id: pageToEdit.id,
                title: pageToEdit.title || '',
                slug: pageToEdit.slug || '',
                excerpt: pageToEdit.excerpt || '',
                author: pageToEdit.author || 'Subhro Mondal',
                status: pageToEdit.status || 'Published',
            });
        } else {
            setFormData({
                title: '',
                slug: '',
                excerpt: '',
                author: 'Subhro Mondal',
                status: 'Published',
            });
        }
        setErrors({});
    }, [pageToEdit, isOpen]);

    const handleChange = (field, value) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };

            // Auto-generate slug from title if creating a new page
            if (field === 'title' && !pageToEdit) {
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
        if (field === 'title' && errors.slug && !pageToEdit) {
            setErrors((prev) => ({ ...prev, slug: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Page title is required';
        if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
        if (!formData.author.trim()) newErrors.author = 'Author name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const currentDate = new Date().toISOString().split('T')[0];
            const payload = {
                ...formData,
                updatedAt: currentDate,
            };
            onSave(payload);
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={pageToEdit ? 'Edit Website Page' : 'Add New Website Page'}
            size="md"
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <Input
                        label="Page Title"
                        placeholder="e.g. Privacy Policy"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        error={errors.title}
                        required
                    />

                    <Input
                        label="Slug"
                        placeholder="e.g. privacy-policy"
                        value={formData.slug}
                        onChange={(e) => handleChange('slug', e.target.value)}
                        error={errors.slug}
                        required
                    />

                    <Group grow>
                        <CustomSelect
                            label="Status"
                            placeholder="Select status"
                            data={statusOptions}
                            value={formData.status}
                            onChange={(value) => handleChange('status', value)}
                        />

                        <Input
                            label="Author"
                            placeholder="e.g. Subhro Mondal"
                            value={formData.author}
                            onChange={(e) => handleChange('author', e.target.value)}
                            error={errors.author}
                            required
                        />
                    </Group>

                    <Input
                        label="Excerpt / Summary"
                        placeholder="Write a short summary of the page..."
                        value={formData.excerpt}
                        onChange={(e) => handleChange('excerpt', e.target.value)}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} type="button" color="gray">
                            Cancel
                        </Button>
                        <Button type="submit" color="violet">
                            {pageToEdit ? 'Update Page' : 'Create Page'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

export default function PageModal(props) {
    return (
        <ErrorBoundary>
            <PageModalContent {...props} />
        </ErrorBoundary>
    );
}