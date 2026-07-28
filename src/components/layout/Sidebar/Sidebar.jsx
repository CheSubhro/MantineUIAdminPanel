
import { Stack, Text, UnstyledButton, Group } from '@mantine/core';
import {
    IconDashboard,
    IconUsers,
    IconSettings,
    IconLogout,
    IconFileText,
    IconChartBar
} from '@tabler/icons-react';
import { Tooltip, Button } from '../../common/index';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar({ onLogout }) {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: IconDashboard },
        { id: 'users', label: 'Users Management', path: '/users', icon: IconUsers },
        { id: 'analytics', label: 'Analytics', path: '/analytics', icon: IconChartBar },
        { id: 'reports', label: 'Reports', path: '/reports', icon: IconFileText },
        { id: 'settings', label: 'Settings', path: '/settings', icon: IconSettings },
    ];

    return (
        <Stack
            h="100%"
            justify="space-between"
            p="md"
            style={(theme) => ({
                borderRight: '1px solid var(--mantine-color-default-border)',
                backgroundColor: 'var(--mantine-color-body)'
            })}
        >
            {/* Top Menu Links */}
            <Stack gap="xs">
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                    Main Menu
                </Text>

                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Tooltip key={item.id} label={item.label} position="right" disabled={true}>
                            <UnstyledButton
                                onClick={() => navigate(item.path)}
                                py="xs"
                                px="md"
                                style={(theme) => ({
                                    borderRadius: theme.radius.sm,
                                    backgroundColor: isActive
                                        ? (theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[0])
                                        : 'transparent',
                                    color: isActive
                                        ? (theme.colorScheme === 'dark' ? theme.white : theme.colors.blue[7])
                                        : 'var(--mantine-color-text)',
                                    '&:hover': {
                                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                    },
                                })}
                            >
                                <Group>
                                    <Icon size={20} />
                                    <Text size="sm" fw={isActive ? 600 : 400}>{item.label}</Text>
                                </Group>
                            </UnstyledButton>
                        </Tooltip>
                    );
                })}
            </Stack>

            {/* Bottom Logout Button */}
            <Stack pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                <Button
                    variant="subtle"
                    color="red"
                    fullWidth
                    justify="flex-start"
                    leftSection={<IconLogout size={20} />}
                    onClick={onLogout}
                >
                    Logout
                </Button>
            </Stack>
        </Stack>
    );
}