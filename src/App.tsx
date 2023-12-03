import React from 'react';
import { NuiProvider } from 'react-fivem-hooks';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './styles/header.styles';
import { IPhoneSettings } from '@project-error/npwd-types';
import { i18n } from 'i18next';
import { Theme, StyledEngineProvider, ThemeProvider, IconButton, Typography } from '@mui/material';
import MailList from './components/MailList';
import { RecoilEnv, RecoilRoot } from 'recoil';
import MailModal from './components/MailModal';
import { PhoneSnackbar } from './snackbar/PhoneSnackbar';
import SnackbarProvider from './snackbar/SnackbarProvider';
import { ArrowBack } from '@mui/icons-material';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const Container = styled.div<{ isDarkMode: any }>`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  overflow: auto;
  max-height: 100%;
  background-color: #fafafa;
  ${({ isDarkMode }) =>
    isDarkMode &&
    `
    background-color: rgb(23 23 23 / 1);
  `}
`;
interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const App = (props: AppProps) => {
  const history = useHistory();
  const isDarkMode = props.theme.palette.mode === 'dark';

  return (
    <RecoilRoot>
      <SnackbarProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={props.theme}>
            <PhoneSnackbar />
            <Container isDarkMode={isDarkMode}>
              <Header>
                <IconButton
                  sx={{ paddingLeft: '1.5rem', '&:hover': { backgroundColor: 'transparent' } }}
                  color='default'
                  onClick={() => history.goBack()}
                >
                  <ArrowBack />
                </IconButton>
                <Typography fontSize={24} color={isDarkMode ? 'white' : 'black'} fontWeight='bold'>
                  Mail
                </Typography>
              </Header>
              <MailModal />
              <MailList isDarkMode={isDarkMode} />
            </Container>
          </ThemeProvider>
        </StyledEngineProvider>
      </SnackbarProvider>
    </RecoilRoot>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
