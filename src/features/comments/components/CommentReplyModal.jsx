
import { Stack, Text, TextInput, Group } from '@mantine/core';
import { Modal, Button } from '../../../components/common';

export default function CommentReplyModal({ opened, onClose, selectedComment, replyText, setReplyText, onSend }) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={`Reply to ${selectedComment?.author || 'Comment'}`}
        >
            <Stack gap="md">
                <Text size="sm" c="dimmed">
                    Original Comment: "{selectedComment?.content}"
                </Text>
                <TextInput
                    label="Your Reply"
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                />
                <Group justify="flex-end">
                    <Button variant="default" onClick={onClose}>Cancel</Button>
                    <Button color="violet" onClick={onSend}>Send Reply</Button>
                </Group>
            </Stack>
        </Modal>
    );
}