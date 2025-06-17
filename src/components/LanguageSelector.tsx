import React from 'react';

interface LanguageSelectorProps {
  onChange?: (language: string) => void;
  value?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChange, value }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="language" className="text-gray-700 font-medium">
        Select Target Language
      </label>
      <select 
        id="language"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="pt">Portuguese</option>
        <option value="ru">Russian</option>
        <option value="zh">Chinese</option>
        <option value="ja">Japanese</option>
        <option value="ko">Korean</option>
      </select>
    </div>
  );
};

export default LanguageSelector;