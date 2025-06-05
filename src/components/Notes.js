import React from 'react'

const Notes = ({ notes, isDarkMode }) => {
  return (
    <section className={`mt-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notes</h2>
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        {notes || 'No additional notes provided.'}
      </div>
    </section>
  )
}

export default Notes