
import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountSettingsForm from '../components/AccountSettingsForm';

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock('../../../hooks/useAuth', () => ({
    useAuth: () => ({
        user: {
            fullName: 'Test User',
            username: 'testuser',
            email: 'test@example.com',
            role: 'Admin',
        },
        updateUserProfile: jest.fn(),
        deleteAccount: jest.fn(),
    }),
}));

describe('AccountSettingsForm Component', () => {
    test('renders account settings heading and profile sections', () => {
        render(<AccountSettingsForm />);
        
        const headingElement = screen.getByText(/Account Settings/i);
        expect(headingElement).toBeInTheDocument();

        const profileSectionText = screen.getByText(/1. Profile Information/i);
        expect(profileSectionText).toBeInTheDocument();
    });
});