import React, { useState } from 'react';
import { TextField, Box, Button, IconButton } from '@mui/material';
import useFieldControl from '../../hooks/useFieldControl';
import { styleComponent } from './styles';
import { useTheme } from '@emotion/react';
import { MessageToast } from '../../components/reusable/MessageToast/MessageToast';
import api from '../../api/api';
import { checkAll } from '../../utils/validators/validators';

function LoginPage({}) {
  const theme = useTheme();
  const styles = styleComponent(theme);
  const [record, output] = useFieldControl();
  const [{ show, message, title, severity }, setAuthToast] =
    useState<AuthToast>({
      show: false,
      message: '',
      title: '',
      severity: 'info',
    });

  function onLoginPress() {
    console.log('validation fail')
    const validateValues = checkAll([
      { value: output?.email || '', type: 'email' },
      { value: output?.password || '', type: 'password' },
    ]);

    if (validateValues === true) {
      api.login(output).then((res) => {
        if (res.email) {
          setAuthToast({
            show: true,
            message: 'Login Success',
            severity: 'success',
            title: 'Login message',
          });
        } else {
            setAuthToast({
                show: true,
                message: "Your data don't has in our records",
                severity: 'error',
                title: 'Login message',
              });
        }
    });
} else {
    const makeValidationMessages = validateValues.reduce(
      (acc, { message }) => acc + message,
      ''
    );
    setAuthToast({
      show: true,
      message: makeValidationMessages,
      severity: 'error',
      title: 'Validation Faild',
    });
}
  }

  function toggleMessageToast(isShow) {
    setAuthToast((prev) => ({
      ...prev,
      show: isShow,
    }));
  }

  function onResetPassword() {}

  return (
    <Box sx={styles.login.layout}>
      <Box sx={styles.login}>
        <TextField type={'text'} {...record('email')} />
        <TextField type={'password'} {...record('password')} />
        <Box>
          <IconButton onClick={onResetPassword}>Forgot password</IconButton>
          <IconButton onClick={onLoginPress}>Login</IconButton>
          <MessageToast
            delay={3000}
            show={show}
            setShow={toggleMessageToast}
            title={title}
            message={message}
            severity={severity}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
