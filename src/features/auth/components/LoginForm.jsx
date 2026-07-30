
import React, { useState } from 'react';
import { PasswordInput, Stack, Text } from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Button, Input } from '../../../components/common';

export default function LoginForm({ onSubmit, error }) {
    
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!identifier || !password) {
            setValidationError('Please fill in all fields');
            return;
        }

        setValidationError('');
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
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    leftSection={<IconLock size={16} />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {(validationError || error) && (
                    <Text c="red" size="xs">
                        {validationError || error}
                    </Text>
                )}

                <Button type="submit" fullWidth mt="xl">
                    Sign in
                </Button>
            </Stack>
        </form>
    );
}