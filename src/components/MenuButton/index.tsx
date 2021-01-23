import React, { useCallback, useState } from 'react';

import { MdMenu } from 'react-icons/md';
import { Button } from './styles';
import MainFriendsWindow from '../MainFriendsWindow';
import UploadFileWindow from '../UploadFileWindow';
import MenuDrawer from './MenuDrawer';
import EventTypeWindow from '../EventTypeWindow';
import CreateEventWindow from '../CreateEventWindow';
import Backdrop from '../Backdrop';
import CreateEventInfoWindowForm from '../CreateEventInfoWindowForm';
import IEventDTO from '../../dtos/IEventDTO';

interface IProps {
  signOut: Function;
  updateMyEvents: Function;
}
interface IEvent {
  id: string;
  name: string;
  trimmed_name: string;
}

const MenuButton: React.FC<IProps> = ({ signOut, updateMyEvents }: IProps) => {
  const [menuDrawer, setMenuDrawer] = useState(false);
  const [friendsWindow, setFriendsWindow] = useState(false);
  const [createEventDrawer, setCreateEventDrawer] = useState(false);
  const [eventTypeDrawer, setEventTypeDrawer] = useState(false);
  const [uploadFileWindow, setUploadFileWindow] = useState(false);
  const [eventType, setEventType] = useState<string>();
  const [eventInfoDrawer, setEventInfoDrawer] = useState(false);
  const [eventCreated, setEventCreated] = useState({} as IEventDTO);
  const [backdrop, setBackdrop] = useState(false);

  const closeAll = useCallback(() => {
    setMenuDrawer(false);
    setFriendsWindow(false);
    setCreateEventDrawer(false);
    setEventInfoDrawer(false);
    setEventTypeDrawer(false);
    setUploadFileWindow(false);
    setBackdrop(false);
  }, []);

  const [tipoDeEvento, setTipoDeEvento] = useState('Outros');

  const openCreateEventDrawer = useCallback(() => {
    setBackdrop(true);
    setCreateEventDrawer(true);
    setEventTypeDrawer(true);
  }, []);

  const handleEventTypeDrawer = useCallback(() => {
    setEventTypeDrawer(!eventTypeDrawer);
  }, [eventTypeDrawer]);

  const handleNavigateToFriends = useCallback(() => {
    setBackdrop(true);
    setFriendsWindow(true);
  }, []);

  const handleEventTypeChange = useCallback(
    (option: string) => {
      setEventType(option);
      option === 'Wedding' && setTipoDeEvento('Casamento');
      option === 'Prom' && setTipoDeEvento('Formatura');
      option === 'Birthday' && setTipoDeEvento('Aniversário');

      option === 'Sweet_15' && setTipoDeEvento('15 Anos');
      option === 'Sweet_16' && setTipoDeEvento('Sweet 16');
      option === 'Wedding_Anniversary' && setTipoDeEvento('Bodas');

      option === 'Corporate' && setTipoDeEvento('Corporativo');
      option === 'Christmas' && setTipoDeEvento('Natal');
      option === 'New_Year' && setTipoDeEvento('Ano Novo');

      option === 'Baptism' && setTipoDeEvento('Batismo');
      option === 'Hanukkah' && setTipoDeEvento('Hanukkah');
      option === 'Others' && setTipoDeEvento('Outros');

      handleEventTypeDrawer();
    },
    [handleEventTypeDrawer, setEventType],
  );

  const handleEventInfoDrawer = useCallback(() => {
    setCreateEventDrawer(false);
    setEventInfoDrawer(!eventInfoDrawer);
  }, [eventInfoDrawer]);

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
          handleNavigateToFriends={handleNavigateToFriends}
          handleCreateEventDrawer={openCreateEventDrawer}
          signOut={signOut}
          handleUploadFileWindow={() => setUploadFileWindow(!uploadFileWindow)}
        />
      )}
      {backdrop && <Backdrop onClick={() => closeAll()} />}
      {!!friendsWindow && (
        <MainFriendsWindow onHandleCloseWindow={() => closeAll()} />
      )}
      {!!createEventDrawer && (
        <CreateEventWindow
          eventType={eventType}
          handleEventInfoDrawer={handleEventInfoDrawer}
          handleEventTypeDrawer={handleEventTypeDrawer}
          handleGetMyEvents={updateMyEvents}
          onHandleCloseWindow={() => closeAll()}
          tipoDeEvento={tipoDeEvento}
          setEventCreated={(e: IEventDTO) => setEventCreated(e)}
        />
      )}
      {!!eventTypeDrawer && (
        <EventTypeWindow
          onHandleCloseWindow={() => closeAll()}
          selectEventType={(e: string) => handleEventTypeChange(e)}
        />
      )}
      {!!eventInfoDrawer && (
        <CreateEventInfoWindowForm
          updateEvent={() => updateMyEvents()}
          eventId={eventCreated.id}
          getEventInfo={() => setEventInfoDrawer(false)}
          handleCloseWindow={() => setEventInfoDrawer(false)}
        />
      )}
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
