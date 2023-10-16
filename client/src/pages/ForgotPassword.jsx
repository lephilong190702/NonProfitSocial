import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid } from '@material-ui/core';
import ApiConfig, { endpoints } from '../configs/ApiConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async () => {
    const apiUrl = `${endpoints['forgot-password']}?email=${email}`;
    try {
      const response = await ApiConfig.put(apiUrl);
      if (response.status === 200) {
        setIsEmailSent(true); // Đánh dấu rằng email đã được gửi
      } else {
        // Xử lý khi có lỗi
      }
    } catch (error) {
      // Xử lý khi có lỗi kết nối với máy chủ
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Quên mật khẩu
            </Typography>
          </Grid>
          {isEmailSent ? (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                Một email đã được gửi đến địa chỉ của bạn với hướng dẫn đặt lại mật khẩu.
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={handleResetPassword}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Gửi Email
                </Button>
              </form>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
