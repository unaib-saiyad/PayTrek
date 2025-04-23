import React from 'react'

function Main({ isSidebarOpen, children }) {
  return (
    <div className={`text-gray-500 bg-gray-100 p-4 ${isSidebarOpen?'sm:ml-64':''} flex gap-5 lg:flex-row translate-all
    duration-300 mt-14 dark:bg-gray-800 flex-wrap-reverse`}>
        {children}</div>
  )
}

export default Main