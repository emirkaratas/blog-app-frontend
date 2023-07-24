import React from 'react'
import Layout from '../components/Layout'
import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import BlogItem from '../components/BlogItem';
import SideBar from '../components/SideBar';


export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F9F9F9',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
    ':hover': {
        color: theme.palette.primary.main
    },
    transition: ".3s all",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
    cursor: "pointer",
    transition: ".3s ",
    ':hover': {
        color: `${theme.palette.primary.main}`
    },
    textDecoration: "none",
    color: theme.palette.text.secondary,
}))

function Home() {
    return (
        <Layout>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }} >
                    <Item sx={{ borderRadius: "10px", padding: "10px" }}>
                        <Stack
                            direction="row"
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            justifyContent="space-between"
                            alignItems="center"
                        >                
                        <Typography variant="h6">En Son Yazılar</Typography>
                        <StyledTypography component={Link} to="/posts">Tümünü Göster</StyledTypography>
                    </Stack>
                    <Stack spacing={2} sx={{ paddingBottom: "8px", marginTop: "12px" }} >
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                    </Stack>
                </Item>
            </Grid>
            <SideBar />
        </Grid>
        </Layout >
    )
}

export default Home