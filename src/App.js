import './App.css';
import React, { useState, useRef, useEffect } from 'react';
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
import HomePage from './components/HomePage';
import ThemeToggle from './components/ThemeToggle';

// Invoice Form Component
const InvoiceForm = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAcoount, setBankAccount] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const invoiceRef = useRef();

  // Add new state for form validation
  const [formErrors, setFormErrors] = useState({});

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    // Business Details Validation
    if (!name.trim()) errors.name = "Business name is required";
    if (!address.trim()) errors.address = "Business address is required";
    if (!email.trim()) errors.email = "Business email is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
    if (!phone.trim()) errors.phone = "Phone number is required";
    if (phone && !/^\+?[\d\s-]{10,}$/.test(phone)) errors.phone = "Invalid phone number format";
    
    // Client Details Validation
    if (!clientName.trim()) errors.clientName = "Client name is required";
    if (!clientAddress.trim()) errors.clientAddress = "Client address is required";
    
    // Invoice Details Validation
    if (!invoiceNumber.trim()) errors.invoiceNumber = "Invoice number is required";
    if (!invoiceDate) errors.invoiceDate = "Invoice date is required";
    if (!dueDate) errors.dueDate = "Due date is required";
    
    // Items Validation
    if (list.length === 0) errors.items = "At least one item is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Modified preview handler
  const handlePreviewInvoice = () => {
    if (validateForm()) {
      setShowInvoice(true);
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className={`w-full min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
        <div className="max-w-4xl mx-auto">
          {showInvoice ? (
            <div ref={invoiceRef} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 transition-colors duration-200`}>
              <Header 
                invoiceRef={invoiceRef} 
                dealerEmail={email}
                invoiceNumber={invoiceNumber}
                invoiceDate={invoiceDate}
                dueDate={dueDate}
                total={total}
                isDarkMode={isDarkMode}
              />
              <MainDetails name={name} address={address} isDarkMode={isDarkMode} />
              <ClientDetails clientName={clientName} clientAddress={clientAddress} isDarkMode={isDarkMode} />
              <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} isDarkMode={isDarkMode} />
              <Table list={list} total={total} setTotal={setTotal} isDarkMode={isDarkMode} />
              <Notes notes={notes} isDarkMode={isDarkMode} />
              <Footer name={name} email={email} phone={phone} bankName={bankName} bankAcoount={bankAcoount} website={website} isDarkMode={isDarkMode} />

              <div className="mt-8 flex justify-center">
                <button 
                  className={`bg-blue-500 text-white font-semibold py-2 px-8 rounded-lg shadow-sm border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 ${isDarkMode ? 'dark:hover:text-blue-400 dark:border-blue-400 dark:bg-blue-600 dark:hover:bg-transparent' : ''} transition-all duration-300 no-print`}
                  onClick={() => setShowInvoice(false)}
                >
                  Edit Information
                </button>
              </div>
            </div>
          ) : (
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 transition-colors duration-200`}>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Create New Invoice</h2>
              
              <div className="space-y-8">
                <article className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className='flex flex-col'>
                    <label htmlFor="name" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Name <span className="text-red-500">*</span></label>
                    <input 
                      type='text' 
                      name='name' 
                      id='name' 
                      autoComplete='off'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Enter your name'
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } ${formErrors.name ? 'border-red-500' : ''}`}
                    />
                    {formErrors.name && <span className="error-message text-red-500 text-sm mt-1">{formErrors.name}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="address" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Address <span className="text-red-500">*</span></label>
                    <input 
                      type='text' 
                      name='address' 
                      id='address' 
                      autoComplete='off'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder='Enter your address'
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } ${formErrors.address ? 'border-red-500' : ''}`}
                    />
                    {formErrors.address && <span className="error-message text-red-500 text-sm mt-1">{formErrors.address}</span>}
                  </div>
                </article>

                <article className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className='flex flex-col'>
                    <label htmlFor="email" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Email <span className="text-red-500">*</span></label>
                    <input 
                      type='email' 
                      name='email' 
                      id='email' 
                      autoComplete='off'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='your.email@example.com'
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } ${formErrors.email ? 'border-red-500' : ''}`}
                    />
                    {formErrors.email && <span className="error-message text-red-500 text-sm mt-1">{formErrors.email}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="phone" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Phone <span className="text-red-500">*</span></label>
                    <input 
                      type='text' 
                      name='phone' 
                      id='phone' 
                      autoComplete='off'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='+91-XXXXXXXXXX'
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } ${formErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {formErrors.phone && <span className="error-message text-red-500 text-sm mt-1">{formErrors.phone}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="website" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Website</label>
                    <input 
                      type='text' 
                      name='website' 
                      id='website' 
                      autoComplete='off'
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder='www.example.com'
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                </article>

                <article className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className='flex flex-col'>
                    <label htmlFor="bankName" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bank Name</label>
                    <input 
                      type='text' 
                      name='bankName' 
                      id='bankName' 
                      autoComplete='off'
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder='Enter bank name'
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="bankAccount" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bank Account Number</label>
                    <input 
                      type='text' 
                      name='bankAccount' 
                      id='bankAccount' 
                      autoComplete='off'
                      value={bankAcoount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder='Enter account number'
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>
                </article>

                <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Client Information</h3>
                  <article className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className='flex flex-col'>
                      <label htmlFor="clientName" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Client Name <span className="text-red-500">*</span></label>
                      <input 
                        type='text' 
                        name='clientName' 
                        id='clientName' 
                        autoComplete='off'
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder='Enter client name'
                        className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'border-gray-300'
                        } ${formErrors.clientName ? 'border-red-500' : ''}`}
                      />
                      {formErrors.clientName && <span className="error-message text-red-500 text-sm mt-1">{formErrors.clientName}</span>}
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor="clientAddress" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Client Address <span className="text-red-500">*</span></label>
                      <input 
                        type='text' 
                        name='clientAddress' 
                        id='clientAddress' 
                        autoComplete='off'
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        placeholder='Enter client address'
                        className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'border-gray-300'
                        } ${formErrors.clientAddress ? 'border-red-500' : ''}`}
                      />
                      {formErrors.clientAddress && <span className="error-message text-red-500 text-sm mt-1">{formErrors.clientAddress}</span>}
                    </div>
                  </article>
                </div>

                <article className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className='flex flex-col'>
                    <label htmlFor="invoiceNumber" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Invoice Number <span className="text-red-500">*</span></label>
                    <input 
                      type='text' 
                      name='invoiceNumber' 
                      id='invoiceNumber' 
                      autoComplete='off'
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      placeholder='INV-001'
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } ${formErrors.invoiceNumber ? 'border-red-500' : ''}`}
                    />
                    {formErrors.invoiceNumber && <span className="error-message text-red-500 text-sm mt-1">{formErrors.invoiceNumber}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="invoiceDate" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Invoice Date <span className="text-red-500">*</span></label>
                    <input 
                      type='date' 
                      name='invoiceDate' 
                      id='invoiceDate' 
                      autoComplete='off'
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } ${formErrors.invoiceDate ? 'border-red-500' : ''}`}
                    />
                    {formErrors.invoiceDate && <span className="error-message text-red-500 text-sm mt-1">{formErrors.invoiceDate}</span>}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="dueDate" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Due Date <span className="text-red-500">*</span></label>
                    <input 
                      type='date' 
                      name='dueDate' 
                      id='dueDate' 
                      autoComplete='off'
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } ${formErrors.dueDate ? 'border-red-500' : ''}`}
                    />
                    {formErrors.dueDate && <span className="error-message text-red-500 text-sm mt-1">{formErrors.dueDate}</span>}
                  </div>
                </article>

                <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Invoice Items</h3>
                  {formErrors.items && <span className="error-message text-red-500 text-sm block mb-4">{formErrors.items}</span>}
                  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
                    <TableForm
                      items={list}
                      setItems={setList}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>

                <div className={`flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <label htmlFor="notes" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Additional Notes</label>
                  <textarea
                    name='notes'
                    id='notes'
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder='Enter any additional notes or terms here...'
                    className={`resize-none mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300'
                    }`}
                  />
                </div>

                <div className={`flex justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <button 
                    onClick={handlePreviewInvoice} 
                    className={`bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-sm border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 ${isDarkMode ? 'dark:hover:text-blue-400 dark:border-blue-400 dark:bg-blue-600 dark:hover:bg-transparent' : ''} transition-all duration-300`}
                  >
                    Preview Invoice
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<InvoiceForm />} />
        <Route path="/oauth2callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;









