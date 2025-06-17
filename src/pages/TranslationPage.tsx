import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import './TranslationPage.css';

interface LanguageOption {
  value: string;
  label: string;
}

const TranslationPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleLanguageChange = (option: SingleValue<LanguageOption>) => {
    setSelectedLanguage(option);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
      <div className="left-panel">
        <h3>Recent Files</h3>
        <div className="recent-files">
          <div className="file-item">Document1.pdf</div>
          <div className="file-item">Document2.pdf</div>
          <div className="file-item">Document3.pdf</div>
        </div>
      </div>

      <div className="main-content">
        <div className="select-language">
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' }
            ]}
            placeholder="Select target language..."
            className="language-select"
            styles={customSelectStyles}
            isSearchable={true}
          />
        </div>

        <div className="upload-section">
          {!selectedFile ? (
            <div className="upload-area">
              <p>Upload a PDF to start translating</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                id="file-upload"
                style={{ display: 'none' }}
              />
              <button 
                className="upload-button"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Choose PDF File
              </button>
            </div>
          ) : (
            <div className="pdf-preview">
              {/* PDF preview component */}
            </div>
          )}
        </div>
      </div>

      <div className="right-panel">
        <div className="chat-section">
          <textarea
            placeholder="Ask a question about your document..."
            className="chat-input"
          />
          <button className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationPage;