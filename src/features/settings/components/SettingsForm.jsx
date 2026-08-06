

import React from 'react';
import { Button } from '../../../components/common';
import { GeneralSettings } from './GeneralSettings';
import { NotificationSettings } from './NotificationSettings';
import { SecuritySettings } from './SecuritySettings';
import { SmtpSettings } from './SmtpSettings';
import { ApiIntegrations } from './ApiIntegrations';
import { BackupMaintenance } from './BackupMaintenance';
import { settingsFormSchema, formatZodErrors } from '../../../utils/validators';

export function SettingsForm({ settings, updateSetting, onSave, loading, successMessage }) {
   
    const [errors, setErrors] = useState({});
    const [clientError, setClientError] = useState('');

    const handleSaveClick = () => {

        const validationErrors = formatZodErrors(settingsFormSchema, settings);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setClientError('Please fix the validation errors before saving.');
            return;
        }

        setErrors({});
        setClientError('');
        if (onSave) {
            onSave();
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium shadow-sm">
                    {successMessage}
                </div>
            )}

            {clientError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium shadow-sm">
                    {clientError}
                </div>
            )}

            <GeneralSettings settings={settings} updateSetting={updateSetting} errors={errors} />
            <NotificationSettings settings={settings} updateSetting={updateSetting} errors={errors} />
            <SecuritySettings settings={settings} updateSetting={updateSetting} errors={errors} />
            <SmtpSettings settings={settings} updateSetting={updateSetting} errors={errors} />
            <ApiIntegrations settings={settings} updateSetting={updateSetting} errors={errors} />
            <BackupMaintenance settings={settings} updateSetting={updateSetting} errors={errors} />

            {/* Global Save Button */}
            <div className="flex justify-end pb-10">
                <Button
                    color="violet"
                    variant="filled"
                    onClick={handleSaveClick}
                    disabled={loading}
                    className="px-6 py-2.5 text-base"
                >
                    {loading ? 'Saving Changes...' : 'Save All Changes'}
                </Button>
            </div>
        </div>
    );
}