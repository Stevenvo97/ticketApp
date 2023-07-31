import { Ticket as TicketType } from '@acme/shared-models';
import { StyledContainer } from './index.styled';
import { Ticket } from '../Ticket';

export type Props = {
  ticketList: TicketType[];
};

const TicketContainer = ({ ticketList }: Props) => {
  return (
    <StyledContainer>
      {
        ticketList.map((t,idx) => 
          <Ticket key={`${idx}${t?.id || 'undefined'}ticket`} ticket={t} />
        )
      }
    </StyledContainer>
  );
};

export { TicketContainer };
