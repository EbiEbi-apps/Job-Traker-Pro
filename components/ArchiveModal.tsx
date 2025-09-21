import React from 'react';
import { JobApplication } from '../types';
import Modal from './Modal';
import { useTranslations } from '../hooks/useTranslations';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: JobApplication[];
  onUnarchive: (id: string) => void;
}

const ArchiveModal: React.FC<ArchiveModalProps> = ({ isOpen, onClose, jobs, onUnarchive }) => {
  const { t } = useTranslations();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">{t('archivemodal.title')}</h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map(job => (
              <div key={job.id} className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">{job.jobTitle}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{job.company}</p>
                </div>
                <button 
                  onClick={() => onUnarchive(job.id)}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-white bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 rounded-md transition-colors"
                >
                  {t('jobcard.unarchive')}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 py-8">{t('joblist.empty.title')}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ArchiveModal;
