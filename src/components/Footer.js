import React from 'react'

const Footer = ({ name, email, phone, bankName, bankAcoount, website }) => {
  return (
    <>
      <footer className='footer border-t-2 border-grey-300 pt-5 '>
        <ul className='flex flex-wrap items-center justify-between'>
          <li> <span className='font-bold '>Name: </span> {name}</li>
          <li> <span className='font-bold'>Email:</span>{email}</li>
          <li> <span className='font-bold'>Phone-No:</span>{phone}</li>
          <li> <span className='font-bold'>Bank:</span>{bankName}</li>
          <li> <span className='font-bold'>Account holder:</span>{name}</li>
          <li> <span className='font-bold'>Account number:</span>{bankAcoount}</li>
          <li> <span className='font-bold'>website:</span>
            <a href={website} target='_blank' rel='noopenner noreferrer'>{website}</a>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default Footer