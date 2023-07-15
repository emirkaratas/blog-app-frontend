import { Box, Divider, Grid, Stack, Typography, Button, IconButton } from '@mui/material';
import React from 'react'
import { CustomIconButton, Item } from '../pages/Home';
import BlogItem from './BlogItem';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

function SideBar() {
    const categories = { "Yazılım": "/posts?category=yazilim", "Donanım": "/posts?category=donanim", "Oyun": "/posts?category=oyun", "Otomobil": "/posts?category=otomobil", "Yaşam": "/posts?category=yasam", "Müzik": "/posts?category=muzik", "Film & Dizi": "/posts?category=film-dizi", "Giyilebilir Teknoloji": "/posts?category=giyilebilir-teknoloji" }
    const isMobile = window.innerWidth < 768;
    return (
        <Grid item xs={12} md={4} order={{ xs: 1 }} >
            <Item sx={{ borderRadius: "10px", padding: "10px" }} >
                <Typography variant="h6" gutterBottom>
                    Kategoriler
                </Typography>
                <Box display="flex"
                    justifyContent="center"
                    component="div"
                    sx={{ display: 'inline' }}
                    alignItems="center">
                    {
                        Object.keys(categories).map((category) => {
                            const key = categories[category];
                            return <Button variant="outlined" sx={{ margin: "2px" }} component={Link} to={`${key}`} key={key} state={{ cat: category }}>
                                {category}
                            </Button>
                        })
                    }
                </Box>
                <Divider sx={{ marginTop: "16px" }} />
                <Typography variant="h6" gutterBottom sx={{ marginTop: "16px" }}>
                    Önerilen Yazılar
                </Typography>
                <Stack spacing={2} sx={{ marginTop: "20px" }}>
                    <BlogItem recommended={true} />
                    <BlogItem recommended={true} />
                    <BlogItem recommended={true} />
                    <BlogItem recommended={true} />
                </Stack>
                <Divider sx={{ marginTop: "16px" }} />
                <Typography variant="h6" gutterBottom sx={{ marginTop: "16px" }} align="center">
                    Bizi Takip Edin
                </Typography>
                <Grid container justifyContent="center">
                    <CustomIconButton aria-label='Facebook'>
                        <FacebookIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                    </CustomIconButton>
                    <CustomIconButton aria-label='Instagram'>
                        <InstagramIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                    </CustomIconButton>
                    <CustomIconButton aria-label='Twitter'>
                        <TwitterIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                    </CustomIconButton>
                    <CustomIconButton aria-label='Youtube'>
                        <YouTubeIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                    </CustomIconButton>
                </Grid>
                <Divider sx={{ marginTop: "16px" }} />
                <Typography sx={{ marginTop: "16px", textAlign: "center" }}>Copyright © 2023 Blog, Inc.</Typography>
            </Item>
        </Grid>
    )
}

export default SideBar