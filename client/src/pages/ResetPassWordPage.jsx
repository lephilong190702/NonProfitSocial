import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    // Xử lý đặt lại mật khẩu ở đây
    if (password === confirmPassword) {
      // Thực hiện đặt lại mật khẩu
      alert('Mật khẩu đã được đặt lại thành công');
    } else {
      alert('Mật khẩu và xác nhận mật khẩu không trùng khớp');
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
