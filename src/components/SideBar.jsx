import { Box, Divider, Grid, Stack, Typography, Button } from '@mui/material';
import React from 'react'
import { CustomIconButton, Item } from '../pages/Home';
import BlogItem from './BlogItem';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
import SkeletonBlogItem from './SkeletonBlogItem';
import { useQuery } from 'react-query';
import { fetchCategories, fetchRecommendedPosts } from '../services/Api';


function SideBar() {
    const { isLoading, error, data } = useQuery("recommended:posts", fetchRecommendedPosts)
    const { data: categories } = useQuery("categories", fetchCategories)
    return (
        <Grid item xs={12} md={4} order={{ xs: 2 }} position={{ md: "sticky" }} sx={{ top: "48px", pt:{xs:"8px!important",md:"16px!important"} }} >
            <Item sx={{ borderRadius: "10px", padding: "10px", maxHeight: "calc(100vh - 96px)", overflow: "scroll", '&::-webkit-scrollbar-corner': { backgroundColor: "rgba(0,0,0,0)" }, }} >
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Typography variant="h6" gutterBottom>
                        Kategoriler
                    </Typography>
                    <Grid container spacing={.3}>
                        {
                            categories?.map((category,index) => {
                                return <Grid item key={index}>
                                    <Button variant="outlined" sx={{ margin: "2px" }} component={Link} to={`/posts?category=${category.value}`} key={index} state={{ cat: category }}>
                                        {category.name}
                                    </Button>
                                </Grid>
                            })
                        }
                    </Grid>
                    <Divider sx={{ marginTop: "16px" }} />
                    <Typography variant="h6" gutterBottom sx={{ marginTop: "16px" }}>
                        Önerilen Yazılar
                    </Typography>
                    <Stack spacing={2} sx={{ marginTop: "20px" }}>
                        {
                            isLoading && <>
                                <SkeletonBlogItem recommended={true} />
                                <SkeletonBlogItem recommended={true} />
                                <SkeletonBlogItem recommended={true} />
                            </>
                        }
                        {
                            data?.map((item) => (<BlogItem recommended={true} key={item.id} isLoading={isLoading} />))
                        }
                    </Stack>
                    <Divider sx={{ marginTop: "16px" }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ marginTop: "16px" }} align="center">
                    Bizi Takip Edin
                </Typography>
                <Grid container justifyContent="center">
                    <CustomIconButton aria-label='Facebook'>
                        <FacebookIcon sx={{ fontSize: { xs: "40px", sm: "45px" } }} />
                    </CustomIconButton>
                    <CustomIconButton aria-label='Instagram'>
                        <InstagramIcon sx={{ fontSize: { xs: "40px", sm: "45px" } }} />
                    </CustomIconButton>
                    <CustomIconButton aria-label='Twitter'>
                        <TwitterIcon sx={{ fontSize: { xs: "40px", sm: "45px" } }} />
                    </CustomIconButton>
                    <CustomIconButton aria-label='Youtube'>
                        <YouTubeIcon sx={{ fontSize: { xs: "40px", sm: "45px" } }} />
                    </CustomIconButton>
                </Grid>
                <Divider sx={{ marginTop: "16px" }} />
                <Typography sx={{ marginTop: "16px", textAlign: "center" }}>Copyright © 2023 Blog, Inc.</Typography>
            </Item>
        </Grid>
    )
}

export default SideBar