import React from 'react'

const MainDetails = ({ name, address }) => {
  return (
    <>
      <section className='flex items-end flex-col justify-end mt-14'>
        <h2 className='text-xl uppercase font-bold'>{name}</h2>
        <p>{address}</p>
      </section>
    </>
  )
}

export default MainDetails