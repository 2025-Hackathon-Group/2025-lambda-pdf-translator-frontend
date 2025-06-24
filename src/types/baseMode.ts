export interface BaseModel {
  ID: string; // uuid.UUID
  created_at: string; // time.Time
  updated_at: string; // time.Time
  deleted_at: string | null;
}