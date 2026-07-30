
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin_user')) || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Register Handler
    const register = (formData) => {
        setLoading(true);
        setError(null);
        try {
            // Saving mock user data to localStorage
            localStorage.setItem('admin_user', JSON.stringify(formData));
            setUser(formData);
            setLoading(false);
            navigate('/login');
            return true;
        } catch (err) {
            setError('Registration failed. Please try again.');
            setLoading(false);
            return false;
        }
    };

    // Login Handler (supports both username or email in a single input)
    const login = (identifier, password) => {
        setLoading(true);
        setError(null);
        
        const storedUser = JSON.parse(localStorage.getItem('admin_user'));

        if (!storedUser) {
            setError('No account found. Please register first.');
            setLoading(false);
            return false;
        }

        const isMatch = 
            (storedUser.username === identifier || storedUser.email === identifier) && 
            storedUser.password === password;

        if (isMatch) {
            setUser(storedUser);
            setLoading(false);
            navigate('/dashboard');
            return true;
        } else {
            setError('Invalid username/email or password.');
            setLoading(false);
            return false;
        }
    };

    // Logout Handler
    const logout = () => {
        localStorage.removeItem('admin_user');
        setUser(null);
        navigate('/login');
    };

    return {
        user,
        loading,
        error,
        register,
        login,
        logout
    };
};