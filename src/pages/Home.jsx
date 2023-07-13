import React from 'react'
import Layout from '../components/Layout'
import { styled } from '@mui/material/styles'
import { Box, Button, Grid, Divider } from '@mui/material'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import BlogItem from '../components/BlogItem';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F9F9F9',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    ':hover': {
        color: theme.palette.primary.main
    },
    transition: ".3s all",
}));

function Home() {
    const isMobile = window.innerWidth < 768;
    const categories = { "Yazılım": "kategori/yazilim", "Donanım": "kategori/donanim", "Oyun": "kategori/oyun", "Otomobil": "kategori/otomobil", "Yaşam": "kategori/yasam", "Müzik": "kategori/muzik", "Film & Dizi": "kategori/film-dizi", "Giyilebilir Teknoloji": "kategori/giyilebilir-teknoloji" }
    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
                    <Item>
                        <Typography variant="h6" gutterBottom sx={{ marginBottom: "16px" }}>
                            Gönderiler
                        </Typography>
                        <Stack spacing={2} sx={{ paddingBottom: "8px" }} >
                            <BlogItem />
                            <BlogItem />
                            <BlogItem />
                            <BlogItem />
                            <BlogItem />
                            <BlogItem />
                            <BlogItem />
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={12} md={4} order={{ xs: 1 }}>
                    <Item>
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
                                    return <Button variant="outlined" sx={{ margin: "2px" }} component={Link} to={`${key}`} key={key}>
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
                            <BlogItem recommended={true} />
                        </Stack>
                        <Divider sx={{ marginTop: "16px" }} />
                        <Typography variant="h6" gutterBottom sx={{ marginTop: "16px" }}  align="center">
                            Bizi Takip Edin
                        </Typography>
                        <Stack spacing={1} direction="row" justifyContent="center" >
                            <CustomIconButton aria-aria-label='Facebook'>
                                <FacebookIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                            </CustomIconButton>
                            <CustomIconButton aria-aria-label='Facebook'>
                                <InstagramIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                            </CustomIconButton>
                            <CustomIconButton aria-aria-label='Facebook'>
                                <TwitterIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                            </CustomIconButton>
                            <CustomIconButton aria-aria-label='Facebook'>
                                <YouTubeIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                            </CustomIconButton>
                            <CustomIconButton aria-aria-label='Facebook'>
                                <TelegramIcon sx={{ fontSize: !isMobile ? "45px" : "40px" }} />
                            </CustomIconButton>
                        </Stack>
                    </Item>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Home