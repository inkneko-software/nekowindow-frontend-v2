import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import React from 'react';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import theme from '@theme/theme';
interface LoginDialogProps {
  open: boolean,
  onClose: () => void
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordLoginTabSelected, setPasswordLoginTabSelected] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailCode, setEmailCode] = React.useState('');
  const [coolDownSeconds, setCoolDownSeconds] = React.useState(0)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }
  const handlePasswordLogin = () => {

  }
  var coolDownHandle: NodeJS.Timeout | null = null;
  const handleSendEmailCode = () => {
    if (coolDownHandle === null) {
      setCoolDownSeconds(60);
      var coolDownSecondsNumber = 60;
      coolDownHandle = setInterval(() => {
        coolDownSecondsNumber -= 1;
        setCoolDownSeconds(coolDownSecondsNumber);
        if (coolDownSecondsNumber === 0 && coolDownHandle !== null) {
          clearInterval(coolDownHandle);
        }
      }, 1000);
    }
  }
  const handleEmailCodeLogin = () => {

  }

  return (
    <Dialog open={open} onClose={onClose} sx={{ display: 'flex', flexDirection: 'column' }}>
      <IconButton sx={{ position: 'absolute', right: '16px', top: '16px' }} onClick={onClose}>
        <CloseOutlinedIcon />
      </IconButton>
      <DialogContent sx={{ padding: '32x 32px', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex' }}>
          <Button
            sx={{ margin: '16px auto', marginRight: '0px', color: !passwordLoginTabSelected ? '#888888' : theme.palette.primary.main }}
            size='large'
            startIcon={<LockOpenOutlinedIcon />}
            onClick={() => { setPasswordLoginTabSelected(true) }}
            disableRipple disableElevation disableTouchRipple
          >
            密码登录
          </Button>
          <Typography sx={{ margin: '16px 18px', color: '#888888' }} variant='h6'>|</Typography>
          <Button
            sx={{ margin: '16px auto', marginLeft: '0px', color: passwordLoginTabSelected ? '#888888' : theme.palette.primary.main }}
            size='large'
            startIcon={<EmailOutlinedIcon />}
            onClick={() => { setPasswordLoginTabSelected(false) }}
            disableRipple disableElevation disableTouchRipple
          >
            邮箱登录
          </Button>
        </Box>
        <OutlinedInput
          id="outlined-adornment-email"
          placeholder='请输入邮箱'
          size='small'
          type='text'
          sx={{ m: 1, width: '40ch' }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {
          passwordLoginTabSelected &&
          <>
            <OutlinedInput
              size='small'
              type={showPassword ? 'text' : 'password'}
              placeholder='请输入密码'
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={{ m: 1, width: '40ch' }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  <Button>忘记密码?</Button>
                </InputAdornment>
              }
            />
            <Box sx={{ display: 'flex' }}>
              <Button variant='outlined' sx={{ width: '22ch', margin: '8px 4px 8px auto' }} onClick={() => setPasswordLoginTabSelected(false)}>注册</Button>
              <Button variant='contained' sx={{ width: '22ch', margin: '8px auto 8px 4px' }} onClick={handlePasswordLogin}>登录</Button>
            </Box>
          </>
        }
        {
          !passwordLoginTabSelected &&
          <>
            <OutlinedInput
              size='small'
              type={showPassword ? 'text' : 'password'}
              placeholder='请输入验证码'
              value={emailCode}
              onChange={e => setEmailCode(e.target.value)}
              sx={{ m: 1, width: '40ch' }}
              endAdornment={
                <InputAdornment position="end">
                  <Button onClick={handleSendEmailCode} disabled={coolDownSeconds !== 0}>{coolDownSeconds === 0 ? '获取验证码' : coolDownSeconds}</Button>
                </InputAdornment>
              }
            />
            <Box sx={{ display: 'flex' }}>
              <Button variant='contained' sx={{ width: '45ch', margin: '8px auto ' }} onClick={handleEmailCodeLogin} type='submit'>登录 / 注册</Button>
            </Box>
          </>

        }

      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog;