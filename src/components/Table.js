import React from 'react'
import { useEffect } from 'react'

const Table = ({ description, quantity, price, amount, list, total, setTotal }) => {
  useEffect(() => {
    const calculateTotal = () => {
      const sum = list.reduce((acc, item) => acc + item.amount, 0);
      setTotal(sum); 
    };

    calculateTotal();
  }, [list, setTotal]);

  return (
    <>
      <table width={"100%"}>
        <thead>
          <tr className='bg-gray-100 p-1 font-bold'>
            <td>Description</td>
            <td>Quantity</td>
            <td>Price</td>
            <td className='amount'>Amount</td>
          </tr>
        </thead>
        {
          list.map(({ id, description, quantity, price, amount }) => {
            return (
              <React.Fragment key={id}>
                <tbody>
                  <tr>
                    <td>{description}</td>
                    <td>{quantity}</td>
                    <td>{price}</td>
                    <td>{amount}</td>
                  </tr>
                </tbody>
              </React.Fragment>
            )
          })
        }
      </table>
      <div className='mt-2 '>
        <p className=' flex items-end justify-end w-4/5'><span className='font-bold mr-1'>Total:</span> { total}</p>
      </div>
    </>
  )
}

export default Table