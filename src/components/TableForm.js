import React, { useState } from 'react';

const TableForm = ({ 
  items, 
  setItems, 
  isDarkMode 
}) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const addItem = () => {
    if (!description || !quantity || !price) {
      alert("Please fill all fields!");
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      quantity: parseFloat(quantity),
      rate: parseFloat(price),
      amount: (parseFloat(quantity) * parseFloat(price)).toFixed(2)
    };

    setItems([...items, newItem]);
    
    // Clear form
    setDescription("");
    setQuantity("");
    setPrice("");
    setAmount("");
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateAmount = (qty, prc) => {
    if (qty && prc) {
      setAmount((parseFloat(qty) * parseFloat(prc)).toFixed(2));
    } else {
      setAmount("");
    }
  };

  return (
    <div className={`mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Add Item Form */}
      <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add New Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Item description"
              className={`w-full p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                calculateAmount(e.target.value, price);
              }}
              placeholder="Quantity"
              className={`w-full p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                calculateAmount(quantity, e.target.value);
              }}
              placeholder="Price"
              className={`w-full p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 focus:border-blue-500'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="text"
              value={amount}
              readOnly
              className={`w-full p-2 border rounded-md ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-400' 
                  : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={addItem}
            className={`px-4 py-2 rounded-md ${
              isDarkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition-colors duration-200`}
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="p-2">{item.description}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.rate}</td>
                <td className="p-2">${item.amount}</td>
                <td className="p-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className={`px-3 py-1 rounded-md ${
                      isDarkMode 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    } transition-colors duration-200`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableForm; 