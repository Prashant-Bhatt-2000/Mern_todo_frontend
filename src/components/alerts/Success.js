import React from 'react';
import { Alert, IconButton } from '@mui/material';
import { AlertTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Success = ({ message }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            width: '50%', 
            margin: 'auto', 
            marginTop: '20px', 
          }}
        >
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      )}
    </>
  );
};

export default Success;
