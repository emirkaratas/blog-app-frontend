import React from 'react'
import { Box, Stack, Alert, Divider } from '@mui/material'
import { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import AlertTitle from '@mui/material/AlertTitle';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as yup from 'yup'
import { Formik } from 'formik';
import { postForgotPassword } from '../services/Api';
import { enqueueSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { StyledTypography } from './Home';
import AuthLayout, { CustomTextFieldAuth } from '../components/AuthLayout';

const emailValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required("Zorunlu Bir Alan")
        .email("Geçerli Bir Mail Giriniz")
})

const userNameValidationSchema = yup.object().shape({
    userName: yup
        .string()
        .required("Zorunlu Bir Alan")
})

function ForgotPassword() {
    const [activeStep, setActiveStep] = useState(0)
    const [selectedOption, setSelectedOption] = useState("")
    const navigate = useNavigate()
    const steps = [
        { label: "Şifre Sıfırlama Yöntemini Seçiniz", options: [{ label: "Email ile Sıfırla", value: "email" }, { label: "Kullancı Adı ile Sıfırla", value: "userName" }] },
        { label: selectedOption == "" ? "Şifre Sıfırla" : selectedOption == "email" ? "Email Giriniz" : "Kullanıcı Adını Giriniz" }
    ]

    const handleNext = (option) => {
        setActiveStep((previous) => previous + 1)
        setSelectedOption(option.value)
    }
    const handlePrev = () => {
        setActiveStep((previous) => previous - 1)
        setSelectedOption("")
    }

    const handleSubmit = async (values, bag) => {
        try {
            const loginResponse = await postForgotPassword(values)
            console.log(loginResponse)
            handleNext({ value: "" })
            enqueueSnackbar('Şifre Sıfırlama Talebi Başarıyla Gönderildi. Mail Adresinizi Kontrol Edin!', {
                variant: 'success',
                autoHideDuration: 2000,
            }),
                await new Promise(resolve => setTimeout(resolve, 2500));
            enqueueSnackbar('Ana Sayfaya Yönlendiriliyorsunuz!', {
                variant: 'success',
                autoHideDuration: 2000,
            })
            await new Promise(resolve => setTimeout(resolve, 2500));
            navigate("/")
        } catch (error) {
            bag.setErrors({ general: error })
        }
    }
    return (
        <AuthLayout>
            <Typography component="h1" variant="h5" sx={{ marginBottom: "5px" }}>
                Şifre Sıfırla
            </Typography>
            <Divider sx={{ width: { xs: "100%", sm: "80%", md: "70%" }, mb: 4, mt: 1 }} />
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: { xs: "100%", sm: "80%", md: "70%" } }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>
                            <Typography color="white">{step.label}</Typography>
                        </StepLabel>
                        <StepContent>
                            {
                                step.options != undefined && <Stack direction="row" justifyContent="space-evenly">
                                    {
                                        step.options.map((option, index) => <Button
                                            key={index + option.label}
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 2, mr: 1, color: "white" }}
                                            onClick={() => handleNext(option)}>
                                            {option.label}
                                        </Button>)
                                    }
                                </Stack>
                            }
                            {
                                index === 1 &&
                                <Formik initialValues={{ email: '', userName: '' }} validationSchema={selectedOption == "email" ? emailValidationSchema : userNameValidationSchema} onSubmit={handleSubmit} >
                                    {
                                        ({ errors, touched, handleChange, handleSubmit, handleBlur, values }) => (
                                            <Box sx={{mt:1}} component="form" noValidate onSubmit={handleSubmit} >
                                                <Stack>
                                                    {
                                                        errors.general && (
                                                            <Alert severity="error">
                                                                <AlertTitle>Error</AlertTitle>
                                                                {errors.general}
                                                            </Alert>
                                                        )
                                                    }
                                                    <Box sx={{ display: !(selectedOption == "email") ? "none" : "block" }}>
                                                        <CustomTextFieldAuth
                                                            margin="normal"
                                                            sx={{ color: "black", mt: 1 }}
                                                            fullWidth
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            variant='filled'
                                                            InputProps={{ disableUnderline: true }}
                                                            id="email"
                                                            label="Email"
                                                            name="email"
                                                            value={values.email}
                                                            error={touched.email && Boolean(errors.email)}

                                                        />
                                                        {errors.email && touched.email && <Typography variant="caption" color="error.main">{errors.email}</Typography>}
                                                    </Box>
                                                    <Box sx={{ display: !(selectedOption == "userName") ? "none" : "block" }}>
                                                        <CustomTextFieldAuth
                                                            margin="normal"
                                                            sx={{ color: "black", mt: 1 }}
                                                            fullWidth
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            variant='filled'
                                                            InputProps={{ disableUnderline: true }}
                                                            id="userName"
                                                            label="Kullanıcı Adı"
                                                            name="userName"
                                                            value={values.userName}
                                                            error={touched.userName && Boolean(errors.userName)}
                                                        />
                                                        {errors.userName && touched.userName && <Typography variant="caption" color="error.main">{errors.userName}</Typography>}
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-evenly">
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        fullWidth
                                                        sx={{ mt: 1, mr: 1, color: "white" }}
                                                    >
                                                        Sıfırla
                                                    </Button>
                                                    {
                                                        index === steps.length - 1 && <Button
                                                            onClick={handlePrev}
                                                            sx={{ mt: 1, color: "white" }}
                                                            variant="contained"
                                                            fullWidth
                                                        >
                                                            Geri Dön
                                                        </Button>
                                                    }
                                                </Stack>
                                            </Box>
                                        )
                                    }
                                </Formik>
                            }
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            <Stack sx={{ mt: 4 }} justifyContent="space-between" alignItems="center">
                <StyledTypography component={Link} to="/login">
                    Giriş Yapma Ekranına Dön
                </StyledTypography>
            </Stack>
        </AuthLayout>
    )
}

export default ForgotPassword