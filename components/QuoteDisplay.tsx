import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const QuoteDisplay: React.FC = () => {
  const { t } = useTranslations();
  const [quote, setQuote] = useState({ text: '', source: '' });

  useEffect(() => {
    const quotes = t('quotes');
    const getRandomQuote = () => {
        if (Array.isArray(quotes) && quotes.length > 0) {
            return quotes[Math.floor(Math.random() * quotes.length)];
        }
        return { text: '', source: '' };
    }
    
    setQuote(getRandomQuote());

    const intervalId = setInterval(() => {
        setQuote(getRandomQuote());
    }, 30000); // Change quote every 30 seconds

    return () => clearInterval(intervalId);
  }, [t]);

  if (!quote.text) return null;

  return (
    <div className="mt-12 text-center px-4">
        <p className="text-slate-600 dark:text-slate-300 italic text-lg transition-colors duration-300">"{quote.text}"</p>
        <p className="text-cyan-600 dark:text-cyan-400 mt-2 text-sm font-semibold transition-colors duration-300">- {quote.source}</p>
    </div>
  );
};

export default QuoteDisplay;
