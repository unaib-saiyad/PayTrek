import React from 'react'
import { Link } from "react-router-dom";
function LinkItem({href, icon:Icon, text, badge}) {
  return (
    <li>
        <Link to={href} className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700'>
            <Icon className='mr-3 ' />
            <span className='flex-1 me-3'>{text}</span>
            {
                badge && (
                <span className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium
                rounded-full ${badge.color} ${badge.darkColor} `}>{badge.text}</span>
                )
            }
        </Link>
    </li>
  )
}

export default LinkItem