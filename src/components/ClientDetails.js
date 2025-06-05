import React from 'react'

const ClientDetails = ({clientName, clientAddress, isDarkMode}) => {
  return (
   <>
    <section className={`mt-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bill To:</h2>
      <ul className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <li className="font-bold">{clientName}</li>
        <li>{clientAddress}</li>
      </ul>
    </section>
   </>
  )
}

export default ClientDetails