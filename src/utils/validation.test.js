
import { describe, it, test, expect } from 'vitest';
import { 
    validateUserForm, 
    isFormValid,
    validateCategoryForm, 
    validatePostForm,
    validatePageForm,
    isValidEmail
} from './validation';

describe('User Form Validation Utility', () => {
    it('should return no errors for valid user input', () => {
        const validUser = {
            name: 'Subhro Mondal',
            email: 'siltu@example.com',
            role: 'Admin',
            status: 'Active',
        };

        const errors = validateUserForm(validUser);
        expect(errors).toEqual({});
        expect(isFormValid(errors)).toBe(true);
    });

    it('should return error if name is missing or too short', () => {
        const invalidUser1 = { name: '', email: 'test@example.com', role: 'User' };
        const errors1 = validateUserForm(invalidUser1);
        expect(errors1.name).toBe('Name is required.');

        const invalidUser2 = { name: 'A', email: 'test@example.com', role: 'User' };
        const errors2 = validateUserForm(invalidUser2);
        expect(errors2.name).toBe('Name must be at least 2 characters long.');
    });

    it('should return error for missing or invalid email format', () => {
        const invalidUser1 = { name: 'John Doe', email: '', role: 'User' };
        const errors1 = validateUserForm(invalidUser1);
        expect(errors1.email).toBe('Email is required.');

        const invalidUser2 = { name: 'John Doe', email: 'invalid-email', role: 'User' };
        const errors2 = validateUserForm(invalidUser2);
        expect(errors2.email).toBe('Invalid email address format.');
    });

    it('should return error if role is missing', () => {
        const invalidUser = { name: 'John Doe', email: 'john@example.com', role: '' };
        const errors = validateUserForm(invalidUser);
        expect(errors.role).toBe('Role is required.');
    });

    it('isFormValid should return false if errors exist', () => {
        const errors = { name: 'Name is required.' };
        expect(isFormValid(errors)).toBe(false);
    });
});

describe('Validation Utilities', () => {
    
    describe('validateCategoryForm', () => {
        test('should return no errors for valid category input', () => {
            const validValues = {
                name: 'Electronics',
                slug: 'electronics',
                description: 'Gadgets and devices'
            };

            const errors = validateCategoryForm(validValues);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('should return errors when name and slug are missing or empty', () => {
            const invalidValues = {
                name: '',
                slug: ''
            };

            const errors = validateCategoryForm(invalidValues);
            expect(errors.name).toBe('Category name is required');
            expect(errors.slug).toBe('Slug is required');
        });

        test('should return error for invalid slug format (uppercase or spaces)', () => {
            const invalidValues = {
                name: 'Mobile Phones',
                slug: 'Mobile Phones!' 
            };

            const errors = validateCategoryForm(invalidValues);
            expect(errors.slug).toBe('Slug must be lowercase and contain only letters, numbers, and hyphens');
        });

        test('should return error if name is too short', () => {
            const invalidValues = {
                name: 'A',
                slug: 'a'
            };

            const errors = validateCategoryForm(invalidValues);
            expect(errors.name).toBe('Category name must be at least 2 characters long');
        });
    });

    describe('validatePostForm', () => {
        test('should return no errors for valid post input', () => {
            const validValues = {
                title: 'Mastering React and Vite',
                slug: 'mastering-react-and-vite',
                author: 'Subhro Mondal',
                excerpt: 'Learn how to use React with Vite efficiently.'
            };

            const errors = validatePostForm(validValues);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('should return errors when required fields are missing', () => {
            const invalidValues = {
                title: '',
                slug: '',
                author: ''
            };

            const errors = validatePostForm(invalidValues);
            expect(errors.title).toBe('Post title is required');
            expect(errors.slug).toBe('Slug is required');
            expect(errors.author).toBe('Author name is required');
        });

        test('should return error for invalid post slug format', () => {
            const invalidValues = {
                title: 'Test Post',
                slug: 'Test Post Slug!',
                author: 'Subhro Mondal'
            };

            const errors = validatePostForm(invalidValues);
            expect(errors.slug).toBe('Slug must be lowercase and contain only letters, numbers, and hyphens');
        });
    });

    describe('validatePageForm', () => {
        test('should return no errors for valid page input', () => {
            const validValues = {
                title: 'Privacy Policy',
                slug: 'privacy-policy',
                author: 'Subhro Mondal',
                excerpt: 'Learn how we handle data.'
            };

            const errors = validatePageForm(validValues);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('should return errors when required page fields are missing', () => {
            const invalidValues = {
                title: '',
                slug: '',
                author: ''
            };

            const errors = validatePageForm(invalidValues);
            expect(errors.title).toBe('Page title is required');
            expect(errors.slug).toBe('Slug is required');
            expect(errors.author).toBe('Author name is required');
        });
    });

    describe('isValidEmail', () => {
        test('should return true for valid email addresses', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
        });

        test('should return false for invalid email addresses', () => {
            expect(isValidEmail('invalid-email')).toBe(false);
            expect(isValidEmail('user@domain')).toBe(false);
            expect(isValidEmail('')).toBe(false);
        });
    });
});