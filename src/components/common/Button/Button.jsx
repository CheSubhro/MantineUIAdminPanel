
import { Button as MantineButton } from '@mantine/core';

export default function Button({ children, ...props }) {
    return <MantineButton {...props}>{children}</MantineButton>;
}