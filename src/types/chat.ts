export interface Chat extends BaseModel {
  lastChat: string; // time.Time
  firstCreated: string; // time.Time
  fileID: string;
  fileUpload?: FileUpload;
  messages?: Message[];
}