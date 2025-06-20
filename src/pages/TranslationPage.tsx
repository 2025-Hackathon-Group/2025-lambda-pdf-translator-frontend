import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import PDFViewer from '../components/PDFViewer';
import './TranslationPage.css';

interface LanguageOption {
  value: string;
  label: string;
}

const TranslationPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string>('');

  const handleLanguageChange = (option: SingleValue<LanguageOption>) => {
    setSelectedLanguage(option);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleTargetLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLanguage(event.target.value);
  };

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--white)',
      borderColor: 'var(--border)',
      borderRadius: '8px',
      minWidth: '200px',
      '&:hover': {
        borderColor: 'var(--accent)'
      }
    }),
    option: (provided: any, state: any) => ({
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
      {/* Left Panel - Recent Files */}
      <div className="left-panel">
        <div className="upload-area-sidebar">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            id="file-upload-sidebar"
            style={{ display: 'none' }}
          />
          <button 
            className="upload-new-btn"
            onClick={() => document.getElementById('file-upload-sidebar')?.click()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Upload New PDF
          </button>
        </div>

        <div className="panel-header">
          <h3 className="panel-title">
            <svg className="panel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <line x1="10" y1="9" x2="8" y2="9"/>
            </svg>
            Recent Files
          </h3>
          <button className="refresh-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
        </div>
        
        <div className="recent-files">
          {[
            { name: "Annual Report 2024.pdf", size: "2.4 MB", date: "2 hours ago", type: "report" },
            { name: "Contract Agreement.pdf", size: "890 KB", date: "1 day ago", type: "contract" },
            { name: "User Manual v3.pdf", size: "5.1 MB", date: "3 days ago", type: "manual" },
            { name: "Meeting Notes.pdf", size: "340 KB", date: "1 week ago", type: "notes" }
          ].map((file, index) => (
            <div key={index} className="file-item enhanced">
              <div className="file-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                <span className={`file-type-badge ${file.type}`}>{file.type.toUpperCase()}</span>
              </div>
              <div className="file-details">
                <div className="file-name">{file.name}</div>
                <div className="file-meta">
                  <span className="file-size">{file.size}</span>
                  <span className="file-date">{file.date}</span>
                </div>
              </div>
              <div className="file-actions">
                <button className="action-btn translate-btn" title="Translate">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 8l6 6"/>
                    <path d="M4 14l6-6 2-3"/>
                    <path d="M2 5h12"/>
                    <path d="M7 2h1"/>
                    <path d="M22 22l-5-10-5 10"/>
                    <path d="M14 18h6"/>
                  </svg>
                </button>
                <button className="action-btn more-btn" title="More options">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - PDF Preview */}
      <div className="main-content">
        {!selectedFile ? (
          <div className="upload-section">
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h2>Upload a PDF to start translating</h2>
              <p>Drag and drop a PDF file or click to upload</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                id="file-upload-main"
                style={{ display: 'none' }}
              />
              <button 
                className="upload-button"
                onClick={() => document.getElementById('file-upload-main')?.click()}
              >
                Choose PDF File
              </button>
            </div>
          </div>
        ) : (
          <PDFViewer 
            file={selectedFile}
            onLoadSuccess={(pdf) => {
              console.log('PDF loaded successfully:', pdf);
            }}
            onLoadError={(error) => {
              console.error('Error loading PDF:', error);
              alert('Error loading PDF. Please try another file.');
            }}
          />
        )}
      </div>

      {/* Right Panel - Chat */}
      <div className="right-panel">
        <div className="chat-header">
          <h3 className="chat-title">
            <svg className="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Document Assistant
          </h3>
          <div className="status-indicator online">
            <span className="status-dot"></span>
            Online
          </div>
        </div>
        
        <div className="translation-controls">
          <div className="translation-header">
            <svg className="translate-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 8l6 6"/>
              <path d="M4 14l6-6 2-3"/>
              <path d="M2 5h12"/>
              <path d="M7 2h1"/>
              <path d="M22 22l-5-10-5 10"/>
              <path d="M14 18h6"/>
            </svg>
            <span>Quick Translate</span>
          </div>
          
          <div className="translation-status">
            <div className="status-item">
              <span className="status-label">Source:</span>
              <span className="status-value">
                {selectedFile ? '🇬🇧 English (Auto-detected)' : 'No document loaded'}
              </span>
            </div>
          </div>
          
          <div className="language-selector-chat">
            <label className="translate-label">Translate to:</label>
            <select 
              className="language-dropdown"
              value={targetLanguage}
              onChange={handleTargetLanguageChange}
            >
            <option value="">Select language...</option>
            <option value="aa">🇪🇷 Afar</option>
            <option value="ab">🇬🇪 Abkhazian</option>
            <option value="ae">🇮🇷 Avestan</option>
            <option value="af">🇿🇦 Afrikaans</option>
            <option value="ak">🇬🇭 Akan</option>
            <option value="am">🇪🇹 Amharic</option>
            <option value="an">🇪🇸 Aragonese</option>
            <option value="ar">🇸🇦 Arabic</option>
            <option value="as">🇮🇳 Assamese</option>
            <option value="av">🇷🇺 Avaric</option>
            <option value="ay">🇧🇴 Aymara</option>
            <option value="az">🇦🇿 Azerbaijani</option>
            <option value="ba">🇷🇺 Bashkir</option>
            <option value="be">🇧🇾 Belarusian</option>
            <option value="bg">🇧🇬 Bulgarian</option>
            <option value="bi">🇻🇺 Bislama</option>
            <option value="bm">🇲🇱 Bambara</option>
            <option value="bn">🇧🇩 Bengali</option>
            <option value="bo">🇹🇭 Tibetan</option>
            <option value="br">🇫🇷 Breton</option>
            <option value="bs">🇧🇦 Bosnian</option>
            <option value="ca">🇪🇸 Catalan</option>
            <option value="ce">🇷🇺 Chechen</option>
            <option value="ch">🇮🇹 Chamorro</option>
            <option value="co">🇫🇷 Corsican</option>
            <option value="cr">🇨🇦 Cree</option>
            <option value="cs">🇨🇿 Czech</option>
            <option value="cu">🇸🇮 Old Church Slavonic</option>
            <option value="cv">🇷🇺 Chuvash</option>
            <option value="cy">🏴 Welsh</option>
            <option value="da">🇩🇰 Danish</option>
            <option value="de">🇩🇪 German</option>
            <option value="dv">🇲🇻 Divehi</option>
            <option value="dz">🇧🇹 Dzongkha</option>
            <option value="ee">🇬🇭 Ewe</option>
            <option value="el">🇬🇷 Greek</option>
            <option value="en">🇬🇧 English</option>
            <option value="eo">🏴‍☠️ Esperanto</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="et">🇪🇪 Estonian</option>
            <option value="eu">🇪🇸 Basque</option>
            <option value="fa">🇮🇷 Persian</option>
            <option value="ff">🇸🇳 Fulah</option>
            <option value="fi">🇫🇮 Finnish</option>
            <option value="fj">🇫🇯 Fijian</option>
            <option value="fo">🇫🇴 Faroese</option>
            <option value="fr">🇫🇷 French</option>
            <option value="fy">🇳🇱 Western Frisian</option>
            <option value="ga">🇮🇪 Irish</option>
            <option value="gd">🏴 Scottish Gaelic</option>
            <option value="gl">🇪🇸 Galician</option>
            <option value="gn">🇵🇾 Guaraní</option>
            <option value="gu">🇮🇳 Gujarati</option>
            <option value="gv">🇮🇲 Manx</option>
            <option value="ha">🇳🇬 Hausa</option>
            <option value="he">🇮🇱 Hebrew</option>
            <option value="hi">🇮🇳 Hindi</option>
            <option value="ho">🇵🇬 Hiri Motu</option>
            <option value="hr">🇭🇷 Croatian</option>
            <option value="ht">🇭🇹 Haitian Creole</option>
            <option value="hu">🇭🇺 Hungarian</option>
            <option value="hy">🇦🇲 Armenian</option>
            <option value="hz">🇳🇦 Herero</option>
            <option value="ia">🌐 Interlingua</option>
            <option value="id">🇮🇩 Indonesian</option>
            <option value="ie">🌐 Interlingue</option>
            <option value="ig">🇳🇬 Igbo</option>
            <option value="ii">🇨🇳 Sichuan Yi</option>
            <option value="ik">🇺🇸 Inupiaq</option>
            <option value="io">🌐 Ido</option>
            <option value="is">🇮🇸 Icelandic</option>
            <option value="it">🇮🇹 Italian</option>
            <option value="iu">🇨🇦 Inuktitut</option>
            <option value="ja">🇯🇵 Japanese</option>
            <option value="jv">🇮🇩 Javanese</option>
            <option value="ka">🇬🇪 Georgian</option>
            <option value="kg">🇨🇩 Kongo</option>
            <option value="ki">🇰🇪 Kikuyu</option>
            <option value="kj">🇳🇦 Kwanyama</option>
            <option value="kk">🇰🇿 Kazakh</option>
            <option value="kl">🇬🇱 Kalaallisut</option>
            <option value="km">🇰🇭 Khmer</option>
            <option value="kn">🇮🇳 Kannada</option>
            <option value="ko">🇰🇷 Korean</option>
            <option value="kr">🇳🇬 Kanuri</option>
            <option value="ks">🇮🇳 Kashmiri</option>
            <option value="ku">🇹🇷 Kurdish</option>
            <option value="kv">🇷🇺 Komi</option>
            <option value="kw">🇬🇧 Cornish</option>
            <option value="ky">🇰🇬 Kyrgyz</option>
            <option value="la">🇻🇦 Latin</option>
            <option value="lb">🇱🇺 Luxembourgish</option>
            <option value="lg">🇺🇬 Ganda</option>
            <option value="li">🇳🇱 Limburgish</option>
            <option value="ln">🇨🇩 Lingala</option>
            <option value="lo">🇱🇦 Lao</option>
            <option value="lt">🇱🇹 Lithuanian</option>
            <option value="lu">🇨🇩 Luba‑Katanga</option>
            <option value="lv">🇱🇻 Latvian</option>
            <option value="mg">🇲🇬 Malagasy</option>
            <option value="mh">🇲🇭 Marshallese</option>
            <option value="mi">🇳🇿 Māori</option>
            <option value="mk">🇲🇰 Macedonian</option>
            <option value="ml">🇮🇳 Malayalam</option>
            <option value="mn">🇲🇳 Mongolian</option>
            <option value="mr">🇮🇳 Marathi</option>
            <option value="ms">🇲🇾 Malay</option>
            <option value="mt">🇲🇹 Maltese</option>
            <option value="my">🇲🇲 Burmese</option>
            <option value="na">🇼🇫 Nauru</option>
            <option value="nb">🇳🇴 Norwegian Bokmål</option>
            <option value="nd">🇿🇼 North Ndebele</option>
            <option value="ne">🇳🇵 Nepali</option>
            <option value="ng">🇳🇦 Ndonga</option>
            <option value="nl">🇳🇱 Dutch</option>
            <option value="nn">🇳🇴 Norwegian Nynorsk</option>
            <option value="no">🇳🇴 Norwegian</option>
            <option value="nr">🇿🇼 South Ndebele</option>
            <option value="nv">🇺🇸 Navajo</option>
            <option value="ny">🇲🇼 Chichewa</option>
            <option value="oc">🇫🇷 Occitan</option>
            <option value="oj">🇺🇸 Ojibwa</option>
            <option value="om">🇪🇹 Oromo</option>
            <option value="or">🇮🇳 Oriya</option>
            <option value="os">🇷🇺 Ossetian</option>
            <option value="pa">🇮🇳 Punjabi</option>
            <option value="pi">🇱🇰 Pāli</option>
            <option value="pl">🇵🇱 Polish</option>
            <option value="ps">🇦🇫 Pashto</option>
            <option value="pt">🇵🇹 Portuguese</option>
            <option value="qu">🇵🇪 Quechua</option>
            <option value="rm">🇨🇭 Romansh</option>
            <option value="rn">🇧🇮 Kirundi</option>
            <option value="ro">🇷🇴 Romanian</option>
            <option value="ru">🇷🇺 Russian</option>
            <option value="rw">🇷🇼 Kinyarwanda</option>
            <option value="sa">🇮🇳 Sanskrit</option>
            <option value="sc">🇮🇹 Sardinian</option>
            <option value="sd">🇵🇰 Sindhi</option>
            <option value="se">🇫🇮 Northern Sami</option>
            <option value="sg">🇨🇫 Sango</option>
            <option value="si">🇱🇰 Sinhala</option>
            <option value="sk">🇸🇰 Slovak</option>
            <option value="sl">🇸🇮 Slovenian</option>
            <option value="sm">🇼🇸 Samoan</option>
            <option value="sn">🇿🇼 Shona</option>
            <option value="so">🇸🇴 Somali</option>
            <option value="sq">🇦🇱 Albanian</option>
            <option value="sr">🇷🇸 Serbian</option>
            <option value="ss">🇸🇿 Swati</option>
            <option value="st">🇿🇦 Southern Sotho</option>
            <option value="su">🇮🇩 Sundanese</option>
            <option value="sv">🇸🇪 Swedish</option>
            <option value="sw">🇰🇪 Swahili</option>
            <option value="ta">🇱🇰 Tamil</option>
            <option value="te">🇮🇳 Telugu</option>
            <option value="tg">🇹🇯 Tajik</option>
            <option value="th">🇹🇭 Thai</option>
            <option value="ti">🇪🇷 Tigrinya</option>
            <option value="tk">🇹🇲 Turkmen</option>
            <option value="tl">🇵🇭 Tagalog</option>
            <option value="tn">🇿🇦 Tswana</option>
            <option value="to">🇹🇴 Tonga</option>
            <option value="tr">🇹🇷 Turkish</option>
            <option value="ts">🇿🇦 Tsonga</option>
            <option value="tt">🇷🇺 Tatar</option>
            <option value="tw">🇬🇭 Twi</option>
            <option value="ty">🇵🇫 Tahitian</option>
            <option value="ug">🇨🇳 Uyghur</option>
            <option value="uk">🇺🇦 Ukrainian</option>
            <option value="ur">🇵🇰 Urdu</option>
            <option value="uz">🇺🇿 Uzbek</option>
            <option value="ve">🇿🇦 Venda</option>
            <option value="vi">🇻🇳 Vietnamese</option>
            <option value="vo">🇳🇪 Volapük</option>
            <option value="wa">🇧🇪 Walloon</option>
            <option value="wo">🇸🇳 Wolof</option>
            <option value="xh">🇿🇦 Xhosa</option>
            <option value="yi">🇮🇱 Yiddish</option>
            <option value="yo">🇳🇬 Yoruba</option>
            <option value="za">🇨🇳 Zhuang</option>
            <option value="zh">🇨🇳 Chinese</option>
            <option value="zu">🇿🇦 Zulu</option>
            </select>
            
            <button 
              className="quick-translate-btn"
              disabled={!selectedFile || !targetLanguage}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
              Translate Document
            </button>
          </div>
        </div>
        
        <div className="chat-messages">
          <div className="welcome-message">
            <div className="bot-avatar">🤖</div>
            <div className="message-content">
              <p>Hi! I'm your AI assistant. Upload a document and I'll help you understand and translate it. Try asking me:</p>
              <div className="suggested-questions">
                <button className="suggestion-btn">"Summarize this document"</button>
                <button className="suggestion-btn">"What are the key points?"</button>
                <button className="suggestion-btn">"Translate to Spanish"</button>
                <button className="suggestion-btn">"Compare with original"</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="chat-input-area">
          <div className="input-wrapper">
            <textarea
              placeholder="Ask me anything about your document..."
              className="chat-input enhanced"
              rows={1}
            />
            <div className="input-actions">
              <button className="send-btn" title="Send message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="typing-indicator">
            <span className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
            AI is thinking...
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationPage;