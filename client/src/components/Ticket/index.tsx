import { StyledContainer } from './index.styled';
import { Ticket } from '@acme/shared-models';
import { Title } from '@mantine/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useNavigate } from 'react-router-dom';

export type Props = {
  ticket: Ticket;
  onHandleWatchDetail?: (o: Ticket) => void;
};

const Ticket = ({ ticket }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ticket.id}`);
  };

  return (
    <StyledContainer onClick={handleClick}>
      <Title order={4}>
        {' '}
        {!ticket?.description ? '...' : ticket.description}{' '}
      </Title>
      {ticket.completed && (
        <Title order={5} color="blue">
          {' '}
          COMPLETED{' '}
        </Title>
      ) }{ ticket.assigneeId != null && (
        <Title order={5} color="gray">
          {' '}
          ASSIGNED{' '}
        </Title>
      )}
    </StyledContainer>
  );
};

export { Ticket };
