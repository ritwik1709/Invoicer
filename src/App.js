import './App.css';
import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Notes from './components/Notes';
import Table from './components/Table';
import Header from './components/Header';
import MainDetails from './components/MainDetails';
import ClientDetails from './components/ClientDetails';
import Dates from './components/Dates';
import TableForm from './components/TableForm';
import OAuthCallback from './components/OAuthCallback';
// import ReactToPrint from 'react-to-print';

function App() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAcoount, setBankAccount] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const invoiceRef = useRef();

  return (
    <Router>
      <Routes>
        <Route path="/oauth2callback" element={<OAuthCallback />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50 py-8">
            <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
              {/* <ReactToPrint
                trigger={() => <button>Print</button>}
                content={() => componentRef.current}
              /> */}
              {showInvoice ? (
                <div ref={invoiceRef} className="bg-white rounded-lg shadow-lg p-8">
                  <Header 
                    invoiceRef={invoiceRef} 
                    dealerEmail={email}
                    invoiceNumber={invoiceNumber}
                    invoiceDate={invoiceDate}
                    dueDate={dueDate}
                    total={total}
                  />
                  <MainDetails name={name} address={address} />
                  <ClientDetails clientName={clientName} clientAddress={clientAddress} />
                  <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} />
                  <Table description={description} quantity={quantity} price={price} amount={amount} list={list} total={total} setTotal={setTotal} />
                  <Notes notes={notes} />
                  <Footer name={name} email={email} phone={phone} bankName={bankName} bankAcoount={bankAcoount} website={website} />

                  <div className="mt-8 flex justify-center">
                    <button 
                      className='bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg shadow-sm border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 no-print'
                      onClick={() => setShowInvoice(false)}
                    >
                      Edit Information
                    </button>
                  </div>
                </div>
              ) : (
                <div className="invoice-form">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Create New Invoice</h2>
                  
                  <div className="space-y-8">
                    <article className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='flex flex-col'>
                        <label htmlFor="name">Your Name</label>
                        <input 
                          type='text' 
                          name='name' 
                          id='name' 
                          autoComplete='off'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder='Enter your name'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="address">Your Address</label>
                        <input 
                          type='text' 
                          name='address' 
                          id='address' 
                          autoComplete='off'
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder='Enter your address'
                        />
                      </div>
                    </article>

                    <article className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                      <div className='flex flex-col'>
                        <label htmlFor="email">Your Email</label>
                        <input 
                          type='email' 
                          name='email' 
                          id='email' 
                          autoComplete='off'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='your.email@example.com'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="phone">Your Phone</label>
                        <input 
                          type='text' 
                          name='phone' 
                          id='phone' 
                          autoComplete='off'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder='+91-XXXXXXXXXX'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="website">Your Website</label>
                        <input 
                          type='text' 
                          name='website' 
                          id='website' 
                          autoComplete='off'
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder='www.example.com'
                        />
                      </div>
                    </article>

                    <article className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='flex flex-col'>
                        <label htmlFor="bankName">Bank Name</label>
                        <input 
                          type='text' 
                          name='bankName' 
                          id='bankName' 
                          autoComplete='off'
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          placeholder='Enter bank name'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="bankAccount">Bank Account Number</label>
                        <input 
                          type='text' 
                          name='bankAccount' 
                          id='bankAccount' 
                          autoComplete='off'
                          value={bankAcoount}
                          onChange={(e) => setBankAccount(e.target.value)}
                          placeholder='Enter account number'
                        />
                      </div>
                    </article>

                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Client Information</h3>
                      <article className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex flex-col'>
                          <label htmlFor="clientName">Client Name</label>
                          <input 
                            type='text' 
                            name='clientName' 
                            id='clientName' 
                            autoComplete='off'
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder='Enter client name'
                          />
                        </div>
                        <div className='flex flex-col'>
                          <label htmlFor="clientAddress">Client Address</label>
                          <input 
                            type='text' 
                            name='clientAddress' 
                            id='clientAddress' 
                            autoComplete='off'
                            value={clientAddress}
                            onChange={(e) => setClientAddress(e.target.value)}
                            placeholder='Enter client address'
                          />
                        </div>
                      </article>
                    </div>

                    <article className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                      <div className='flex flex-col'>
                        <label htmlFor="invoiceNumber">Invoice Number</label>
                        <input 
                          type='text' 
                          name='invoiceNumber' 
                          id='invoiceNumber' 
                          autoComplete='off'
                          value={invoiceNumber}
                          onChange={(e) => setInvoiceNumber(e.target.value)}
                          placeholder='INV-001'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="invoiceDate">Invoice Date</label>
                        <input 
                          type='date' 
                          name='invoiceDate' 
                          id='invoiceDate' 
                          autoComplete='off'
                          value={invoiceDate}
                          onChange={(e) => setInvoiceDate(e.target.value)}
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="dueDate">Due Date</label>
                        <input 
                          type='date' 
                          name='dueDate' 
                          id='dueDate' 
                          autoComplete='off'
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                    </article>

                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoice Items</h3>
                      <TableForm
                        description={description} setDescription={setDescription}
                        quantity={quantity} setQuantity={setQuantity}
                        price={price} setPrice={setPrice}
                        amount={amount} setAmount={setAmount}
                        list={list} setList={setList}
                      />
                    </div>

                    <div className='flex flex-col'>
                      <label htmlFor="notes">Additional Notes</label>
                      <textarea
                        name='notes'
                        id='notes'
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder='Enter any additional notes or terms here...'
                        className="resize-none"
                      />
                    </div>

                    <div className="flex justify-center">
                      <button 
                        onClick={() => setShowInvoice(true)} 
                        className='bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-sm border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300'
                      >
                        Preview Invoice
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;









