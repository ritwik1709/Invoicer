import React from 'react'

const Dates = ({ invoiceNumber, invoiceDate, dueDate, isDarkMode }) => {
  return (
    <section className={`mt-8 grid grid-cols-2 gap-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <div>
        <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Invoice Details</h2>
        <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <li>
            <span className="font-semibold">Invoice Number:</span> {invoiceNumber}
          </li>
          <li>
            <span className="font-semibold">Invoice Date:</span> {invoiceDate}
          </li>
          <li>
            <span className="font-semibold">Due Date:</span> {dueDate}
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Dates