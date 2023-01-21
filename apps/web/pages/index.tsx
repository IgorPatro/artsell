import React from 'react';
import styled from 'styled-components';
import { type User } from '@art-nx/types';
import { Ui, Button } from '@art-nx/ui';
import { type GetServerSideProps } from 'next';

const StyledPage = styled.div``;

const user: User = {
  id: '888141-asfaf-15fasd-551',
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  age: 21,
};

export function Index({ data }) {
  return (
    <StyledPage>
      <Ui>
        <h1>Hello world! {user.name}</h1>
      </Ui>
      <Button onClick={() => console.log('This is my test func!')}>
        Click me!
      </Button>
      {data
        ? data.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
            </div>
          ))
        : 'Brak danych :C'}
    </StyledPage>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();

  if (!res.ok) {
    return {
      props: {
        data: null,
      },
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
};
