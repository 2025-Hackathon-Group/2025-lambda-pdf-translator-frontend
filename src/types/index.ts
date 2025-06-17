export interface User {
  id?: string;
  email: string;
  name?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface LanguageOption {
  value: string;
  label: string;
}