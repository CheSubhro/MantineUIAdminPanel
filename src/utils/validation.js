
export function validateUserForm(values) {
    
    const errors = {};

    // Name Validation
    if (!values.name || !values.name.trim()) {
        errors.name = 'Name is required.';
    } else if (values.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long.';
    }

    // Email Validation
    if (!values.email || !values.email.trim()) {
        errors.email = 'Email is required.';
    } else {
        // Standard email regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email.trim())) {
            errors.email = 'Invalid email address format.';
        }
    }

    // Role Validation
    if (!values.role || !values.role.trim()) {
        errors.role = 'Role is required.';
    }

    return errors;
}

export function isFormValid(errors) {
    return Object.keys(errors).length === 0;
}

export const validateCategoryForm = (values) => {
    const errors = {};

    if (!values.name || values.name.trim() === '') {
        errors.name = 'Category name is required';
    } else if (values.name.length < 2) {
        errors.name = 'Category name must be at least 2 characters long';
    }

    if (!values.slug || values.slug.trim() === '') {
        errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(values.slug)) {
        errors.slug = 'Slug must be lowercase and contain only letters, numbers, and hyphens';
    }

    if (values.description && values.description.length > 255) {
        errors.description = 'Description cannot exceed 255 characters';
    }

    return errors;
};

export const validatePostForm = (values) => {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Post title is required';
    } else if (values.title.length < 3) {
        errors.title = 'Post title must be at least 3 characters long';
    }

    if (!values.slug || values.slug.trim() === '') {
        errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(values.slug)) {
        errors.slug = 'Slug must be lowercase and contain only letters, numbers, and hyphens';
    }

    if (!values.author || values.author.trim() === '') {
        errors.author = 'Author name is required';
    }

    if (values.excerpt && values.excerpt.length > 300) {
        errors.excerpt = 'Excerpt cannot exceed 300 characters';
    }

    return errors;
};

export const validatePageForm = (values) => {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Page title is required';
    } else if (values.title.length < 3) {
        errors.title = 'Page title must be at least 3 characters long';
    }

    if (!values.slug || values.slug.trim() === '') {
        errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(values.slug)) {
        errors.slug = 'Slug must be lowercase and contain only letters, numbers, and hyphens';
    }

    if (!values.author || values.author.trim() === '') {
        errors.author = 'Author name is required';
    }

    if (values.excerpt && values.excerpt.length > 300) {
        errors.excerpt = 'Excerpt cannot exceed 300 characters';
    }

    return errors;
};

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};