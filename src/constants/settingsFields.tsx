import { LockKeyhole, SunMoon, User2 } from "lucide-react";
import React from "react";

// تعريف نوع لحقول الإعدادات
interface SettingsField {
    href: string;
    icon: JSX.Element; // استخدم JSX.Element كنوع
    title: string;
}

// مصفوفة حقول الإعدادات
export const settingsFields: SettingsField[] = [
    {
        href: 'dashboard/settings',
        icon: <User2 size={20} />, // قيمة
        title: "SETTINGS.ACCOUNT",
    },
    {
        href: 'dashboard/settings/security',
        icon: <LockKeyhole size={20} />, // قيمة
        title: "SETTINGS.SECURITY",
    },
    {
        href: "/dashboard/settings/theme",
        icon: <SunMoon size={20} />, 
        // قيمة
        title: "SETTINGS.THEME",
    },
];