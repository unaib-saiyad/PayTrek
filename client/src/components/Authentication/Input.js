import React from 'react'

function Input({placeholder, type, Icon, onChange }) {
    return (
        <div className="flex flex-col text-gray-700 dark:text-gray-300 gap-1 mt-3">
            <div className="relative w-full">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
                <input
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    )
}

export default Input