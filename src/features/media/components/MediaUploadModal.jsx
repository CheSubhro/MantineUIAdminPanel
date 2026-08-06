
import React, { useState } from 'react';
import { Group, Text, rem } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Modal } from '../../../components/common';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { validateMediaFile, MAX_FILE_SIZE } from '../../../utils/validators';

export default function MediaUploadModal({ opened, onClose, onUpload }) {

    const [errorMessage, setErrorMessage] = useState('');

    const handleDrop = (files) => {
        setErrorMessage('');
        const validFiles = [];

        for (const file of files) {
            const validation = validateMediaFile(file);
            if (!validation.isValid) {
                setErrorMessage(validation.message);
                return;
            }
            validFiles.push(file);
        }

        if (onUpload && validFiles.length > 0) {
            onUpload(validFiles);
        }
    };

    const handleReject = (files) => {
        const rejectedFile = files[0]?.file;
        const validation = validateMediaFile(rejectedFile);
        setErrorMessage(validation.message || 'File upload rejected. Check file size and type.');
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Upload Files to Cloudinary" size="lg" centered>
            {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium shadow-sm">
                    {errorMessage}
                </div>
            )}

            <Dropzone
                onDrop={handleDrop}
                onReject={handleReject}
                maxSize={MAX_FILE_SIZE}
                accept={IMAGE_MIME_TYPE}
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>Drag images here or click to select files</Text>
                        <Text size="sm" c="dimmed" inline mt={7}>Attach as many files as you like, each file should not exceed 5mb</Text>
                    </div>
                </Group>
            </Dropzone>
        </Modal>
    );
}