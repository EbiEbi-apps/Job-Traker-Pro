import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { language } = useTranslations();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const locale = language === 'id' ? 'id-ID' : 'en-US';
  const formattedDate = currentTime.toLocaleDateString(locale, dateOptions);
  const formattedTime = currentTime.toLocaleTimeString(locale);

  return (
    <div className="text-center mb-6">
      <p className="text-lg font-semibold text-slate-600 dark:text-slate-300 transition-colors duration-300">
        {formattedDate}
      </p>
      <p className="text-3xl font-bold text-slate-800 dark:text-white tracking-wider transition-colors duration-300">
        {formattedTime}
      </p>
    </div>
  );
};

export default Clock;
