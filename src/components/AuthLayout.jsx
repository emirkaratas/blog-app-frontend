import React from 'react'
import Layout from '../components/Layout'
import { IconButton, Stack } from '@mui/material'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { CustomIconButton } from '../pages/Home';

export const StyledPaperAuth = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        background: theme.palette.mode === 'light' && "linear-gradient(to bottom, #f57949 0%, #FDB093 20%);",
        borderRadius: "0",
        color: "white"
    },
    backgroundColor: theme.palette.mode === 'light' && '#F6F6F6',
}));

export const CustomTextFieldAuth = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        '& label.Mui-focused': {
            color: theme.palette.mode === "light" && 'black'
        },
        '& .MuiFilledInput-root': {
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
    '& .MuiFilledInput-root': {
        borderRadius: "15px",
    },
    '& :-webkit-autofill': {
        transitionDelay: "9999s"
    },
}));

function AuthLayout({ children }) {
    const isDark = JSON.parse(localStorage.getItem("isDark")) || false
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
                        {children}
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
                            <CloseIcon sx={{ fontSize: "40px", color: "white" }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default AuthLayout