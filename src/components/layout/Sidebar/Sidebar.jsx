
import { Stack, Text, UnstyledButton, Group } from '@mantine/core';
import {
    IconDashboard,
    IconUsers,
    IconSettings,
    IconLogout,
    IconFileText,
    IconChartBar
} from '@tabler/icons-react';
import { Tooltip, Button } from '../index';

export default function Sidebar({ activeRoute = 'dashboard', onNavigate, onLogout }) {
    
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
        { id: 'users', label: 'Users Management', icon: IconUsers },
        { id: 'analytics', label: 'Analytics', icon: IconChartBar },
        { id: 'reports', label: 'Reports', icon: IconFileText },
        { id: 'settings', label: 'Settings', icon: IconSettings },
    ];

    return (
        <Stack h="100%" justify="space-between" p="md">
            {/* Top Menu Links */}
            <Stack gap="xs">
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                    Main Menu
                </Text>

                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeRoute === item.id;

                    return (
                        <Tooltip key={item.id} label={item.label} position="right" disabled={true}>
                            <UnstyledButton
                                onClick={() => onNavigate && onNavigate(item.id)}
                                py="xs"
                                px="md"
                                style={(theme) => ({
                                    borderRadius: theme.radius.sm,
                                    backgroundColor: isActive ? theme.colors.blue[0] : 'transparent',
                                    color: isActive ? theme.colors.blue[7] : theme.colors.gray[7],
                                    '&:hover': {
                                        backgroundColor: theme.colors.gray[0],
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
            <Stack pt="md" style={{ borderTop: '1px solid #eaeaea' }}>
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