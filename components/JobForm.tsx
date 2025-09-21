// FIX: Replaced placeholder content with a functional JobForm component.
// This form is used for both creating and editing job applications within a modal.
import React, { useState, useEffect } from 'react';
import { JobApplication, Status, WorkLocation, EmploymentType } from '../types';
import Modal from './Modal';
import { useTranslations } from '../hooks/useTranslations';
import { locations } from '../data/locations';

interface JobFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: JobApplication) => void;
  jobToEdit?: JobApplication | null;
}

const initialFormState: Omit<JobApplication, 'id'> = {
  company: '',
  jobTitle: '',
  status: 'Applied',
  applyDate: new Date().toISOString().split('T')[0],
  url: '',
  location: '',
  workLocation: 'On-site',
  employmentType: 'Full-time',
  notes: '',
  interviewDate: '',
};

const JobForm: React.FC<JobFormProps> = ({ isOpen, onClose, onSubmit, jobToEdit }) => {
  const { t } = useTranslations();
  const [formState, setFormState] = useState(initialFormState);
  const [selectedProvince, setSelectedProvince] = useState('');

  const provinceOptions = locations.map(p => p.name);
  const regencyOptions = locations.find(p => p.name === selectedProvince)?.regencies || [];

  useEffect(() => {
    if (jobToEdit) {
      const [regency, province] = jobToEdit.location?.split(', ') || ['', ''];
      const foundProvince = locations.find(p => p.regencies.includes(regency))?.name || '';

      setFormState({
        company: jobToEdit.company,
        jobTitle: jobToEdit.jobTitle,
        status: jobToEdit.status,
        applyDate: jobToEdit.applyDate,
        url: jobToEdit.url || '',
        location: regency,
        workLocation: jobToEdit.workLocation || 'On-site',
        employmentType: jobToEdit.employmentType || 'Full-time',
        notes: jobToEdit.notes || '',
        interviewDate: jobToEdit.interviewDate || '',
      });
      setSelectedProvince(province || foundProvince);
    } else {
      setFormState(initialFormState);
      setSelectedProvince('');
    }
  }, [jobToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setFormState(prevState => ({ ...prevState, location: '' })); // Reset city on province change
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formState,
      id: jobToEdit?.id || new Date().toISOString(),
      location: formState.location ? `${formState.location}, ${selectedProvince}` : '',
    });
    onClose();
  };

  const statuses: Status[] = ['Applied', 'Interviewing', 'Offered', 'Rejected'];
  const workLocations: WorkLocation[] = ['On-site', 'Hybrid', 'Remote'];
  const employmentTypes: EmploymentType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 transition-colors duration-300">{jobToEdit ? t('jobform.title.edit') : t('jobform.title.add')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form fields */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.company')}</label>
            <input type="text" name="company" value={formState.company} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.jobTitle')}</label>
            <input type="text" name="jobTitle" value={formState.jobTitle} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.status')}</label>
            <select name="status" value={formState.status} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
              {statuses.map(s => <option key={s} value={s}>{t(`status.${s}` as any)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="applyDate" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.applyDate')}</label>
            <input type="date" name="applyDate" value={formState.applyDate} onChange={handleChange} required className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="url" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.url')}</label>
            <input type="url" name="url" value={formState.url} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
          </div>
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.province')}</label>
            <select name="province" value={selectedProvince} onChange={handleProvinceChange} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
                <option value="">{t('jobform.province.select')}</option>
                {provinceOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.regency')}</label>
            <select name="location" value={formState.location} onChange={handleChange} disabled={!selectedProvince} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50">
                <option value="">{t('jobform.regency.select')}</option>
                {regencyOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="workLocation" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.workLocation')}</label>
            <select name="workLocation" value={formState.workLocation} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
              {workLocations.map(wl => <option key={wl} value={wl}>{t(`workLocation.${wl}` as any)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="employmentType" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.employmentType')}</label>
            <select name="employmentType" value={formState.employmentType} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
              {employmentTypes.map(et => <option key={et} value={et}>{t(`employmentType.${et}` as any)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="interviewDate" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.interviewDate')}</label>
            <input type="date" name="interviewDate" value={formState.interviewDate} onChange={handleChange} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"/>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1 transition-colors duration-300">{t('jobform.notes')}</label>
            <textarea name="notes" value={formState.notes} onChange={handleChange} rows={4} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md p-2 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold text-slate-700 dark:text-white transition-colors">{t('jobform.close')}</button>
          <button type="submit" className="px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold text-white shadow-md shadow-cyan-500/20 transition-colors">{jobToEdit ? t('jobform.save') : t('jobform.add')}</button>
        </div>
      </form>
    </Modal>
  );
};

export default JobForm;