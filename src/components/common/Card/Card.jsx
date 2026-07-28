
import { Card as MantineCard } from '@mantine/core';

export default function Card({ children, ...props }) {
    return (
        <MantineCard shadow="sm" padding="lg" radius="md" withBorder {...props}>
            {children}
        </MantineCard>
    );
}