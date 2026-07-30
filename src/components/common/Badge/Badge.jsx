
import React from 'react';
import { Badge as MantineBadge } from '@mantine/core';

export default function Badge({ children, color = 'blue', variant = 'light', ...props }) {
    return (
        <MantineBadge color={color} variant={variant} {...props}>
            {children}
        </MantineBadge>
    );
}