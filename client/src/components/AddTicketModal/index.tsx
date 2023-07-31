/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Button, Group, Modal, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useTicketStore } from 'client/src/store/ticketStore';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AddTicketModal = () => {
  const { getTicketList, addTicket } = useTicketStore();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      description: '',
    },
    validate: {
      description: (value: any) => (value.length < 2 ? 'Invalid description' : null),
    },
  });


  const handelSubmit = async (values: {description: string})=>{
    addTicket(values)
    getTicketList()
    toast('New Ticket is added');
    close()
  }

  useEffect(()=>{form.reset()},[opened])
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={6}>Create Ticket</Title>}
        closeOnClickOutside={false}
      >
        <form onSubmit={form.onSubmit((values) => handelSubmit(values))}>
        <TextInput
          withAsterisk
          label="Description"
          placeholder="Add ticket's description"
          {...form.getInputProps('description')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      </Modal>

      <Group position="center">
        <Button leftIcon={<IconPlus />} variant="outline" onClick={open}>
          Create ticket
        </Button>
      </Group>
    </>
  );
};

export { AddTicketModal };
