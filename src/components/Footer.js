import React from 'react'

const Footer = ({ name, email, phone, bankName, bankAcoount, website, isDarkMode }) => {
  return (
    <footer className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h2>
          <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li><span className="font-semibold">Name:</span> {name}</li>
            <li><span className="font-semibold">Email:</span> {email}</li>
            <li><span className="font-semibold">Phone:</span> {phone}</li>
            {website && <li><span className="font-semibold">Website:</span> {website}</li>}
          </ul>
        </div>
        {(bankName || bankAcoount) && (
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bank Details</h2>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {bankName && <li><span className="font-semibold">Bank Name:</span> {bankName}</li>}
              {bankAcoount && <li><span className="font-semibold">Account Number:</span> {bankAcoount}</li>}
            </ul>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer