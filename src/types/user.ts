export interface User extends BaseModel {
  email: string;
  name: string;
  password?: string;
  profilePicture: string;
  organisationID: string;
  organisation?: Organisation;
  fileUploads?: FileUpload[];
}