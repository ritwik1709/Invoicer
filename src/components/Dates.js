import React from 'react'

const Dates = ({ invoiceNumber, invoiceDate, dueDate }) => {
  return (
    <>
      <article className='mt-10 flex items-end justify-end mb-20'>
        <ul>
          <li className='p-1'> <span className='font-bold'>Invoicer Number:</span> {invoiceNumber}</li>
          <li className='p-1'> <span className='font-bold'>Invoicer Date:</span> {invoiceDate}</li>
          <li className='p-1'> <span className='font-bold'>Due Date:</span> {dueDate}</li>
        </ul>
      </article>
    </>
  )
}

export default Dates