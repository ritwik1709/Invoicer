import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import EmailForm from './EmailForm';
import ReactToPrint from 'react-to-print';

const Header = ({ 
  invoiceRef,
  dealerEmail,
  invoiceNumber,
  invoiceDate,
  dueDate,
  total,
  isDarkMode 
}) => {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);

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
      // const pageHeight = 297;
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
      // const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
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
    <div className={`mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold">Invoice</h1>
        <div className="flex gap-2">
          <ReactToPrint
            trigger={() => (
              <button 
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors duration-200 no-print`}
                onClick={handlePrint}
              >
                Print
              </button>
            )}
            content={() => invoiceRef.current}
          />
          <button 
            className={`px-4 py-2 rounded-md ${
              isDarkMode 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-green-500 text-white hover:bg-green-600'
            } transition-colors duration-200 no-print`}
            onClick={handleDownload}
          >
            Download PDF
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${
              isDarkMode 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : 'bg-purple-500 text-white hover:bg-purple-600'
            } transition-colors duration-200 no-print`}
            onClick={handleSend}
          >
            Send Email
          </button>
        </div>
      </div>

      <EmailForm 
        isOpen={isEmailFormOpen}
        onClose={() => setIsEmailFormOpen(false)}
        dealerEmail={dealerEmail}
        invoiceNumber={invoiceNumber}
        invoiceDate={invoiceDate}
        dueDate={dueDate}
        total={total}
      />
    </div>
  );
};

export default Header;