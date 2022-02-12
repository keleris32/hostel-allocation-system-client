import { Alert, AlertTitle, Snackbar } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function ErrorAlert(props: any) {
  const handleClose = (): void => {
    props.setIsErrorAlertActive(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={props.isErrorAlertActive}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        onClick={handleClose}
        variant={props.variant}
        severity={props.severity}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        <AlertTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {props.title}
        </AlertTitle>
        {props.message}
      </Alert>
    </Snackbar>
  );
}
