import React from 'react';
import { useModalVisible, useSelectedMail } from '../atoms/mail-atoms';
import { Button, Slide, Paper, Typography, Container, Box, Divider, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateString } from '../utils/misc';
import { useMailAPI } from '../hooks/useMailAPI';
import xss from 'xss';

const MailModal = () => {
  const [modalVisible, setModalVisible] = useModalVisible();
  const [selectedMail, setselectedMail] = useSelectedMail();
  const { deleteMail, updateMailButton } = useMailAPI();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  if (selectedMail === null) return null;

  const handleDeleteMail = () => {
    deleteMail(selectedMail.mailid)
      .then(() => {
        setModalVisible(false);
      })
      .catch(console.error);
  };

  const handleSubmitButton = () => {
    updateMailButton({
      mailid: selectedMail.mailid,
      button: selectedMail.button,
    })
      .then(() => {
        setModalVisible(false);
      })
      .catch(console.error);
  };

  const _handleClose = () => {
    setModalVisible(false);
  };

  const handleClearContent = () => {
    setselectedMail(null);
  };

  const sanitizedMessage = xss(selectedMail.message, {
    whiteList: {
      br: [],
      strong: [],
    },
  });

  return (
    <Slide
      direction="left"
      in={modalVisible}
      mountOnEnter
      unmountOnExit
      onExited={handleClearContent}
    >
      <Paper
        sx={{
          position: 'absolute',
          zIndex: 20,
          height: '100%',
          width: '100%',
          background: isDarkMode ? 'rgb(23 23 23 / 1)' : '#fafafa',
          overflow: 'auto'
        }}
        square
      >
        <Container>
          <Box>
            <Box pt={2} pb={1}>
              <Button
                size="large"
                startIcon={<ArrowBackIcon fontSize="large" />}
                onClick={_handleClose}
                sx={{
                  color: isDarkMode ? '#fff' : '#000',
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: 'transparent !important',
                  },
                }}
              >
                Go Back
              </Button>
            </Box>
            <Box pl={1} pb={'12px'}>
              <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>from: </span>
                {selectedMail.sender}
              </Typography>
              <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>subject: </span>
                {selectedMail.subject}
              </Typography>

              {selectedMail.date && (
                <Typography sx={{ fontSize: '15px', fontWeight: 600 }}>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>date: </span>
                  {dateString(selectedMail.date)}
                </Typography>
              )}
            </Box>
            <Divider />
            {selectedMail.message && (
              <Box
                pl={1}
                pt={'12px'}
                sx={{ fontSize: '18px' }}
                dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
              />
            )}
            <Box
              display="inline"
              p={1}
              sx={{ display: 'flex', gap: '15px', justifyContent: 'center' }}
            >
              {selectedMail.button !== undefined && selectedMail.button !== null && (
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleSubmitButton}
                  startIcon={<CheckIcon />}
                  sx={{ color: '#fff', background: '#2e7d32 !important'}}
                >
                  ACCEPT
                </Button>
              )}
              <Button
                color="error"
                variant="contained"
                onClick={handleDeleteMail}
                endIcon={<DeleteIcon />}
                sx={{
                  backgroundColor: `${theme.palette.error.main} !important`,
                  '&:hover': {
                    backgroundColor: `${theme.palette.error.dark} !important`,
                  },
                }}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>
    </Slide>
  );
};

export default MailModal;
