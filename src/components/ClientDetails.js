import React from 'react'

const ClientDetails = ({clientName, clientAddress, clientEmail}) => {
  return (
   <>
    <section className='mt-10'>
      <h2 className='text-xl uppercase font-bold'>{clientName}</h2>
      <p>{clientAddress}</p>
      <p>{clientEmail}</p>
    </section>
   </>
  )
}

export default ClientDetails