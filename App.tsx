// FIX: Replaced placeholder content with the main App component logic.
// This component manages the application's state and renders the main layout and components.
import React, { useState } from 'react';
import { JobApplication, User } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import ConfirmationModal from './components/ConfirmationModal';
import Login from './components/Login';
import Settings from './components/Settings';
import Wallpaper from './components/Wallpaper';
import { useTranslations } from './hooks/useTranslations';
import { useWallpaperProvider, WallpaperContext } from './hooks/useWallpaper';
import QuoteDisplay from './components/QuoteDisplay';
import ArchiveModal from './components/ArchiveModal';
import Clock from './components/Clock';

const AppContent: React.FC = () => {
  const { t } = useTranslations();
  const [jobs, setJobs] = useLocalStorage<JobApplication[]>('jobs', []);
  const [user, setUser] = useLocalStorage<User | null>('user', null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<JobApplication | null>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);
  
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const handleAddJobClick = () => {
    setJobToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditJob = (job: JobApplication) => {
    setJobToEdit(job);
    setIsFormOpen(true);
  };

  const handleDeleteJob = (id: string) => {
    setJobIdToDelete(id);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (jobIdToDelete) {
      setJobs(jobs.filter(job => job.id !== jobIdToDelete));
      setJobIdToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };
  
  const handleArchiveJob = (id: string) => {
    setJobs(jobs.map(job => (job.id === id ? { ...job, isArchived: true } : job)));
  };

  const handleUnarchiveJob = (id: string) => {
    setJobs(jobs.map(job => (job.id === id ? { ...job, isArchived: false } : job)));
  };

  const handleResetData = () => {
      setIsResetModalOpen(true);
  }
  
  const handleLogout = () => {
    setUser(null);
    setIsSettingsOpen(false);
  }
  
  const handleExportData = () => {
    const headers = [
      "ID", "Company", "Job Title", "Status", "Apply Date", "URL",
      "Location", "Work Location", "Employment Type", "Interview Date", 
      "Is Favorite", "Is Archived", "Notes"
    ];

    const formatCsvField = (field: any) => {
      if (field === null || field === undefined) return '';
      const stringField = String(field);
      // If the field contains a comma, double quote, or newline, wrap it in double quotes.
      if (/[",\n]/.test(stringField)) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    };

    const csvRows = [
      headers.join(','),
      ...jobs.map(job => [
        formatCsvField(job.id),
        formatCsvField(job.company),
        formatCsvField(job.jobTitle),
        formatCsvField(job.status),
        formatCsvField(job.applyDate),
        formatCsvField(job.url),
        formatCsvField(job.location),
        formatCsvField(job.workLocation),
        formatCsvField(job.employmentType),
        formatCsvField(job.interviewDate),
        formatCsvField(job.isFavorite),
        formatCsvField(job.isArchived),
        formatCsvField(job.notes),
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'job_tracker_pro_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const confirmResetData = () => {
    setJobs([]);
    setIsResetModalOpen(false);
    setIsSettingsOpen(false);
  }

  const handleFormSubmit = (job: JobApplication) => {
    if (jobToEdit) {
      setJobs(jobs.map(j => j.id === job.id ? job : j));
    } else {
      setJobs([...jobs, job]);
    }
    setIsFormOpen(false);
    setJobToEdit(null);
  };
  
  const handleLoginComplete = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleToggleFavorite = (id: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
    ));
  };
  
  const activeJobs = jobs.filter(job => !job.isArchived);
  const archivedJobs = jobs.filter(job => job.isArchived);
  
  const filteredJobs = activeJobs.filter(job =>
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style>{`
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient {
          animation: gradient-animation 8s ease infinite;
          background-size: 300% 300%;
        }
      `}</style>

      <Wallpaper />
    
      {!user ? (
        <Login onComplete={handleLoginComplete} />
      ) : (
        <>
          <div className="relative text-slate-800 dark:text-white min-h-screen transition-colors duration-300">
            <header className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-300">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                <div className="flex-1">
                  {/* Spacer */}
                </div>
                <div className="flex-1 text-center">
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent animated-gradient">
                    Job Tracker Pro
                  </h1>
                </div>
                <div className="flex-1 flex justify-end items-center gap-2">
                  <button
                    onClick={handleAddJobClick}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold text-white shadow-md shadow-cyan-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    <span className="hidden sm:inline">{t('header.addJob')}</span>
                  </button>
                  <button
                    onClick={() => setIsArchiveOpen(true)}
                    className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-semibold transition-colors duration-300"
                    aria-label={t('header.archive')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-semibold transition-colors duration-300"
                    aria-label={t('header.settings')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                        {t('header.greeting')} {user?.name || ''}!
                    </h2>
                </div>

                <Clock />

                <div className="mb-6 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('dashboard.search.placeholder')}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                    </div>
                </div>

              <JobList jobs={filteredJobs} onEdit={handleEditJob} onDelete={handleDeleteJob} onToggleFavorite={handleToggleFavorite} onArchive={handleArchiveJob} />
              <QuoteDisplay />
            </main>
          </div>

          <JobForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleFormSubmit}
            jobToEdit={jobToEdit}
          />
          
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title={t('delete.confirm.title')}
            message={t('delete.confirm.message')}
            confirmButtonText={t('delete.confirm.button')}
          />

          <ConfirmationModal
            isOpen={isResetModalOpen}
            onClose={() => setIsResetModalOpen(false)}
            onConfirm={confirmResetData}
            title={t('resetmodal.title')}
            message={t('resetmodal.message')}
            confirmButtonText={t('resetmodal.confirm')}
          />

          <Settings 
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            onResetData={handleResetData}
            onLogout={handleLogout}
            onExportData={handleExportData}
          />
          
          <ArchiveModal
            isOpen={isArchiveOpen}
            onClose={() => setIsArchiveOpen(false)}
            jobs={archivedJobs}
            onUnarchive={handleUnarchiveJob}
          />
        </>
      )}
    </>
  );
}

function App() {
  const wallpaperState = useWallpaperProvider();
  return (
    <WallpaperContext.Provider value={wallpaperState}>
      <AppContent />
    </WallpaperContext.Provider>
  )
}

export default App;