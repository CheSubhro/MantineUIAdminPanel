
import { useState, useEffect } from 'react';
import { Stack, Group } from '@mantine/core';
import {
    Modal,
    Input,
    CustomSelect,
    Button,
    ErrorBoundary
} from '../../../components/common';

import { userFormSchema, formatZodErrors } from '../../../utils/validators';

function UserModalContent({
    isOpen,
    onClose,
    onSave,
    userToEdit = null
}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'User',
        status: 'Active',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                id: userToEdit.id,
                name: userToEdit.name || '',
                email: userToEdit.email || '',
                role: userToEdit.role || 'User',
                status: userToEdit.status || 'Active',
            });
        } else {
            setFormData({
                name: '',
                email: '',
                role: 'User',
                status: 'Active',
            });
        }
        setErrors({});
    }, [userToEdit, isOpen]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const validate = () => {
        const validationErrors = formatZodErrors(userFormSchema, formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
            onClose();
        }
    };

    const roleOptions = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Manager', label: 'Manager' },
        { value: 'User', label: 'User' },
    ];

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={userToEdit ? 'Edit User' : 'Add New User'}
        >
            <form onSubmit={handleSubmit}>
                <Stack gap="md">
                    <Input
                        label="Full Name"
                        placeholder="Enter user name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={errors.name}
                        required
                    />

                    <Input
                        label="Email Address"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={errors.email}
                        required
                    />

                    <CustomSelect
                        label="Role"
                        placeholder="Select role"
                        data={roleOptions}
                        value={formData.role}
                        onChange={(value) => handleChange('role', value)}
                    />

                    <CustomSelect
                        label="Status"
                        placeholder="Select status"
                        data={statusOptions}
                        value={formData.status}
                        onChange={(value) => handleChange('status', value)}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button type="submit">
                            {userToEdit ? 'Update User' : 'Save User'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

export default function UserModal(props) {
    return (
        <ErrorBoundary>
            <UserModalContent {...props} />
        </ErrorBoundary>
    );
}