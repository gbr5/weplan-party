import React, { createContext, useContext, useState } from 'react';
import IFileDTO from '../dtos/IFileDTO';

interface FilesContextType {
  editFileWindow: boolean;
  selectedFile: IFileDTO;
  handleSelectedFile: (data: IFileDTO) => void;
  handleEditFileWindow: () => void;
}

const FilesContext = createContext({} as FilesContextType);

const FilesProvider: React.FC = ({ children }) => {
  const [editFileWindow, setEditFileWindow] = useState(false);
  const [selectedFile, setSelectedFile] = useState({} as IFileDTO);

  function handleSelectedFile(data: IFileDTO): void {
    setSelectedFile(data);
  }

  function handleEditFileWindow(): void {
    setEditFileWindow(!editFileWindow);
  }

  return (
    <FilesContext.Provider
      value={{
        selectedFile,
        editFileWindow,
        handleSelectedFile,
        handleEditFileWindow,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

function useFiles(): FilesContextType {
  const context = useContext(FilesContext);

  if (!context)
    throw new Error('useFiles must be used within an AuthProvider!');
  return context;
}

export { FilesProvider, useFiles };
