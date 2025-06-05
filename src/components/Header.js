import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import EmailForm from './EmailForm';
import ReactToPrint from 'react-to-print';

const Header = ({ invoiceRef, dealerEmail, invoiceNumber, invoiceDate, dueDate, total, isDarkMode }) => {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState(null);

  const handlePrint = () => {
    // Hide buttons before printing
    const buttons = document.querySelectorAll('.no-print');
    buttons.forEach(button => button.style.display = 'none');
    
    // Trigger print
    window.print();
    
    // Show buttons after printing
    setTimeout(() => {
      buttons.forEach(button => button.style.display = '');
    }, 1000);
  };

  const handleDownload = () => {
    // Hide buttons before capturing
    const buttons = document.querySelectorAll('.no-print');
    buttons.forEach(button => button.style.display = 'none');

    const element = invoiceRef.current;
    html2canvas(element, { 
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('invoice.pdf');

      // Show buttons after capturing
      buttons.forEach(button => button.style.display = '');
    });
  };

  const handleSend = async () => {
    if (!dealerEmail) {
      alert('Please enter your email address in the form');
      return;
    }

    // Generate PDF first
    const buttons = document.querySelectorAll('.no-print');
    buttons.forEach(button => button.style.display = 'none');

    const element = invoiceRef.current;
    try {
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Convert PDF to Blob
      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], 'invoice.pdf', { type: 'application/pdf' });
      setInvoiceFile(file);
      
      // Show email form
      setIsEmailFormOpen(true);

      // Show buttons after capturing
      buttons.forEach(button => button.style.display = '');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      buttons.forEach(button => button.style.display = '');
    }
  };

  return (
    <>
      <header className={`flex justify-between items-start ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <div>
          <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Invoice Number: {invoiceNumber}</p>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date: {invoiceDate}</p>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Due Date: {dueDate}</p>
        </div>

        <div className="text-right">
          <ReactToPrint
            trigger={() => (
              <button className={`px-4 py-2 rounded-lg shadow-sm border-2 ${
                isDarkMode 
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-transparent hover:text-blue-400' 
                  : 'bg-blue-500 text-white border-blue-500 hover:bg-transparent hover:text-blue-500'
              } transition-all duration-300`}
              >
                Print / Download
              </button>
            )}
            content={() => invoiceRef.current}
          />
          <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Amount: ${total}</p>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email: {dealerEmail}</p>
        </div>
      </header>

      <EmailForm 
        isOpen={isEmailFormOpen}
        onClose={() => setIsEmailFormOpen(false)}
        invoiceFile={invoiceFile}
        dealerEmail={dealerEmail}
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
        dueDate={dueDate}
        total={total}
      />
    </>
  )
}

export default Header;