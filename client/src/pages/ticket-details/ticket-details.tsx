/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useTicketStore } from 'client/src/store/ticketStore';
import { TicketDetail } from 'client/src/components/TicketDetail';
import { IconChevronLeft } from '@tabler/icons-react';
import { Button, Title } from '@mantine/core';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

/* eslint-disable-next-line */
const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-direction: column;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

export function TicketDetails() {
  const navigate = useNavigate();
  const { ticket, getTicket, setTicket } = useTicketStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) getTicket(Number(id));
  }, [id]);

  return (
    <StyledContainer>
      <StyledButton>
        <Button
          leftIcon={<IconChevronLeft />}
          variant="white"
          onClick={() => {
            navigate('/');
            setTicket(undefined)
          }}
        />

        <Title order={2}> Ticket Details </Title>
      </StyledButton>

      {ticket?.data || !ticket?.isLoading ? (
        <TicketDetail ticket={ticket?.data} />
      ) : (
        '..'
      )}
    </StyledContainer>
  );
}

export default TicketDetails;
