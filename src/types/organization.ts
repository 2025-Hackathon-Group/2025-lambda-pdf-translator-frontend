export interface Organisation extends BaseModel {
  name: string;
  email: string;
  users?: User[];
}