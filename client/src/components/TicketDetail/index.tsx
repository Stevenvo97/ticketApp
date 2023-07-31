/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { StyledContainer, StyledDescription } from './index.styled';
import { Ticket } from '@acme/shared-models';
import { Select, Switch, Title } from '@mantine/core';
import { useTicketStore } from 'client/src/store/ticketStore';
import { useUserStore } from 'client/src/store/userStore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type Props = {
  ticket?: Ticket;
};

const TicketDetail = ({ ticket }: Props) => {
  const { userList } = useUserStore();
  const {
    getTicketList,
    assignToUser,
    unassign,
    getTicket,
    markedOfComplete,
    unmarkedOfComplete,
  } = useTicketStore();

  const [checked, setChecked] = useState(ticket?.completed);
  const [assign, setAssign] = useState<any>(null);

  if (!ticket) return <></>;

  const handleAssign = async (id: any) => {
    setAssign(id)
    if (!id) {
      unassign(ticket.id.toString());
      toast('Ticket mark unassigned');
    } else {
      assignToUser(ticket.id.toString(), id.toString());
      toast('Ticket is assigned');
    }
    getTicketList()
  };

  const users =
    userList?.length > 0
      ? userList.map((user) => ({
          value: user.id.toString(),
          label: user.name,
        }))
      : [];

  const handleChangeCompleted = (marked: boolean) => {
    setChecked(marked);
    if (marked) {
      markedOfComplete(ticket.id.toString());
      toast('Ticket is completed');
    } else {
      unmarkedOfComplete(ticket.id.toString());
      toast('Ticket is uncompleted');
    }
    getTicket(ticket.id);
    getTicketList()
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    if (ticket?.assigneeId)
    setAssign(ticket?.assigneeId?.toString())
  },[ticket?.assigneeId])

  return (
    <StyledContainer data-is-mark-complete="" data-is-assigned="">
      <Switch
        checked={checked}
        label={
          checked ? 'Mark ticket as incomplete' : 'Mark ticket as complete'
        }
        onChange={(event) => handleChangeCompleted(event.currentTarget.checked)}
      />
      <StyledDescription>
        <Title order={3}>{ticket.description}</Title>
        {users && (
          <Select
            //disable when ticket is completed
            disabled={checked}
            value={assign}
            clearable
            placeholder="Assign To"
            data={users}
            onChange={(e) =>
               handleAssign(e)
              }
          />
        )}
      </StyledDescription>
    </StyledContainer>
  );
};

export { TicketDetail };
