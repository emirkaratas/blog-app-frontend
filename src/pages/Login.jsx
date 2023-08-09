import React from 'react'
import { Divider, IconButton, Stack, Typography, Alert } from '@mui/material'
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import { StyledTypography } from './Home';
import AppleIcon from '@mui/icons-material/Apple';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import { Formik } from 'formik';
import { fetchLogin } from '../services/Api';
import AuthLayout, { CustomTextFieldAuth } from '../components/AuthLayout';

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
    <AuthLayout>
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
                  variant='filled'
                  InputProps={{ disableUnderline: true }}
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
                  variant='filled'
                  InputProps={{ disableUnderline: true }}
                  sx={{ marginTop: "8px" }}
                />
                {errors.password && touched.password && <Typography variant="caption" color="error.main">{errors.password}</Typography>}
                <FormControlLabel
                  control={<Checkbox value={values.rememberMe} sx={{ color: { xs: "white", md: "inherit" } }} color="primary" onChange={handleChange} id='rememberMe' name="rememberMe" />}
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
                <StyledTypography component={Link} to="/lost-password">
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
    </AuthLayout>
  )
}

export default Login