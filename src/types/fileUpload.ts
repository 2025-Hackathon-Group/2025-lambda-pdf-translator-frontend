export type ProcessingState = 'pending' | 'processing' | 'completed' | 'failed';

export interface FileUpload extends BaseModel {
  fileName: string;
  originalName: string;
  fileSize: number; // int64
  contentType: string;
  s3Bucket: string;
  s3Key: string;
  s3Region: string;
  uploadedAt: string; // time.Time
  path: string;
  userID: string;
  user?: User;
  processingState: ProcessingState;
  error: string;
}