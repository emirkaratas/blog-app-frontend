import React from 'react'
import Layout from '../components/Layout'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { CustomIconButton, Item, StyledTypography } from './Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideBar from '../components/SideBar';
import BlogItem from '../components/BlogItem';
import { useQuery } from 'react-query';
import { fetchPosts } from '../services/Api';

function Posts() {
    const [searchParams] = useSearchParams();
    const param = searchParams.get('category')
    const { data } = useQuery(["posts", param], fetchPosts)
    const category = useLocation()
    let resultCategory = (category.state != null) ? category.state.cat : null

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
                            {
                                resultCategory != null && <Typography variant="h6" >
                                    {resultCategory}
                                </Typography>
                            }
                            {
                                resultCategory != null && <CustomIconButton component={Link} to="/posts" sx={{marginBottom:"0px"}}><ArrowBackIcon/></CustomIconButton>
                            }
                            {
                                resultCategory == null && <Typography variant="h6">Tüm Yazılar</Typography>
                            }
                            {
                                resultCategory == null && <StyledTypography component={Link} to="/">Ana Sayfa</StyledTypography>
                            }
                        </Stack>
                        <Stack spacing={2} sx={{ paddingBottom: "8px", marginTop: "12px" }} >
                            <BlogItem />
                            <BlogItem />
                            <BlogItem />
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
                <SideBar />
            </Grid>
        </Layout>
    )
}

export default Posts