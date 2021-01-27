import ICategoryImageDTO from './ICategoryImageDTO';

export default interface IUserImageCategoryDTO {
  id: string;
  user_id: string;
  name: string;
  description: string;
  color: string;
  created_at: Date;
  updated_at: Date;
  categoryImages: ICategoryImageDTO[];
}
