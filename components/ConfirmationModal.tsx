

import React from 'react';
import Modal from './Modal';
import { useTranslations } from '../hooks/useTranslations';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, confirmButtonText }) => {
    const { t } = useTranslations();
    
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-8">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-500/20">
                        <svg className="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold leading-6 text-slate-800 dark:text-white" id="modal-title">
                        {title}
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {message}
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 font-semibold text-slate-700 dark:text-white transition-colors duration-200"
                    >
                       {t('button.cancel')}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-semibold text-white shadow-md shadow-red-500/20 transition-colors duration-200"
                    >
                        {confirmButtonText || t('delete.confirm.button')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
