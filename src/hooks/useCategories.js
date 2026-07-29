
import { useState, useMemo } from 'react';
import { showToast } from '../utils/toast'; 

const initialCategories = [
    {
        id: '1',
        name: 'Technology',
        slug: 'technology',
        description: 'Latest tech news, gadgets, and software development trends.',
        postCount: 12,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Tips for daily living, health, productivity, and wellness.',
        postCount: 8,
        image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=100',
        status: 'Active'
    },
    {
        id: '3',
        name: 'Travel',
        slug: 'travel',
        description: 'Explore breathtaking destinations and travel guides.',
        postCount: 5,
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100',
        status: 'Inactive'
    }
];

export function useCategories() {
    const [categories, setCategories] = useState(initialCategories);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Delete confirmation state
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Filtered categories based on search and status
    const filteredCategories = useMemo(() => {
        return categories.filter((cat) => {
            const matchesSearch = 
                cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cat.slug.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesStatus = statusFilter === 'All' || cat.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [categories, searchQuery, statusFilter]);

    // Open Modal for Add or Edit
    const handleOpenModal = (category = null) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCategory(null);
        setIsModalOpen(false);
    };

    // Save Category (Create / Update)
    const handleSaveCategory = (formData) => {
        if (selectedCategory) {
            // Update
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === selectedCategory.id ? { ...cat, ...formData } : cat
                )
            );
            showToast('Category updated successfully!', 'success');
        } else {
            // Create
            const newCategory = {
                id: Date.now().toString(),
                postCount: 0,
                ...formData
            };
            setCategories((prev) => [newCategory, ...prev]);
            showToast('Category created successfully!', 'success');
        }
        handleCloseModal();
    };

    // Delete Category
    const handleDeleteCategory = (id) => {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        setCategoryToDelete(null);
        showToast('Category deleted successfully!', 'success');
    };

    return {
        categories: filteredCategories,
        totalCount: categories.length,
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
    };
}