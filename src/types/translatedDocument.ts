export interface TranslatedFile {export interface TranslatedDocument extends BaseModel {
  originalLanguage: string;
  translatedLanguage: string;
  fileSize: number;
  fileName: string;
  s3Bucket: string;
  s3Key: string;
  s3Region: string;
  uploadedAt: string; // time.Time
  path: string;
  processingState: ProcessingState;
  error: string;
  fileUploadID: string; // uuid.UUID
  fileUpload?: FileUpload;
}