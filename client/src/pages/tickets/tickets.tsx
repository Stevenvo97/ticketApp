// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TicketContainer } from 'client/src/components/TicketContainer';
import { useTicketStore } from '../../store/ticketStore';
import { Title, Select } from '@mantine/core';
import { AddTicketModal } from '../../components/AddTicketModal';
import styled from 'styled-components';
import { Ticket } from '@acme/shared-models';
import { useEffect, useState } from 'react';

const StyledContainer = styled.div`
  width: 100%;
  max-width: 520px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function Tickets() {
  const { ticketList, filterValue, setFilter } =
    useTicketStore();

  const [dataList, setDataList]=useState(ticketList.data)

  const handleFilter = () => {
    if (filterValue === 'assigned') {
      const newFilter = ticketList.data.filter(
        (item: Ticket) => item.assigneeId != null
      );
      setDataList(newFilter);
    }
    else if (filterValue === 'completed') {
      const newFilter = ticketList.data.filter(
        (item: Ticket) => item.completed
      );
      setDataList(newFilter);
    }
    else if (filterValue === null)  setDataList(ticketList.data)
  };

  useEffect(() => {
    handleFilter();
  }, [filterValue]);

  return (
    <StyledContainer>
      <Title order={2}> Tickets </Title>
      <StyledTitle>
        <Select
          label="Filter"
          value={filterValue}
          clearable
          placeholder="Select filter"
          data={[
            { value: 'assigned', label: 'Assigned' },
            { value: 'completed', label: 'Completed' },
          ]}
          onChange={(e) => setFilter(e)}
        />
        <AddTicketModal />
      </StyledTitle>
      {dataList || ticketList.isLoading ? (
        <TicketContainer ticketList={dataList} />
      ) : (
        <span>...</span>
      )}
    </StyledContainer>
  );
}

export default Tickets;
