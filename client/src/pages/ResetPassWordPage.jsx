import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';
import ApiConfig, { endpoints } from '../configs/ApiConfig';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const[q] = useSearchParams();

  const nav = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      const email = q.get("email");
      const apiUrl = `${endpoints['set-password']}?email=${email}&newPassword=${password}`;
      const res = ApiConfig.put(apiUrl);
      if (res.status === 200) {
        nav("/login");
      }
      
      alert('Mật khẩu đã được đặt lại thành công');
    } else {
      setErrorMessage('Mật khẩu và xác nhận mật khẩu không trùng khớp');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Đặt lại mật khẩu
      </Typography>
      <TextField
        label="Mật khẩu mới"
        type="password"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
        margin="normal"
      />
      <TextField
        label="Xác nhận mật khẩu"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        margin="normal"
      />
      {errorMessage && (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleResetPassword}
      >
        Đặt lại mật khẩu
      </Button>
    </Container>
  );
};

export default ResetPasswordPage;
