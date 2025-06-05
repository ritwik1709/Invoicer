import React, { useState } from 'react'
import { v4 } from 'uuid'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const TableForm = ({ 
  description, setDescription, 
  quantity, setQuantity, 
  price, setPrice, 
  amount, setAmount, 
  list, setList,
  isDarkMode 
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const calcAmount = (quantity, price) => {
        setAmount(quantity * price)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            id: v4(),
            description: description,
            quantity: quantity,
            price: price,
            amount: amount
        }
        setDescription("");
        setQuantity("");
        setPrice("");
        setAmount("");

        setList([...list, newItem])
    }

    const deleteRow = (id) => {
        setList(list.filter((row) => row.id !== id))
    }

    const editRow = (id) => {
        const editingRow = list.find((row) => row.id === id);
        setIsEditing(true);
        setDescription(editingRow.description);
        setQuantity(editingRow.quantity);
        setPrice(editingRow.price);

        setList(list.filter((row) => row.id !== id))
    }

    const inputClasses = `mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
        isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'border-gray-300'
    }`;

    const labelClasses = isDarkMode ? 'text-gray-300' : 'text-gray-700';

    const tableClasses = isDarkMode 
        ? 'w-full mb-16 text-gray-200 bg-gray-800'
        : 'w-full mb-16 text-gray-600 bg-white';

    const headerClasses = isDarkMode
        ? 'bg-gray-700 text-white p-1 font-bold'
        : 'bg-gray-100 text-gray-900 p-1 font-bold';

    const rowClasses = isDarkMode
        ? 'border-gray-700 hover:bg-gray-700'
        : 'border-gray-200 hover:bg-gray-50';

    const cellClasses = isDarkMode
        ? 'py-2 px-4 text-gray-200'
        : 'py-2 px-4 text-gray-700';

    return (
        <>
            <form action="" onSubmit={handleSubmit} className="space-y-6">
                <div className='flex flex-col'>
                    <label htmlFor="description" className={labelClasses}>Item Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder='Item description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={inputClasses}
                    />
                </div>

                <div className='md:grid grid-cols-3 gap-10'>
                    <div className='flex flex-col'>
                        <label htmlFor="quantity" className={labelClasses}>Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            placeholder='Quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="price" className={labelClasses}>Price</label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={inputClasses}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="amount" className={labelClasses}>Amount</label>
                        <div className={`mt-1 block w-full rounded-md p-2 ${
                            isDarkMode 
                                ? 'bg-gray-700 text-white' 
                                : 'bg-gray-100 text-gray-900'
                        }`}>
                            {calcAmount(quantity, price) !== "" ? amount : 0}
                        </div>
                    </div>
                </div>
                <button 
                    className={`mb-10 font-bold py-2 px-8 rounded shadow border-2 transition-all duration-300 ${
                        isDarkMode
                            ? 'bg-blue-600 text-white border-blue-600 hover:bg-transparent hover:text-blue-400'
                            : 'bg-blue-500 text-white border-blue-500 hover:bg-transparent hover:text-blue-500'
                    }`} 
                    type='submit'
                >
                    Add Item
                </button>
            </form>

            <table className={tableClasses}>
                <thead>
                    <tr className={headerClasses}>
                        <td className="py-2 px-4">Description</td>
                        <td className="py-2 px-4">Quantity</td>
                        <td className="py-2 px-4">Price</td>
                        <td className="py-2 px-4">Amount</td>
                        <td className="py-2 px-4">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(({ id, description, quantity, price, amount }) => (
                        <tr key={id} className={`${rowClasses} border-b transition-colors duration-200`}>
                            <td className={cellClasses}>{description}</td>
                            <td className={cellClasses}>{quantity}</td>
                            <td className={cellClasses}>${price}</td>
                            <td className={cellClasses}>${amount}</td>
                            <td className={cellClasses}>
                                <div className='flex gap-5'>
                                    <button 
                                        onClick={() => deleteRow(id)} 
                                        className={`font-bold flex justify-center items-center p-1 px-2 rounded gap-1 transition duration-300 ${
                                            isDarkMode
                                                ? 'bg-red-900 text-red-200 hover:bg-red-800 hover:text-red-100'
                                                : 'bg-red-100 text-red-500 hover:bg-red-300 hover:text-red-700'
                                        }`}
                                    >
                                        <AiFillDelete className='mr-1' />Delete
                                    </button>
                                    <button 
                                        onClick={() => editRow(id)} 
                                        className={`font-bold flex p-1 px-2 rounded justify-center items-center gap-1 transition duration-300 ${
                                            isDarkMode
                                                ? 'bg-green-900 text-green-200 hover:bg-green-800 hover:text-green-100'
                                                : 'bg-green-100 text-green-700 hover:bg-green-300 hover:text-green-900'
                                        }`}
                                    >
                                        <AiFillEdit className='mr-1' />Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableForm; 