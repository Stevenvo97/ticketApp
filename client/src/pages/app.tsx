import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Tickets from './tickets/tickets';
import TicketDetails from './ticket-details/ticket-details';
import styled from 'styled-components';
import { useTicketStore } from '../store/ticketStore';
import { useUserStore } from '../store/userStore';
import { Title } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StyledContainer = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-direction: column;
`;

const App = () => {

  const { getTicketList } = useTicketStore();
  const { getUserList } = useUserStore();

  useEffect(() => {
    getTicketList();
    getUserList();
  }, []);

  return (
    <StyledContainer>
      <Title order={1}> Ticketing App </Title>
      <Routes>
        <Route path="/" element={<Tickets />} />
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
      <ToastContainer />
    </StyledContainer>
  );
};

export default App;
