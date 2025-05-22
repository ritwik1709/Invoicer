// import { list } from 'postcss'
import React, { useState } from 'react'
import { v4 } from 'uuid'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const TableForm = ({ description, setDescription, quantity, setQuantity, price, setPrice, amount, setAmount, list, setList }) => {

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
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <div className='flex flex-col mt-16'>
                    <label htmlFor="description"> Item Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder='item description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className='md:grid grid-cols-3 gap-10'>
                    <div className='flex flex-col'>
                        <label htmlFor="quantity"> Quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            placeholder='quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            placeholder='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="amount"> Amount</label>
                        {
                            calcAmount(quantity, price) !== "" ? <p className='bg-gray-100 rounded mb-5 p-1 font-bold' >{amount}</p> : <p>{0}</p>
                        }
                    </div>
                </div>
                <button className='mb-10 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300' type='submit'> Add Item</button>
            </form>

            {/*showing table items */}
            <table width={"100%"} className='mb-16'>
                <thead>
                    <tr className='bg-gray-100 p-1 font-bold'>
                        <td>Description</td>
                        <td>Quantity</td>
                        <td>Price</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                {
                    list.map(({ id, description, quantity, price, amount }) => {
                        return (
                            <React.Fragment key={id}>
                                <tbody>
                                    <tr className='mb-4'>
                                        <td>{description}</td>
                                        <td>{quantity}</td>
                                        <td>{price}</td>
                                        <td>{amount}</td>
                                        <td className='flex gap-5'> 
                                            <button onClick={() => deleteRow(id)} className='font-bold bg-red-100 flex justify-center items-center p-1 px-2 rounded gap-1 hover:bg-red-300 transition duration-700 ease-in-out' ><AiFillDelete className='text-red-500 ' />Delete</button>

                                            <button onClick={() => editRow(id)} className='font-bold bg-green-100 flex p-1 px-2 rounded justify-center items-center gap-1  hover:bg-green-300 transition duration-700 ease-in-out'><AiFillEdit className='text-green-700' />Edit</button>
                                        </td>
                                      

                                    </tr>
                                </tbody>
                            </React.Fragment>
                        )


                    })
                }
            </table>
        </>
    )
}

export default TableForm