import React from 'react';
import { JobApplication } from '../types';
import JobCard from './JobCard';
import { useTranslations } from '../hooks/useTranslations';

interface JobListProps {
  jobs: JobApplication[];
  onEdit: (job: JobApplication) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onArchive: (id: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onEdit, onDelete, onToggleFavorite, onArchive }) => {
  const { t } = useTranslations();

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20 px-6 bg-slate-100 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 transition-colors duration-300">
        <svg className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-xl font-semibold text-slate-800 dark:text-white transition-colors duration-300">{t('joblist.empty.title')}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">{t('joblist.empty.subtitle')}</p>
      </div>
    );
  }

  // Sort jobs: favorites first, then by application date (newest first)
  const sortedJobs = [...jobs].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return new Date(b.applyDate).getTime() - new Date(a.applyDate).getTime();
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedJobs.map((job, index) => (
        <div 
          key={job.id} 
          className="animate-fade-in-up" 
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
        >
          <JobCard job={job} onEdit={onEdit} onDelete={onDelete} onToggleFavorite={onToggleFavorite} onArchive={onArchive} />
        </div>
      ))}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default JobList;