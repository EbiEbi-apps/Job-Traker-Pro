// FIX: Replaced placeholder content with a functional JobCard component.
// This component displays details for a single job application and provides action buttons.
import React from 'react';
import { JobApplication, Status } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import AddToCalendarButton from './AddToCalendarButton';

interface JobCardProps {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onArchive: (id: string) => void;
}

const statusColors: { [key in Status]: string } = {
  Applied: 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/30',
  Interviewing: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 border-yellow-500/30',
  Offered: 'bg-green-500/20 text-green-600 dark:text-green-300 border-green-500/30',
  Rejected: 'bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/30',
};

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete, onToggleFavorite, onArchive }) => {
  const { t } = useTranslations();
  const {
    id,
    company,
    jobTitle,
    status,
    applyDate,
    url,
    location,
    workLocation,
    interviewDate,
    isFavorite,
  } = job;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const showCalendarButton = interviewDate && status !== 'Rejected';

  return (
    <div className="relative bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-cyan-500/10 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 p-6 flex flex-col h-full">
       <button 
        onClick={() => onToggleFavorite(id)} 
        className="absolute top-4 right-4 p-1 text-slate-400 dark:text-slate-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
        title={t('jobcard.favorite.toggle')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isFavorite ? 'text-yellow-400' : ''}`} viewBox="0 0 20 20" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>

      <div className="flex-grow">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white pr-8">{jobTitle}</h3>
          <span className={`flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full ${statusColors[status]} border`}>
            {t(`status.${status}` as any)}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-md font-medium mb-1">{company}</p>
        {location && <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{location}{workLocation && ` (${t(`workLocation.${workLocation}` as any)})`}</p>}

        <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <p><span className="font-semibold text-slate-600 dark:text-slate-300">{t('jobcard.appliedOn')}:</span> {formatDate(applyDate)}</p>
            {interviewDate && <p className="font-semibold text-yellow-600 dark:text-yellow-300">{t('jobcard.interviewOn')}: {formatDate(interviewDate)}</p>}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
            {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-600" title={t('jobcard.viewPosting')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            )}
            {showCalendarButton && (
                <AddToCalendarButton date={interviewDate} title={`Interview: ${jobTitle} at ${company}`} location={location || ''} />
            )}
            <button
                onClick={() => onArchive(id)}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-600"
                title={t('jobcard.archive')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(job)} className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-md transition-colors">{t('jobcard.edit')}</button>
          <button onClick={() => onDelete(id)} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors">{t('jobcard.delete')}</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;