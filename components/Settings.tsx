import React from 'react';
import Modal from './Modal';
import { useTheme } from '../hooks/useTheme';
import { useTranslations } from '../hooks/useTranslations';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
  onLogout: () => void;
  onExportData: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, onResetData, onLogout, onExportData }) => {
  const { t, language, setLanguage } = useTranslations();
  const { theme, setTheme } = useTheme();
  
  const themeOptions = [
      { id: 'light', label: t('settings.theme.light'), icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95l.707-.707a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg> },
      { id: 'dark', label: t('settings.theme.dark'), icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg> },
      { id: 'system', label: t('settings.theme.system'), icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0h10v8H5V5zm0 2h10v1H5V7z" clipRule="evenodd" /></svg> },
  ] as const;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">{t('settings.title')}</h2>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-200 dark:hover:bg-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        
        {/* Appearance Settings */}
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3">{t('settings.appearance')}</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 transition-colors duration-300">{t('settings.theme')}</label>
                    <div className="flex gap-2 rounded-lg bg-slate-200 dark:bg-slate-700 p-1">
                        {themeOptions.map(opt => (
                            <button key={opt.id} onClick={() => setTheme(opt.id)} className={`flex-1 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2 ${theme === opt.id ? 'bg-cyan-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                                {opt.icon}
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 transition-colors duration-300">{t('settings.language.title')}</label>
                  <div className="flex gap-2">
                    <button onClick={() => setLanguage('en')} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md transition-colors ${language === 'en' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                      <svg width="24" height="18" viewBox="0 0 72 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H72V54H0V0Z" fill="#012169"></path><path d="M0 0L72 54" stroke="white" strokeWidth="6"></path><path d="M72 0L0 54" stroke="white" strokeWidth="6"></path><path d="M0 0L72 54" stroke="#C8102E" strokeWidth="4"></path><path d="M72 0L0 54" stroke="#C8102E" strokeWidth="4"></path><path d="M36 0V54" stroke="white" strokeWidth="10"></path><path d="M0 27H72" stroke="white" strokeWidth="10"></path><path d="M36 0V54" stroke="#C8102E" strokeWidth="6"></path><path d="M0 27H72" stroke="#C8102E" strokeWidth="6"></path></svg>
                      English
                    </button>
                    <button onClick={() => setLanguage('id')} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md transition-colors ${language === 'id' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                      <svg width="24" height="18" viewBox="0 0 72 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H72V27H0V0Z" fill="#CE1126"></path><path d="M0 27H72V54H0V27Z" fill="white"></path></svg>
                      Indonesia
                    </button>
                  </div>
                </div>
            </div>
        </div>
        
        {/* Data Management */}
        <div>
            <h3 className="text-lg font-semibold text-red-500 dark:text-red-400 mb-3">{t('settings.reset.title')}</h3>
            <div className="space-y-4">
               <div>
                  <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('settings.export.title')}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{t('settings.export.description')}</p>
                  <button onClick={onExportData} className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 font-semibold text-white shadow-md shadow-green-500/20 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                    {t('settings.export.button')}
                  </button>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{t('settings.reset.button')}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{t('settings.reset.description')}</p>
                <button onClick={onResetData} className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 font-semibold text-white shadow-md shadow-red-500/20 transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm10 10a1 1 0 01-1 1v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 01-1 1z" clipRule="evenodd" /></svg>
                    {t('settings.reset.button')}
                </button>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <button onClick={onLogout} className="w-full px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold text-slate-700 dark:text-white transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
                    {t('settings.logout.button')}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">Copyright Febri</p>
        </div>

      </div>
    </Modal>
  );
};

export default Settings;