import { Ticket } from '@acme/shared-models'
import produce from 'immer'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'


export type TicketState = {
  //filter
  filterValue: string | null
  setFilter: (payload: string| null) => void

  // Ticket List
  ticketList: {
    isLoading: boolean
    data: Ticket[] | []
  };
  setTicketList: (payload: Ticket[]) => void
  setIsLoadingTicketList: (payload: boolean) => void
  getTicketList: () => void

  // Ticket detail
  ticket: {
    isLoading: boolean
    data: Ticket | undefined
  };
  setTicket: (payload: Ticket| undefined ) => void
  setIsLoadingTicket: (payload: boolean) => void
  getTicket: (payload: number) => void

  addTicket: (payload: { description: string }) => void
  markedOfComplete: (id: string) => void
  unmarkedOfComplete: (id: string) => void

  assignToUser: (ticketId: string, userId: string) => void
  unassign: (ticketId: string) => void

}

const useTicketStore = create<TicketState>()(
  devtools(
    persist(
      (set) => ({
        // initial State
        filterValue: null,
        setFilter: (payload: string | null) => {
          set(
            produce((state) => {
              state.filterValue = payload
            }),
          )
        },
        ticketList: {
          isLoading: false,
          data: [],
        },
        ticket: {
          isLoading: false,
          data: undefined,
        },
        setTicketList: (payload: Ticket[]) => {
          set(
            produce((state) => {
              state.ticketList.data = payload
            }),
          )
        },
        setIsLoadingTicketList: (payload: boolean) => {
          set(
            produce((state) => {
              state.ticketList.isLoading = payload
            }),
          )
        },
        getTicketList: async () => {
          set(
            produce((state) => {
              state.ticketList.isLoading = true
            }),
          )
          const res = await fetch('/api/tickets').then();
          set({
            ticketList: {
              isLoading: false,
              data: await res.json(),
            },
          })
        },
        setTicket: (payload: Ticket| undefined) => {
          set(
            produce((state) => {
              state.ticket.data = payload
            }),
          )
        },
        setIsLoadingTicket: (payload: boolean) => {
          set(
            produce((state) => {
              state.ticket.isLoading = payload
            }),
          )
        },
        getTicket: async (payload) => {
          set(
            produce((state) => {
              state.ticket.isLoading = true
            }),
          )
          const res = await fetch(`/api/tickets/${payload}`).then();
          set({
            ticket: {
              isLoading: false,
              data: await res.json(),
            },
          })
        },
        addTicket: async (payload: { description: string }) => {
          await fetch(`/api/tickets`, {
            method: 'POST', body: JSON.stringify(payload)
          }).then();
        },
        markedOfComplete: (id: string) => {
          fetch(`/api/tickets/${id}/complete`, {
            method: 'PUT'
          }).then();
        },
        unmarkedOfComplete: (id: string) => {
          fetch(`/api/tickets/${id}/complete`, {
            method: 'DELETE'
          }).then();
        },
        assignToUser: (ticketId: string, userId: string) => {
          fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
            method: 'PUT'
          }).then();
        },
        unassign: (ticketId: string) => {
          fetch(`/api/tickets/${ticketId}/unassign`, {
            method: 'PUT'
          }).then();
        },
      }),
      {
        name: 'ticket-storage', // name of item in the storage (must be unique)
      },
    ),
    { name: 'TicketStore' },
  ),
)

const initializeTicketStore = () => useTicketStore

export { initializeTicketStore, useTicketStore }
