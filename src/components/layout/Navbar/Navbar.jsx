
import { Group, Burger, Text, ActionIcon, Avatar, Menu, Box } from '@mantine/core';
import { IconBell, IconSettings, IconLogout, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Badge, ThemeToggle } from '../../common/index';

export default function Navbar({ opened, toggle, user = { name: 'Admin User', role: 'Super Admin' } }) {
    const navigate = useNavigate();

    return (
        <Group h="100%" px="md" justify="space-between" bg="var(--mantine-color-body)" style={{ borderBottom: '1px solid #eaeaea' }}>
            {/* Left Section: Burger & App Title */}
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Text fw={700} size="lg" c="blue.7">Admin Panel</Text>
            </Group>

            {/* Right Section: Notifications, Tooltips & User Profile */}
            <Group gap="md">
                <Tooltip label="Toggle Theme">
                    <ThemeToggle />
                </Tooltip>
                {/* Notification Icon with Tooltip & Badge */}
                <Tooltip label="Notifications">
                    <ActionIcon variant="subtle" size="lg" radius="xl" aria-label="Notifications" style={{ position: 'relative' }}>
                        <IconBell size={20} />
                        <div style={{ position: 'absolute', top: 4, right: 4 }}>
                            <Badge size="xs" circle color="red">3</Badge>
                        </div>
                    </ActionIcon>
                </Tooltip>

                {/* User Profile Dropdown */}
                <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                        <Group style={{ cursor: 'pointer' }} gap="xs">
                            <Avatar src={user.avatar} radius="xl" size="sm" color="blue">
                                {user.name.charAt(0)}
                            </Avatar>
                            <Box style={{ lineHeight: 1 }} visibleFrom="sm">
                                <Text size="sm" fw={500}>{user.name}</Text>
                                <Text size="xs" c="dimmed">{user.role}</Text>
                            </Box>
                        </Group>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Settings</Menu.Label>
                        <Menu.Item
                            leftSection={<IconUser size={14} />}
                            onClick={() => navigate('/profile')}
                        >
                            Profile
                        </Menu.Item>
                        <Menu.Item leftSection={<IconSettings size={14} />}>Account Settings</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}