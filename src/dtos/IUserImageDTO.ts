export default interface IUserImageDTO {
  id: string;
  user_id: string;
  name: string;
  image_name: string;
  description: string;
  url: string;
  file_url: string;
  created_at: Date;
  updated_at: Date;
  image_url: string;
}