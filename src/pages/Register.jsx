import React from 'react'
import { Alert, Divider, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { StyledTypography } from './Home';
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import AlertTitle from '@mui/material/AlertTitle';
import { Formik } from 'formik';
import { fetchRegister } from '../services/Api';
import AuthLayout,{ CustomTextFieldAuth }  from '../components/AuthLayout';

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
    const handleSubmit = async (values, bag) => {
        try {
            const registerResponse = await fetchRegister(values)
            console.log(values)
        } catch (error) {
            bag.setErrors({ general: error })
        }
    }

    return (
        <AuthLayout>
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
        </AuthLayout>
    )
}

export default Register