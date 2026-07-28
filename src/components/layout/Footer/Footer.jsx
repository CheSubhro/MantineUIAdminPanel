
import { Group, Text, Anchor } from '@mantine/core';
import { Badge } from '../../common/index';

export default function Footer() {
    
    const currentYear = new Date().getFullYear();

    return (
        <Group h="100%" px="md" justify="space-between" bg="white" style={{ borderTop: '1px solid #eaeaea' }}>
            <Text size="sm" c="dimmed">
                © {currentYear} <Anchor href="#" size="sm" fw={500}>Admin Panel Inc</Anchor>. All rights reserved.
            </Text>

            <Group gap="xs">
                <Badge variant="light" color="green" size="sm">System v1.0.0</Badge>
                <Anchor href="#" size="xs" c="dimmed">Privacy Policy</Anchor>
                <Text size="xs" c="dimmed">•</Text>
                <Anchor href="#" size="xs" c="dimmed">Terms of Service</Anchor>
            </Group>
        </Group>
    );
}