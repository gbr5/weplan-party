import IUserImageDTO from './IUserImageDTO';

export default interface ICategoryImageDTO {
  id: string;
  image_id: string;
  category_id: string;
  image: IUserImageDTO;
}
