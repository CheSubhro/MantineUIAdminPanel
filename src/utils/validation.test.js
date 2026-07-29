
import { describe, it, expect } from 'vitest';
import { 
    validateUserForm, 
    isFormValid,
    validateCategoryForm, 
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