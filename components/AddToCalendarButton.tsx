

import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface AddToCalendarButtonProps {
  date: string;
  title: string;
  location: string;
}

const AddToCalendarButton: React.FC<AddToCalendarButtonProps> = ({ date, title, location }) => {
  const { t } = useTranslations();

  const handleAddToCalendar = () => {
    if (!date) return;

    // Google Calendar link format
    // Dates are in YYYYMMDDTHHMMSSZ format. We'll use an all-day event for simplicity.
    const startDate = new Date(date).toISOString().split('T')[0].replace(/-/g, '');
    const endDate = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/-/g, '');

    const calendarUrl = [
      'https://www.google.com/calendar/render?action=TEMPLATE',
      `&text=${encodeURIComponent(title)}`,
      `&dates=${startDate}/${endDate}`, // All day event
      `&location=${encodeURIComponent(location)}`,
      `&details=${encodeURIComponent(`Reminder for your interview: ${title}`)}`
    ].join('');

    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleAddToCalendar}
      disabled={!date}
      className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
      aria-label={t('button.addToCalendar')}
      title={t('button.addToCalendar')}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
            <line x1="12" x2="12" y1="14" y2="18"/>
            <line x1="10" x2="14" y1="16" y2="16"/>
        </svg>
    </button>
  );
};

export default AddToCalendarButton;
