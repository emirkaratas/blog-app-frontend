import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Stack, Grid, Button, Divider, Alert } from '@mui/material'
import Modal from '@mui/material/Modal';
import * as yup from 'yup'
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { CustomIconButton } from '../pages/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AlertTitle from '@mui/material/AlertTitle';
import { Formik } from 'formik';
import { postResetPassword } from '../services/Api';
import { enqueueSnackbar } from 'notistack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:"80%", sm:"500px"},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
    passwordConfirm: yup
        .string()
        .required("Zorunlu Bir Alan")
        .oneOf([yup.ref("password")], "Parolalar Uyuşmuyor!"),
    oldPassword: yup
        .string()
        .required("Zorunlu Bir Alan")
})

function Profile({ openProfile, handleCloseProfile }) {
    const theme = useTheme();
    const isDark = theme.palette.mode == "dark"
    const handleSubmit = async (values, bag) => {
        try {
            const registerResponse = await postResetPassword(values)
            handleCloseProfile()
            enqueueSnackbar('Şifre Başarıyla Değiştirildi!', {
                variant: 'success',
                autoHideDuration: 2000,
            })
        } catch (error) {
            bag.setErrors({ general: error })
        }
    }
    return (
        <Modal
            aria-labelledby="profile-modal-title"
            aria-describedby="profile-modal-description"
            open={openProfile}
            onClose={handleCloseProfile}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={openProfile}>
                <Box sx={{ ...style, backgroundColor: isDark ? '#1A2027' : '#F9F9F9', borderRadius: "15px", border: "0", paddingTop: "18px" }}>
                    <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "12px" }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Profil
                        </Typography>
                        <CustomIconButton variant="contained" onClick={handleCloseProfile}>
                            <CloseIcon sx={{ fontSize: "30px" }} />
                        </CustomIconButton>
                    </Stack>
                    <Divider sx={{ marginBottom: "24px" }} />
                    <Stack flexDirection="row" alignItems="center" sx={{ mt: 2 }}>
                        <Typography id="transition-modal-description" >
                            Kullanıcı Adı :
                        </Typography>
                        <Chip label="emirkaratas" sx={{ ml: 2 }} />
                    </Stack>
                    <Grid container alignItems="center" gap={1} sx={{ mt: 2 }}>
                        <Typography id="transition-modal-description" >
                            Roller :
                        </Typography>
                        <Chip label="Admin" />
                        <Chip label="Yazar" />
                    </Grid>
                    <Grid container alignItems="center" gap={1} sx={{ mt: 2 }}>
                        <Typography id="transition-modal-description" >
                            Email :
                        </Typography>
                        <Chip label="emir@mail.com" />
                    </Grid>
                    <Accordion sx={{ marginTop: "16px" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            id="change-password"
                        >
                            <Typography>Şifreyi Değiştir</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Formik initialValues={{ password: '', passwordConfirm: '', oldPassword: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                {
                                    ({ errors, touched, handleChange, handleSubmit, handleBlur, values, isSubmitting }) => (
                                        <Box component="form" noValidate onSubmit={handleSubmit}>
                                            <Stack>
                                                {
                                                    errors.general && (
                                                        <Alert severity="error" sx={{ marginBottom: 1 }}>
                                                            <AlertTitle>Error</AlertTitle>
                                                            {errors.general}
                                                        </Alert>
                                                    )
                                                }
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    name="oldPassword"
                                                    label="Eski Şifre"
                                                    type="password"
                                                    id="oldPassword"
                                                    value={values.oldPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.oldPassword && Boolean(errors.oldPassword)}
                                                />
                                                {errors.oldPassword && touched.oldPassword && <Typography variant="caption" color="error.main">{errors.oldPassword}</Typography>}

                                                <TextField
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
                                                {errors.password && touched.password && <Typography variant="caption" color="error.main">{errors.password}</Typography>}
                                                <TextField
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
                                                />
                                                {errors.passwordConfirm && touched.passwordConfirm && <Typography variant="caption" color="error.main">{errors.passwordConfirm}</Typography>}
                                            </Stack>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="outlined"
                                                sx={{ mt: 1.5, mb: 1 }}
                                            >
                                                Şifreyi Değiştir
                                            </Button>
                                        </Box>
                                    )
                                }
                            </Formik>
                        </AccordionDetails>
                    </Accordion>
                    <Divider sx={{ marginTop: "24px", marginBottom: "0" }} />
                    <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
                        <Button variant='contained' startIcon={<LogoutIcon sx={{ color: isDark ? "white" : "black" }} />} sx={{ borderRadius: 10 }} >
                            <Typography color={isDark ? "white" : "black"}>Çıkış Yap</Typography>
                        </Button>
                    </Grid>

                </Box>
            </Fade>
        </Modal>
    )
}

export default Profile