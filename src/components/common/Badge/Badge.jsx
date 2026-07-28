
import { Badge as MantineBadge } from '@mantine/core';

export default function Badge({ children, ...props }) {
    return <MantineBadge {...props}>{children}</MantineBadge>;
}