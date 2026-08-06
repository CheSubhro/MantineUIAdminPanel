
import React, { useState } from 'react';
import { PasswordInput, Stack, Text } from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Button, Input } from '../../../components/common';
import { loginFormSchema, formatZodErrors } from '../../../utils/validators';

export default function LoginForm({ onSubmit, error }) {
    
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const validationErrors = formatZodErrors(loginFormSchema, { identifier, password });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        onSubmit(identifier, password);
    };

    return (
        <form onSubmit={handleLoginSubmit}>
            <Stack>
                <Input
                    label="Username or Email"
                    placeholder="Enter username or email"
                    leftSection={<IconAt size={16} />}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    error={errors.identifier}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    leftSection={<IconLock size={16} />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                />

                {error && (
                    <Text c="red" size="xs">
                        {error}
                    </Text>
                )}

                <Button type="submit" fullWidth mt="xl">
                    Sign in
                </Button>
            </Stack>
        </form>
    );
}