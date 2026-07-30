

import React from 'react';
import { Button } from '../../../components/common';
import { GeneralSettings } from './GeneralSettings';
import { NotificationSettings } from './NotificationSettings';
import { SecuritySettings } from './SecuritySettings';
import { SmtpSettings } from './SmtpSettings';
import { ApiIntegrations } from './ApiIntegrations';
import { BackupMaintenance } from './BackupMaintenance';

export function SettingsForm({ settings, updateSetting, onSave, loading, successMessage }) {
    return (
        <div className="max-w-3xl mx-auto">
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium shadow-sm">
                    {successMessage}
                </div>
            )}

            <GeneralSettings settings={settings} updateSetting={updateSetting} />
            <NotificationSettings settings={settings} updateSetting={updateSetting} />
            <SecuritySettings settings={settings} updateSetting={updateSetting} />
            <SmtpSettings settings={settings} updateSetting={updateSetting} />
            <ApiIntegrations settings={settings} updateSetting={updateSetting} />
            <BackupMaintenance settings={settings} updateSetting={updateSetting} />

            {/* Global Save Button */}
            <div className="flex justify-end pb-10">
                <Button
                    color="violet"
                    variant="filled"
                    onClick={onSave}
                    disabled={loading}
                    className="px-6 py-2.5 text-base"
                >
                    {loading ? 'Saving Changes...' : 'Save All Changes'}
                </Button>
            </div>
        </div>
    );
}