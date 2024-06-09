import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';


const StyledCircularProgress = styled(CircularProgress)`
    display: block !important;
    margin: 0 auto 30px auto;
    color: ${(props) => props.theme.colors.secondary} !important;
    stroke-linecap: round;
    border-radius: 50%;
    width: 48px !important;
    height: 48px !important;
`

export default function StyledProgress() {
  return (
    <StyledCircularProgress />
  )
}
