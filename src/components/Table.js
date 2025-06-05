import React from 'react'
import { useEffect } from 'react'

const Table = ({ description, quantity, price, amount, list, total, setTotal, isDarkMode }) => {
  useEffect(() => {
    const calculateTotal = () => {
      const sum = list.reduce((acc, item) => acc + item.amount, 0);
      setTotal(sum); 
    };

    calculateTotal();
  }, [list, setTotal]);

  return (
    <section className={`mt-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Items</h2>
      <table className={`w-full ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <thead>
          <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-right">Quantity</th>
            <th className="py-2 px-4 text-right">Price</th>
            <th className="py-2 px-4 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, description, quantity, price, amount }) => (
            <tr key={id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <td className="py-2 px-4">{description}</td>
              <td className="py-2 px-4 text-right">{quantity}</td>
              <td className="py-2 px-4 text-right">${price}</td>
              <td className="py-2 px-4 text-right">${amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} font-semibold`}>
            <td colSpan="3" className="py-2 px-4 text-right">Total:</td>
            <td className="py-2 px-4 text-right">${total}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}

export default Table