import React from 'react';
import { Box } from '@mui/material';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import HomeIcon from '@mui/icons-material/Home';
import error404 from "../assets/error404.json"
import { CustomIconButton } from './Home';

function NotFound() {
    const style = {
       
    }
    return (
        <Layout freeLayout={true}>
            <CustomIconButton component={Link} to="/" sx={{ position: "absolute", left: 0, margin: "8px" }}>
                <HomeIcon sx={{ fontSize: "48px", transition: ".3s all",color:"white",":hover":{
                    color:"#f57949"
                } }} />
            </CustomIconButton>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: "url(../src/assets/images/not_found.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    overflow: "hidden",
                    paddingRight:{xs:3,sm:4,md:4}
                }}
            >
                <Lottie animationData={error404} loop={true} style={style} />
            </Box>
        </Layout>
    )
}

export default NotFound