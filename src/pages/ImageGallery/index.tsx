import React, { useCallback, useEffect, useState } from 'react';
import EventImageGallery from '../../components/ImageGalleryComponents/EventImageGallery';
import Gallery from '../../components/ImageGalleryComponents/Gallery';
import ImagesByCategoryGallery from '../../components/ImageGalleryComponents/ImagesByCategoryGallery';
import SideMenu from '../../components/ImageGalleryComponents/SideMenu';
import PageHeader from '../../components/PageHeader';
import IListUserEventImagesDTO from '../../dtos/IListUserEventImagesDTO';
import IImageParticipantDTO from '../../dtos/IImageParticipantDTO';
import IUserImageCategoryDTO from '../../dtos/IUserImageCategoryDTO';
import IUserImageDTO from '../../dtos/IUserImageDTO';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Container } from './styles';
import ImageParticipantsGallery from '../../components/ImageGalleryComponents/ImageParticipantsGallery';
import InspirationImageGallery from '../../components/ImageGalleryComponents/InspirationImageGallery';
import IInspirationImageDTO from '../../dtos/IInspirationImageDTO';
import BottomMenu from '../../components/ImageGalleryComponents/BottomMenu';

const ImageGallery: React.FC = () => {
  const { user } = useAuth();

  const [allImageSection, setAllImageSection] = useState(true);
  const [eventImageSection, setEventImageSection] = useState(false);
  const [inspirationImageSection, setInspirationImageSection] = useState(false);
  const [markedImageSection, setMarkedImageSection] = useState(false);
  const [imageByCategoriesSection, setImageByCategoriesSection] = useState(
    false,
  );
  const [gridView, setGridView] = useState(true);

  const closeAllWindows = useCallback(() => {
    setAllImageSection(false);
    setImageByCategoriesSection(false);
    setEventImageSection(false);
    setInspirationImageSection(false);
    setMarkedImageSection(false);
  }, []);

  const [userImages, setUserImages] = useState<IUserImageDTO[]>([]);
  const [eventImages, setEventImages] = useState<IListUserEventImagesDTO[]>([]);
  const [inspirationImages, setInspirationImages] = useState<
    IInspirationImageDTO[]
  >([]);
  const [markedImages, setMarkedImages] = useState<IImageParticipantDTO[]>([]);
  const [userImageCategories, setUserImageCategories] = useState<
    IUserImageCategoryDTO[]
  >([]);

  const showAllImages = useCallback(() => {
    closeAllWindows();
    setAllImageSection(true);
  }, [closeAllWindows]);
  const handleImageByCategories = useCallback(() => {
    closeAllWindows();
    setImageByCategoriesSection(true);
  }, [closeAllWindows]);
  const showEventImages = useCallback(() => {
    closeAllWindows();
    setEventImageSection(true);
  }, [closeAllWindows]);
  const showInspirationImages = useCallback(() => {
    closeAllWindows();
    setInspirationImageSection(true);
  }, [closeAllWindows]);
  const showMarkedImages = useCallback(() => {
    closeAllWindows();
    setMarkedImageSection(true);
  }, [closeAllWindows]);

  const getImages = useCallback(() => {
    try {
      api.get(`/user/images/${user.id}`).then(response => {
        setUserImages(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [user.id]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const getUserImageCategories = useCallback(() => {
    try {
      api.get(`/user/image/categories/${user.id}`).then(response => {
        setUserImageCategories(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, [user.id]);

  useEffect(() => {
    getUserImageCategories();
  }, [getUserImageCategories]);

  const getEventImages = useCallback(() => {
    try {
      api.get(`/user/event/images`).then(response => {
        setEventImages(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getEventImages();
  }, [getEventImages]);

  const getMarkedImages = useCallback(() => {
    try {
      api.get(`/user/image/participants`).then(response => {
        setMarkedImages(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getMarkedImages();
  }, [getMarkedImages]);

  const getInspirationImages = useCallback(() => {
    try {
      api.get(`/inspiration/images/`).then(response => {
        setInspirationImages(response.data);
      });
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    getInspirationImages();
  }, [getInspirationImages]);

  return (
    <Container>
      <PageHeader />
      {allImageSection && <Gallery gridView={gridView} images={userImages} />}
      {eventImageSection && (
        <EventImageGallery gridView={gridView} eventImages={eventImages} />
      )}
      {imageByCategoriesSection && (
        <ImagesByCategoryGallery
          gridView={gridView}
          userImageCategories={userImageCategories}
          getUserImageCategories={getUserImageCategories}
        />
      )}
      {markedImageSection && (
        <ImageParticipantsGallery gridView={gridView} images={markedImages} />
      )}
      {inspirationImageSection && (
        <InspirationImageGallery
          gridView={gridView}
          inspirationImages={inspirationImages}
        />
      )}
      <SideMenu
        showAllImages={showAllImages}
        handleImageByCategories={handleImageByCategories}
        showEventImages={showEventImages}
        showInspirationImages={showInspirationImages}
        showMarkedImages={showMarkedImages}
      />
      <BottomMenu handleGridView={(e: boolean) => setGridView(e)} />
    </Container>
  );
};

export default ImageGallery;
