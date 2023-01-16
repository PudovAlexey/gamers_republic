import React, { useState, useContext } from 'react';
import { TextField, Box, Button, Paper, Typography } from '@mui/material';
import useFieldControl from '../../hooks/useFieldControl';
import { styleComponent } from './styles';
import { useTheme } from '@emotion/react';
import { MessageToast } from '../../components/reusable/MessageToast/MessageToast';
import api from '../../api/api/api';
import { checkAll } from '../../utils/validators/validators';
import { AuthContext } from '../../components/AuthContext/AuthContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { User } from '../../types/types';
import { AuthToast } from './types';
import AuthorLogo from '../../assets/main/AuthorLogo';

function LoginPage() {
  const [_, setUser] = useContext(AuthContext);
  const theme = useTheme();
  const { setItemByPath } = useLocalStorage();
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
    const validateValues = checkAll([
      { value: output?.email || '', type: 'email' },
      { value: output?.password || '', type: 'password' },
    ]);

    if (validateValues === true) {
      api.login(output).then((res?: User) => {
        if (res?.email) {
          setUser(res);
          setItemByPath('authToken', res.token);
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
      <Paper sx={styles.login}>
        <AuthorLogo size={110} />
        <Typography sx={styles.login.title} variant="h5">
          Login to start play
        </Typography>
        <Box sx={styles.login.inputBlock}>
          <TextField
            sx={styles.login.email}
            label="Email"
            type={'text'}
            {...record('email')}
          />
          <TextField
            label="Password"
            type={'password'}
            {...record('password')}
          />
          <Box sx={styles.login.passwordContainer}>
            <Button onClick={onResetPassword}>Forgot password</Button>
          </Box>
        </Box>
        <Box sx={styles.login.buttons}>
          <Button variant="contained" onClick={onLoginPress}>
            Login
          </Button>
          <MessageToast
            delay={3000}
            show={show}
            setShow={toggleMessageToast}
            title={title}
            message={message}
            severity={severity}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
