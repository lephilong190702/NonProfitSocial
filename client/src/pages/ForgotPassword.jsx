import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Grid } from '@material-ui/core';
import ApiConfig, { endpoints } from '../configs/ApiConfig';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo một đối tượng chứa dữ liệu cần gửi lên server
    const requestData = {
      email: email,
    };

    // Sử dụng `ApiConfig.endpoint` để xây dựng URL
    const apiUrl = `${ApiConfig.endpoints["c"]}${endpoints.forgotPassword}`;

    // Sử dụng axios để gửi yêu cầu PUT đến API
    axios.put(apiUrl, requestData)
      .then((response) => {
        // Xử lý phản hồi thành công ở đây, có thể đặt isEmailSent thành true
        setIsEmailSent(true);
      })
      .catch((error) => {
        // Xử lý lỗi ở đây nếu có
        console.error('Lỗi khi gửi yêu cầu:', error);
      });
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
              <form onSubmit={handleSubmit}>
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
                  type="submit"
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
