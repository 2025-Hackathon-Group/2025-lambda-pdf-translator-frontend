import React, { useState, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure the worker to use the local copy
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

interface PDFViewerProps {
  file: File | null;
  onLoadSuccess?: (pdf: any) => void;
  onLoadError?: (error: Error) => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file, onLoadSuccess, onLoadError }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the options object to prevent unnecessary re-renders
  const options = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
    }),
    []
  );

  // Debug: Log the versions
  useEffect(() => {
    console.log('PDF.js version:', pdfjs.version);
    console.log('Worker URL:', pdfjs.GlobalWorkerOptions.workerSrc);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    if (onLoadSuccess) {
      onLoadSuccess({ numPages });
    }
  };

  const onDocumentLoadError = (error: Error) => {
    setLoading(false);
    setError(`Failed to load PDF: ${error.message}`);
    console.error('Error loading PDF:', error);
    if (onLoadError) {
      onLoadError(error);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.2);
  };

  if (!file) {
    return (
      <div className="pdf-viewer-empty">
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <p>No PDF selected</p>
          <p className="empty-subtitle">Upload a PDF file to preview it here</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-viewer-empty">
        <div className="empty-state">
          <div className="empty-icon">❌</div>
          <p>Error loading PDF</p>
          <p className="empty-subtitle">{error}</p>
          <button 
            className="upload-button"
            onClick={() => {
              setError(null);
              setLoading(true);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      {/* PDF Controls */}
      <div className="pdf-controls">
        <div className="page-controls">
          <span className="page-info">
            {numPages} {numPages === 1 ? 'Page' : 'Pages'}
          </span>
        </div>

        <div className="zoom-controls">
          <button onClick={zoomOut} className="control-btn" title="Zoom out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          
          <span className="zoom-level">{Math.round(scale * 100)}%</span>
          
          <button onClick={zoomIn} className="control-btn" title="Zoom in">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          
          <button onClick={resetZoom} className="control-btn reset-btn" title="Reset zoom">
            Reset
          </button>
        </div>

        <div className="file-info">
          <span className="file-name">{file.name}</span>
          <span className="file-size">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        </div>
      </div>

      {/* PDF Document */}
      <div className="pdf-document-container">
        {loading && (
          <div className="pdf-loading">
            <div className="loading-spinner"></div>
            <p>Loading PDF...</p>
          </div>
        )}
        
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          onLoadStart={() => {
            setLoading(true);
            setError(null);
          }}
          className="pdf-document"
          loading={
            <div className="pdf-loading">
              <div className="loading-spinner"></div>
              <p>Loading PDF...</p>
            </div>
          }
          error={
            <div className="pdf-loading">
              <p>Failed to load PDF file.</p>
            </div>
          }
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
              className="pdf-page"
              renderTextLayer={true}
              renderAnnotationLayer={true}
              loading={
                <div className="pdf-loading">
                  <div className="loading-spinner"></div>
                </div>
              }
              error={
                <div className="pdf-loading">
                  <p>Failed to load page.</p>
                </div>
              }
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;