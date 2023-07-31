
import styled from 'styled-components'

export const StyledContainer = styled.div`
  width: 100%;
  max-width: 500px;
  border: 1px solid #C1C2C5;
  border-radius: 8px;
  padding: 12px;
  background-color: #D0EBFF;
  &:hover {
      background-color: #C1C2C5;
  }
  &[data-is-assigned='true'] {
      background-color: #FF8787;
      border-radius: 6px;
   }
   &[data-is-mark-complete='true'] {
      background-color: #F1F3F5;
      color: #ADB5BD;
      pointer-events: none
   }
`
