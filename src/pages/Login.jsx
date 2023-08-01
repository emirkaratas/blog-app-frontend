import React from 'react'
import Layout from '../components/Layout'
import { Divider, IconButton, Stack, Typography, Alert } from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import CloseIcon from '@mui/icons-material/Close';
import { StyledTypography } from './Home';
import AppleIcon from '@mui/icons-material/Apple';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import { fetchLogin } from '../services/Api';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Parolanız En Az 6 Karakter Olmalıdır")
    .required("Zorunlu Bir Alan")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Rakam ve Özel Karakter İçermelidir"
    )
    .matches(
      /^(?=.*[a-z])/, "Küçük Harf Bulunmalıdır"
    )
    .matches(
      /^(?=.*[A-Z])/, "Büyük Harf Bulunmalıdır"
    ),
  email: yup
    .string()
    .email("Geçerli Bir Mail Giriniz")
    .required("Zorunlu Bir Alan"),
})

export const StyledPaperAuth = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    background: theme.palette.mode === 'light' && "linear-gradient(to bottom, #f57949 0%, #FDB093 70%);",
    borderRadius: "0",
    color: "white"
  },
  backgroundColor: theme.palette.mode === 'light' && '#F6F6F6',
}));

export const CustomTextFieldAuth = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& label.Mui-focused': {
      color: theme.palette.mode === "light" && 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.mode === "light" && 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.mode === "light" && 'rgba(0, 0, 0, .2)',
        transition: theme.palette.mode === "light" && ".25s border-color",
      },
      '&:hover fieldset': {
        borderColor: theme.palette.mode === "light" && "rgba(0, 0, 0, .4)",
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.mode === "light" && "rgba(0, 0, 0, .5)",
      },
      "&.MuiInputBase-root": {
        backgroundColor: theme.palette.mode === "light" && "rgba(247, 247, 247, .97)",
      },
    },
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: "15px",
  },
  '& :-webkit-autofill': {
    transitionDelay: "9999s"
  },
}));

function Login() {
  const handleSubmit = async (values, bag) => {
    try {
      const loginResponse = await fetchLogin()
      console.log(values)
    } catch (error) {
      bag.setErrors({ general: error })
    }
  }

  return (
    <Layout freeLayout={true}>
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} md={6} component={StyledPaperAuth} elevation={6}>
          <Grid container justifyContent="flex-end" sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton component={Link} to="/" sx={{ position: "absolute" }}>
              <CloseIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          </Grid>
          <Stack justifyContent="center" alignItems="center" sx={{
            mx: 4,
            height: "100%",
          }}>
            <Typography component="h1" variant="h5" sx={{ marginBottom: "5px" }}>
              Giriş Yap
            </Typography>
            <Stack direction="row" spacing={2} sx={{ width: { xs: "80%", md: "70%" }, marginY: "10px" }}>
              <IconButton
                component={Link}
                to="https://facebook.com"
                sx={{
                  height: "100%",
                  flexGrow: "1",
                  borderRadius: "10px",
                  backgroundColor: "#3b5998!important",
                  border: "1.2px solid transparent",
                  transition: ".3s ease-in-out",
                  ":hover": {
                    border: "1.2px solid",
                    borderColor: "primary.main"
                  }
                }}
              >
                <FacebookIcon sx={{ fontSize: "40px", color: "white" }} />
              </IconButton>
              <IconButton
                component={Link}
                to="https://google.com"
                sx={{
                  height: "100%",
                  flexGrow: "1",
                  borderRadius: "10px",
                  backgroundColor: "white!important",
                  border: "1.2px solid transparent",
                  transition: ".3s ease-in-out",
                  ":hover": {
                    border: "1.2px solid",
                    borderColor: "primary.main"
                  }
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 40,
                    color: 'white',
                    cursor: "pointer",

                  }}
                  alt="Logo"
                  src={"https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"}
                />
              </IconButton>
              <IconButton
                component={Link}
                to="https://apple.com"
                sx={{
                  height: "100%",
                  flexGrow: "1",
                  borderRadius: "10px",
                  backgroundColor: "black!important",
                  border: "1.2px solid transparent",
                  transition: ".3s ease-in-out",
                  ":hover": {
                    border: "1.2px solid",
                    borderColor: "primary.main"
                  }
                }}
              >
                <AppleIcon sx={{ fontSize: "40px", color: "white" }} />
              </IconButton>
            </Stack>
            <Stack direction="row" sx={{ width: { xs: "80%", md: "70%" }, marginTop: "5px", overflow: "hidden" }} justifyContent="center" alignItems="center" spacing={1}>
              <Divider sx={{ width: "100%" }} />
              <Typography sx={{ marginX: "3px" }}>Veya</Typography>
              <Divider sx={{ width: "100%" }} />
            </Stack>
            <Formik initialValues={{ email: '', password: '', rememberMe: 'false' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {
                ({ errors, touched, handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: { xs: "80%", md: "70%" } }}>
                    <Stack>
                      {
                        errors.general && (
                          <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {errors.general}
                          </Alert>
                        )
                      }
                      <CustomTextFieldAuth
                        margin="normal"
                        sx={{ color: "black" }}
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                      />
                      {errors.email && touched.email && <Typography variant="caption" color="error.main">{errors.email}</Typography>}
                      <CustomTextFieldAuth
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Şifre"
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                      />
                      {errors.password && touched.password && <Typography variant="caption"  color="error.main">{errors.password}</Typography>}
                      <FormControlLabel
                        control={<Checkbox value={values.rememberMe}  sx={{ color:{xs:"white",md:"inherit"} } } color="primary" onChange={handleChange} id='rememberMe' name="rememberMe" />}
                        label="Beni Hatırla"
                      />
                    </Stack>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1.5, mb: 1, color: "white" }}
                    >
                      Giriş Yap
                    </Button>
                    <Stack direction={{ xs: "column", md: "row" }} sx={{ marginTop: "5px" }} justifyContent="space-between" alignItems="center">
                      <StyledTypography>
                        Şifremi unuttum
                      </StyledTypography>
                      <StyledTypography component={Link} to="/register">
                        Hesabın yok mu? Kayıt ol
                      </StyledTypography>
                    </Stack>
                  </Box>
                )
              }
            </Formik>
          </Stack>
        </Grid>
        <Grid item xs={false} md={6}
          sx={{
            backgroundImage: 'url(https://img.freepik.com/premium-vector/new-design-orange-wave-abstract-background-abstract-gradient-orange-background-vector_113494-197.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: "no-repeat",
            backgroundPosition: 'right bottom',
          }}
        >
          <Grid container justifyContent="flex-end" sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton component={Link} to="/">
              <CloseIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Login