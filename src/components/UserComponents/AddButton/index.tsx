import React, { ButtonHTMLAttributes } from 'react';
import { FiLoader } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const AddButton: React.FC<ButtonProps> = ({ loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? <FiLoader size={30} /> : <MdAdd size={32} />}
  </Container>
);

export default AddButton;
