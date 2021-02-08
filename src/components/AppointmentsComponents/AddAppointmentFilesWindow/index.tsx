import React, { useCallback, useEffect, useState } from 'react';

import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import IUserFileDTO from '../../../dtos/IUserFileDTO';
import SelectUserFileWindow from '../../SelectUserFileWindow';
import IAppointmentDTO from '../../../dtos/IAppointmentDTO';

import { Container } from './styles';
import WindowUnFormattedContainer from '../../WindowUnFormattedContainer';

interface IFormData {
  subject: string;
  duration_minutes: number;
  address: string;
}

interface IProps {
  closeWindow: Function;
  getAppointments: Function;
  appointment: IAppointmentDTO;
}

const AddAppointmentFilesWindow: React.FC<IProps> = ({
  closeWindow,
  getAppointments,
  appointment,
}: IProps) => {
  const { addToast } = useToast();
  const [appointmentFiles, setAppointmentFiles] = useState<IUserFileDTO[]>([]);
  const [alreadySelected, setAlreadySelected] = useState<IUserFileDTO[]>([]);
  const [files, setFiles] = useState(false);

  useEffect(() => {
    if (appointment.appointmentFiles.length > 0) {
      const alreadySelectedUsers: IUserFileDTO[] = [];
      appointment.appointmentFiles.map(xU => {
        alreadySelectedUsers.push(xU.file);
        return '';
      });
      setAlreadySelected(alreadySelectedUsers);
    }
  }, [appointment]);

  const handleSubmit = useCallback(async () => {
    try {
      if (appointmentFiles.length > 0) {
        await api.post('appointment/files', {
          appointment_id: appointment.id,
          files: appointmentFiles,
        });

        addToast({
          type: 'success',
          title: 'Compromisso criado com sucesso',
        });
        closeWindow();
        getAppointments();
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar compromisso',
        description: 'Tente novamente!',
      });
      throw new Error(err);
    }
  }, [addToast, closeWindow, appointment, appointmentFiles, getAppointments]);

  const handleSelectedFile = useCallback(
    (e: IUserFileDTO) => {
      if (appointmentFiles.find(file => file.id === e.id)) {
        const xFiles = appointmentFiles.filter(xFile => xFile.id !== e.id);
        const xSelected = alreadySelected.filter(
          xSelect => xSelect.id !== e.id,
        );
        setAlreadySelected(xSelected);
        setAppointmentFiles(xFiles);
        setFiles(false);
      } else {
        const xFiles = appointmentFiles;
        xFiles.push(e);
        setAppointmentFiles(xFiles);
        setAlreadySelected([...alreadySelected, e]);
        setFiles(false);
      }
    },
    [appointmentFiles, alreadySelected],
  );

  return (
    <WindowUnFormattedContainer
      onHandleCloseWindow={closeWindow}
      containerStyle={{
        zIndex: 15,
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
      }}
    >
      <Container>
        <p>Filees do compromisso</p>
        {alreadySelected.length > 0 ? (
          alreadySelected.map(xFile => {
            return <p key={xFile.id}>{xFile.file_name}</p>;
          })
        ) : (
          <p>Este compromisso ainda não tem filees</p>
        )}
        <strong>Filees selecionados:</strong>
        {appointmentFiles.map(file => {
          return <p key={file.id}>{file.file_name}</p>;
        })}
        <button type="button" onClick={() => setFiles(true)}>
          Adicionar filees
        </button>
        {appointmentFiles.length > 0 && (
          <button type="button" onClick={handleSubmit}>
            Salvar
          </button>
        )}
      </Container>
      {files && (
        <SelectUserFileWindow
          onHandleCloseWindow={() => setFiles(false)}
          handleCloseWindow={() => setFiles(false)}
          initialCategory="All"
          selectUserFile={(e: IUserFileDTO) => handleSelectedFile(e)}
        />
      )}
    </WindowUnFormattedContainer>
  );
};

export default AddAppointmentFilesWindow;
