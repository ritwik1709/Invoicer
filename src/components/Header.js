import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import EmailForm from './EmailForm';

const Header = ({ invoiceRef, dealerEmail, invoiceNumber, invoiceDate, dueDate, total }) => {
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
      <header className='flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between'>
        <div>
          <h2 className='font-bold uppercase tracking-wide text-4xl mb-3'>Invoicer</h2>
        </div>

        <div className='no-print'>
          <ul className='flex items-center justify-between flex-wrap'>
            <li>
              <button onClick={handlePrint} className='bg-gray-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300'>Print</button>
            </li>
            <li className='mx-2'>
              <button onClick={handleDownload} className='bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300'>Download</button>
            </li>
            <li>
              <button onClick={handleSend} className='bg-green-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300'>Send</button>
            </li>
          </ul>
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