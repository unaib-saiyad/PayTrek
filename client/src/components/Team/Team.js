import React from 'react'
import { users } from '../../constants'
import Title from '../../ui/Title'
import Member from './Member'

function Team() {
  return (
    <div className='bg-white p-3 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5'>
        <Title>Team</Title>
        {users.map((user, index)=>{
            return <Member key={index} user={user}/>
        })}
    </div>
  )
}

export default Team