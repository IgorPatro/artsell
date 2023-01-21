import styled from 'styled-components';
import { type User } from '@art-nx/types';
import { Ui } from '@art-nx/ui';

const StyledPage = styled.div``;

const user: User = {
  id: '888141-asfaf-15fasd-551',
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  age: 21,
};

export function Index() {
  return (
    <StyledPage>
      <Ui>
        <h1>Hello world! {user.name}</h1>
      </Ui>
    </StyledPage>
  );
}

export default Index;
