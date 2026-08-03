
import React from 'react';
import { Stack, Text, Group } from '@mantine/core';
import { Card, Input, Button, CustomSelect, Tooltip, Badge } from '../../../components/common/index';
import { IconHelp, IconWorld, IconSparkles } from '@tabler/icons-react';

export default function SeoForm({ seoData, onChange, onSave, loading }) {

    const socialPlatforms = [
        { value: 'facebook', label: 'Facebook / Open Graph' },
        { value: 'twitter', label: 'Twitter Card' },
        { value: 'linkedin', label: 'LinkedIn Post' }
    ];

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Stack gap="md">
                <Group justify="space-between" align="center">
                    <Group gap="xs">
                        <IconWorld size={22} color="var(--mantine-color-blue-6)" />
                        <Text fw={600} size="lg">Meta Fields & Open Graph Configuration</Text>
                    </Group>
                    <Badge color="blue" variant="light">SEO Engine Active</Badge>
                </Group>

                {/* Meta Title */}
                <Group align="flex-end" grow>
                    <Input
                        label="Meta Title"
                        placeholder="Enter meta title (30-60 chars)"
                        value={seoData.metaTitle}
                        onChange={(e) => onChange('metaTitle', e.target.value)}
                    />
                    <Tooltip label="Optimal title length is between 30 to 60 characters for best search visibility." position="top">
                        <IconHelp size={18} style={{ cursor: 'pointer', marginBottom: '10px' }} />
                    </Tooltip>
                </Group>

                {/* Meta Description */}
                <Group align="flex-end" grow>
                    <Input
                        label="Meta Description"
                        placeholder="Enter meta description (70-160 chars)"
                        value={seoData.metaDescription}
                        onChange={(e) => onChange('metaDescription', e.target.value)}
                    />
                    <Tooltip label="Keep description between 70 to 160 characters to avoid truncation in SERP." position="top">
                        <IconHelp size={18} style={{ cursor: 'pointer', marginBottom: '10px' }} />
                    </Tooltip>
                </Group>

                {/* Focus Keyword */}
                <Input
                    label="Focus Keyword"
                    placeholder="Primary keyword for optimization"
                    value={seoData.focusKeyword}
                    onChange={(e) => onChange('focusKeyword', e.target.value)}
                />

                <Text fw={500} size="md" mt="sm">Open Graph (OG) Social Settings</Text>

                {/* Social Platform Select */}
                <CustomSelect
                    label="Target Social Platform"
                    placeholder="Select platform"
                    data={socialPlatforms}
                    value={seoData.targetPlatform || 'facebook'}
                    onChange={(val) => onChange('targetPlatform', val)}
                />

                <Input
                    label="OG Title"
                    placeholder="Social share title"
                    value={seoData.ogTitle}
                    onChange={(e) => onChange('ogTitle', e.target.value)}
                />

                <Input
                    label="OG Description"
                    placeholder="Social share description"
                    value={seoData.ogDescription}
                    onChange={(e) => onChange('ogDescription', e.target.value)}
                />

                <Input
                    label="OG Image URL"
                    placeholder="https://example.com/image.jpg"
                    value={seoData.ogImage}
                    onChange={(e) => onChange('ogImage', e.target.value)}
                />

                <Group justify="flex-end" mt="md">
                    <Button
                        leftSection={<IconSparkles size={16} />}
                        onClick={onSave}
                        loading={loading}
                    >
                        Save SEO Settings
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
}