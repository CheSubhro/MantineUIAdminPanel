
import React from 'react';
import { Title, Grid, Group } from '@mantine/core';
import { Card, Input, Button } from '../../../components/common';

const ProfileInfoSection = ({ form, onSubmit, loading }) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
            <Title order={3} mb="md">1. Profile Information</Title>

            <form onSubmit={form.onSubmit ? form.onSubmit(onSubmit) : (e) => { e.preventDefault(); onSubmit(form.values); }}>
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            {...form.getInputProps?.('fullName') || {}}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Input
                            label="Username"
                            placeholder="johndoe"
                            disabled
                            {...form.getInputProps?.('username') || {}}
                        />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Input
                            label="Email Address"
                            placeholder="john.doe@example.com"
                            {...form.getInputProps?.('email') || {}}
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </Group>
            </form>
        </Card>
    );
};

export default ProfileInfoSection;