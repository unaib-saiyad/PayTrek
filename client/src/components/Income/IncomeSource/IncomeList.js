import React from 'react'

function IncomeList({data}) {
    return (
        <div className='px-2 h-[50vh] overflow-auto'>
            <table className="w-full border-collapse">
                <thead className='sticky top-0 bg-white'>
                    <tr className="border-b">
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Amount</th>
                        <th className="text-left py-2">Frequency</th>
                        <th className="text-left py-2">Start Date</th>
                        <th className="text-left py-2">End Date</th>
                        <th className="text-left py-2 w-40">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item=>{
                        return <tr className="border-b" key={item._id}>
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">{item.amount}</td>
                        <td className="py-2">{item.frequency}</td>
                        <td className="py-2">{new Date(item.startDate).toLocaleDateString()}</td>
                        <td className="py-2">{new Date(item.endDate).toLocaleDateString()}</td>
                        <td className="py-2">
                            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                                View
                            </button>
                            <button className="ml-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default IncomeList