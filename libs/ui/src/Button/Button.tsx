import React from 'react';
import styled from 'styled-components';
import { type User } from '@art-nx/types';

const Styled = styled.button`
  background-color: red;
  color: white;
  font-size: 2rem;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: #000;
  }
`;

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: Props) => {
  const user: User = {
    id: '888141-asfaf-15fasd-551',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    age: 21,
  };

  return (
    <Styled onClick={onClick}>
      {children} - {user.id}
    </Styled>
  );
};

export default Button;
