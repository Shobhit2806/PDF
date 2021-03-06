import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import './pdf.css'
  

//const url = process.env.REACT_APP_URL

export default function Test() {
    
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
    <div className="main">
    {/* const url = "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf" */}
      <Document
        file="https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <div className="pagec">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </div>
        <div className="buttonc">
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
          className="Pre"
          
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
         
        >
          Next
        </button>
        </div>
      </div>
      </div>
    </>
  );
}