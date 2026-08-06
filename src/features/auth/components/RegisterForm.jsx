
import React, { useState } from 'react';
import { PasswordInput, FileInput, Stack } from '@mantine/core';
import { IconUser, IconAt, IconLock, IconPhoto, IconShieldCheck } from '@tabler/icons-react';
import { Button, Input, CustomSelect } from '../../../components/common';
import { registerFormSchema, formatZodErrors } from '../../../utils/validators';

export default function RegisterForm({ onSubmit }) {

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        role: 'Admin',
        avatar: null,
        coverImage: null
    });

    const [errors, setErrors] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const validationErrors = formatZodErrors(registerFormSchema, formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleFormSubmit}>
            <Stack>
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    leftSection={<IconUser size={16} />}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    error={errors.fullName}
                />

                <Input
                    label="Username"
                    placeholder="johndoe"
                    leftSection={<IconUser size={16} />}
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    error={errors.username}
                />

                <Input
                    label="Email"
                    placeholder="you@mantine.dev"
                    leftSection={<IconAt size={16} />}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    leftSection={<IconLock size={16} />}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    error={errors.password}
                />

                <CustomSelect
                    label="Role"
                    placeholder="Select role"
                    leftSection={<IconShieldCheck size={16} />}
                    data={['Super Admin', 'Admin', 'Moderator', 'Editor']}
                    value={formData.role}
                    onChange={(value) => setFormData({ ...formData, role: value })}
                />

                <FileInput
                    label="Avatar"
                    placeholder="Upload avatar image"
                    leftSection={<IconPhoto size={16} />}
                    accept="image/png,image/jpeg"
                    onChange={(file) => setFormData({ ...formData, avatar: file ? URL.createObjectURL(file) : null })}
                />

                <FileInput
                    label="Cover Image"
                    placeholder="Upload cover image"
                    leftSection={<IconPhoto size={16} />}
                    accept="image/png,image/jpeg"
                    onChange={(file) => setFormData({ ...formData, coverImage: file ? URL.createObjectURL(file) : null })}
                />

                <Button type="submit" fullWidth mt="xl">
                    Register
                </Button>
            </Stack>
        </form>
    );
}