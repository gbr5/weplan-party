import React, { useCallback, useState } from 'react';

import { MdMenu } from 'react-icons/md';
import { Button } from './styles';
import MainFriendsWindow from '../MainFriendsWindow';
import UploadFileWindow from '../UploadFileWindow';
import MenuDrawer from './MenuDrawer';
import Backdrop from '../Backdrop';
import CreateEventInfoWindowForm from '../CreateEventInfoWindowForm';

interface IEvent {
  id: string;
  name: string;
  trimmed_name: string;
}

const MenuButton: React.FC = () => {
  const [menuDrawer, setMenuDrawer] = useState(false);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [uploadFileWindow, setUploadFileWindow] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const closeAll = useCallback(() => {
    setMenuDrawer(false);
    setFriendsWindow(false);
    setUploadFileWindow(false);
    setBackdrop(false);
  }, []);

  const handleMenuDrawer = useCallback(() => {
    closeAll();
    setMenuDrawer(!menuDrawer);
    setBackdrop(!menuDrawer);
  }, [menuDrawer, closeAll]);

  return (
    <>
      <Button type="button" onClick={() => handleMenuDrawer()}>
        <MdMenu size={24} />
      </Button>
      {menuDrawer && (
        <MenuDrawer
          handleUploadFileWindow={() => setUploadFileWindow(!uploadFileWindow)}
        />
      )}
      {backdrop && <Backdrop onClick={() => closeAll()} />}
      {!!friendsWindow && <MainFriendsWindow />}
      {uploadFileWindow && (
        <UploadFileWindow
          handleCloseWindow={() => closeAll()}
          onHandleCloseWindow={() => closeAll()}
        />
      )}
    </>
  );
};

export default MenuButton;
