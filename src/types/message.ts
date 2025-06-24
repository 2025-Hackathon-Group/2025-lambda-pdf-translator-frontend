export type SenderType = 'USER' | 'AI';

export interface Message extends BaseModel {
  sender: SenderType;
  content: string;
  sentAt: string; // time.Time
  chatID: string;
  chat?: Chat;
}