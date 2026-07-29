
import { useState, useEffect } from 'react';
import { Stack, Group } from '@mantine/core';
import {
    Modal,
    Input,
    CustomSelect,
    Button,
    ErrorBoundary
} from '../../../components/common';

function PostModalContent({
    isOpen,
    onClose,
    onSave,
    postToEdit = null,
    categories = [] 
}) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        category: 'Technology',
        author: 'Subhro Mondal',
        image: '',
        status: 'Published',
    });

    const [errors, setErrors] = useState({});

    const categoryOptions = categories.length > 0
        ? categories.map(cat => ({ value: cat.name, label: cat.name }))
        : [
            { value: 'Technology', label: 'Technology' },
            { value: 'Lifestyle', label: 'Lifestyle' },
            { value: 'Travel', label: 'Travel' },
        ];

    const statusOptions = [
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
    ];

    useEffect(() => {
        if (postToEdit) {
            setFormData({
                id: postToEdit.id,
                title: postToEdit.title || '',
                slug: postToEdit.slug || '',
                excerpt: postToEdit.excerpt || '',
                category: postToEdit.category || 'Technology',
                author: postToEdit.author || 'Subhro Mondal',
                image: postToEdit.image || '',
                status: postToEdit.status || 'Published',
            });
        } else {
            setFormData({
                title: '',
                slug: '',
                excerpt: '',
                category: 'Technology',
                author: 'Subhro Mondal',
                image: '',
                status: 'Published',
            });
        }
        setErrors({});
    }, [postToEdit, isOpen]);

    const handleChange = (field, value) => {
        setFormData((prev) => {
            const updated = { ...prev, [field]: value };

            // Auto-generate slug from title if creating a new post
            if (field === 'title' && !postToEdit) {
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
        if (field === 'title' && errors.slug && !postToEdit) {
            setErrors((prev) => ({ ...prev, slug: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Post title is required';
        if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
        if (!formData.author.trim()) newErrors.author = 'Author name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={postToEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
            size="md"
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <Input
                        label="Post Title"
                        placeholder="e.g. Mastering React and Vite"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        error={errors.title}
                        required
                    />

                    <Input
                        label="Slug"
                        placeholder="e.g. mastering-react-and-vite"
                        value={formData.slug}
                        onChange={(e) => handleChange('slug', e.target.value)}
                        error={errors.slug}
                        required
                    />

                    <Group grow>
                        <CustomSelect
                            label="Category"
                            placeholder="Select category"
                            data={categoryOptions}
                            value={formData.category}
                            onChange={(value) => handleChange('category', value)}
                        />

                        <CustomSelect
                            label="Status"
                            placeholder="Select status"
                            data={statusOptions}
                            value={formData.status}
                            onChange={(value) => handleChange('status', value)}
                        />
                    </Group>

                    <Input
                        label="Author"
                        placeholder="e.g. Subhro Mondal"
                        value={formData.author}
                        onChange={(e) => handleChange('author', e.target.value)}
                        error={errors.author}
                        required
                    />

                    <Input
                        label="Featured Image URL"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.image}
                        onChange={(e) => handleChange('image', e.target.value)}
                    />

                    <Input
                        label="Excerpt / Description"
                        placeholder="Write a short summary of the post..."
                        value={formData.excerpt}
                        onChange={(e) => handleChange('excerpt', e.target.value)}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button type="submit">
                            {postToEdit ? 'Update Post' : 'Create Post'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

export default function PostModal(props) {
    return (
        <ErrorBoundary>
            <PostModalContent {...props} />
        </ErrorBoundary>
    );
}