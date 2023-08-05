import React from 'react'
import Layout from '../components/Layout'
import { Alert, Divider, IconButton, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { CustomIconButton, StyledTypography } from './Home';
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import AlertTitle from '@mui/material/AlertTitle';
import { Formik } from 'formik';
import { fetchRegister } from '../services/Api';
import { CustomTextFieldAuth, StyledPaperAuth } from './Login';

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
    passwordConfirm: yup
        .string()
        .required("Zorunlu Bir Alan")
        .oneOf([yup.ref("password")], "Parolalar Uyuşmuyor!"),
    userName: yup
        .string()
        .required("Zorunlu Bir Alan"),
    agreeTerms: yup
        .boolean()
        .required("Kullanıcı Sözleşmesini Kabul Etmek Zorunludur")
        .oneOf([true], "Kullanıcı Sözleşmesini Kabul Etmek Zorunludur"),
})

function Register() {
    const isDark = JSON.parse(localStorage.getItem("isDark")) || false
    const handleSubmit = async (values, bag) => {
        try {
            const registerResponse = await fetchRegister(values)
            console.log(values)
        } catch (error) {
            bag.setErrors({ general: error })
        }
    }

    return (
        <Layout freeLayout={true}>
            <Grid container sx={{ height: '100vh' }}>
                <Grid item xs={12} md={6} component={StyledPaperAuth} elevation={6}>
                    <Grid container justifyContent="space-between" sx={{ display: { xs: "flex", md: "none" } }}>
                        <Box
                            component="img"
                            sx={{
                                height: { xs: 48, sm: 60 },
                                width: { xs: 48, sm: 60 },
                                objectFit: "cover",
                                color: 'white',
                                cursor: "pointer",
                                position: "absolute",
                                margin: "8px"
                            }}
                            onClick={() => navigate("/")}
                            alt="Logo"
                            src={"https://images.prismic.io/userzoom/7d6cc26c-b2fa-446f-aec8-149568e4e56c_Zooie.png?auto=compress,format"}
                        />
                        {
                            isDark
                                ?
                                <CustomIconButton component={Link} to="/" sx={{ position: "absolute", right: 0, margin: "8px" }}>
                                    <CloseIcon sx={{ fontSize: "30px" }} />
                                </CustomIconButton>
                                :
                                <IconButton component={Link} to="/" sx={{ position: "absolute", right: 0, margin: "8px" }}>
                                    <CloseIcon sx={{ fontSize: "30px", color: "white" }} />
                                </IconButton>
                        }
                    </Grid>
                    <Stack justifyContent="center" alignItems="center" sx={{
                        mx: 4,
                        height: "100%",
                    }}>
                        <Typography component="h1" variant="h5" sx={{ marginBottom: "5px" }}>
                            Kayıt Ol
                        </Typography>
                        <Divider sx={{ width: { xs: "80%", md: "70%" }, marginTop: "5px" }} />
                        <Formik initialValues={{ email: '', password: '', passwordConfirm: '', agreeTerms: '', userName: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                                                name="userName"
                                                label="Kullanıcı Adı"
                                                type="text"
                                                id="userName"
                                                value={values.userName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.userName && Boolean(errors.userName)}
                                                variant='filled'
                                                InputProps={{ disableUnderline: true }}
                                            />
                                            {errors.userName && touched.userName && <Typography variant="caption" color="error.main">{errors.userName}</Typography>}
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
                                            />
                                            {errors.password && touched.password && <Typography variant="caption" color="error.main">{errors.password}</Typography>}
                                            <CustomTextFieldAuth
                                                margin="normal"
                                                fullWidth
                                                name="passwordConfirm"
                                                label="Şifreyi Tekrar Girin"
                                                type="password"
                                                id="passwordConfirm"
                                                value={values.passwordConfirm}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                                                variant='filled'
                                                InputProps={{ disableUnderline: true }}
                                            />
                                            {errors.passwordConfirm && touched.passwordConfirm && <Typography variant="caption" color="error.main">{errors.passwordConfirm}</Typography>}

                                            <FormControlLabel
                                                control={<Checkbox value={values.agreeTerms} sx={{ color: { xs: "white", md: "inherit" } }} color="primary" onBlur={handleBlur} onChange={handleChange} id='agreeTerms' name="agreeTerms" error={touched.agreeTerms && errors.agreeTerms} />}
                                                label="Kullanıcı Sözleşmesini Kabul Ediyorum"
                                                sx={{ marginTop: { xs: "10px", md: "0px" } }}
                                            />
                                            {errors.agreeTerms && touched.agreeTerms && <Typography variant="caption" color="error.main">{errors.agreeTerms}</Typography>}
                                        </Stack>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 1.5, mb: 1, color: "white" }}
                                        >
                                            Kayıt Ol
                                        </Button>
                                        <Stack direction="row" sx={{ marginTop: "5px" }} justifyContent="center">
                                            <StyledTypography component={Link} to="/login">
                                                Hesabın var mı? Giriş Yap
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

export default Register