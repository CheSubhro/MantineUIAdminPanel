
import { Modal as MantineModal } from '@mantine/core';

export default function Modal({ opened, onClose, title, children, size = 'md', ...props }) {
    return (
        <MantineModal opened={opened} onClose={onClose} title={title} size={size} centered {...props}>
            {children}
        </MantineModal>
    );
}