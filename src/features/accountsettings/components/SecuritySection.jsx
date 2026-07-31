
import React from 'react';
import { Title, Text, Grid, Group, Divider, Box, PasswordInput } from '@mantine/core';
import { Card, Button, ThemeToggle } from '../../../components/common';

const SecuritySection = ({ form, onSubmit, loading }) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
            <Title order={3} mb="md">2. Security Settings</Title>

            <Text fw={500} size="sm" mb="sm">Change Password</Text>

            <form onSubmit={form.onSubmit ? form.onSubmit(onSubmit) : (e) => { e.preventDefault(); onSubmit(form.values); }}>
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <PasswordInput
                            label="Current Password"
                            placeholder="Current password"
                            {...form.getInputProps?.('currentPassword') || {}}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <PasswordInput
                            label="New Password"
                            placeholder="New password"
                            {...form.getInputProps?.('newPassword') || {}}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <PasswordInput
                            label="Confirm New Password"
                            placeholder="Retype new password"
                            {...form.getInputProps?.('confirmPassword') || {}}
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={loading}>
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </Group>
            </form>

            <Divider my="lg" />

            <Group justify="space-between" align="center">
                <Box>
                    <Text fw={500} size="sm">Two-Factor Authentication (2FA)</Text>
                    <Text size="xs" c="dimmed">Secure your account with an additional layer.</Text>
                </Box>
                <ThemeToggle />
            </Group>
        </Card>
    );
};

export default SecuritySection;