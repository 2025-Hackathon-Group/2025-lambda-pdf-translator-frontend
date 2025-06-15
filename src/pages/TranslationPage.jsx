import React, { useState } from 'react';
import Select from 'react-select';
import ChatBox from '../components/ChatBox';
import './TranslationPage.css';

function TranslationPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState(null);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
    // Add more languages here
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };
  
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--white)',
      borderColor: 'var(--border)',
      borderRadius: '8px',
      minWidth: '200px',
      '&:hover': {
        borderColor: 'var(--accent)'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'var(--accent)' : 'var(--white)',
      color: state.isSelected ? 'var(--white)' : 'var(--text)',
      '&:hover': {
        backgroundColor: 'var(--bg-hover)'
      }
    })
  };

  return (
    <div className="translation-page">
      {/* Left Sidebar - File History */}
      <aside className="file-sidebar">
        <h2 className="sidebar-title">Recent Files</h2>
        <div className="file-list">
          {['Document1.pdf', 'Document2.pdf', 'Document3.pdf'].map((file, index) => (
            <div key={index} className="file-item">
              <span className="file-icon">📄</span>
              <span className="file-name">{file}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Middle Section - PDF Preview */}
      <main className="pdf-preview">
        <div className="preview-header">
          <h2>Translated Document</h2>
          <Select
            options={languageOptions}
            value={targetLanguage}
            onChange={setTargetLanguage}
            placeholder="Select target language..."
            styles={customSelectStyles}
            className="language-select"
            isSearchable={true}
          />
        </div>
        <div className="preview-content">
          {selectedFile ? (
            <div className="pdf-viewer">
              {/* PDF Viewer Component will go here */}
              <p>PDF Preview: {selectedFile.name}</p>
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">📄</span>
              <p>Upload a PDF to start translating</p>
              <input
                type="file"
                accept=".pdf"
                id="pdf-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="pdf-upload" 
                className="upload-button"
              >
                Choose PDF File
              </label>
            </div>
          )}
        </div>
      </main>

      {/* Right Section - Chat */}
      <aside className="chat-sidebar">
        <ChatBox />
      </aside>
    </div>
  );
}

export default TranslationPage;