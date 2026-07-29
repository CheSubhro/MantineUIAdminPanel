
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