import React from 'react';

function AlertModal({isOpen, onClose, message, handleOk}){
    if(!isOpen){
        return null;
    }
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg w-full md:w-2/6 sm:w-full flex flex-col">
                <div className="flex flex-col h-full rounded-2xl p-4">
                <h2 className='h2 font-bold dark:text-gray-300 py-2'>{message}</h2>
                    <div className="flex gap-2 mt-6 justify-end px-3 sticky bottom-0 bg-white border-top dark:bg-gray-700 p-2">
                    <button
                        onClick={onClose}
                        type="button"
                        className="border border-black rounded-lg px-3 py-2 hover:bg-gray-50 text-gray-900 dark:bg-blue-200 dark:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                    onClick={handleOk}
                        className="border rounded-lg px-3 py-2 bg-gray-800 text-white dark:bg-blue-200 dark:text-gray-800"
                    >
                        OK
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertModal;