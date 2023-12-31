import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Grid, Stack, Typography, styled } from '@mui/material';
import { Item } from './Home';
import SideBar from '../components/SideBar';
import BlogItem from '../components/BlogItem';
import { useQuery } from 'react-query';
import { fetchPosts } from '../services/Api';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import SkeletonBlogItem from '../components/SkeletonBlogItem';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useQueryClient } from "react-query";

export const StyledCategoryName = styled(Typography)(({ theme }) => ({
    ':hover': {
        color: theme.palette.primary.main
    },
    transition: ".2s color ease-in-out",
}));

function Posts() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const [sort, setSort] = React.useState('latest');
    const param = searchParams.get('category')

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const categories = queryClient.getQueryData("categories")
    const { data, isFetching } = useQuery(["posts", param, sort], fetchPosts)

    const category = useLocation()
    let resultCategory = (category.state != null) ? category.state.cat : null

    const [filterValue, setFilterValue] = React.useState(undefined)
    useEffect(() => {
        setFilterValue(param)
    }, [param])

    const sortings = [{ name: "En Son", value: "latest" }, { name: "En Popüler", value: "popular" }, { name: "En Eski", value: "oldest" }]
    return (
        <Layout>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }} >
                    <Item sx={{ borderRadius: "10px", padding: "10px", mt: { xs: 3, sm: 2 } }}>
                        <Grid container>
                            <Grid item xs={12} sm={6} xl={7}>
                                <StyledCategoryName variant="h6">
                                    {resultCategory != null ? resultCategory.name : "Tüm Yazılar"}
                                </StyledCategoryName>
                            </Grid>
                            <Grid item xs={12} sm={6} xl={5}>
                                <Stack direction="row" spacing={1} sx={{mt:{xs:2,sm:0}}}>
                                    <FormControl variant="outlined" sx={{width:"50%"  }}>
                                        <InputLabel id="demo-simple-select-standard-label">Filtre</InputLabel>
                                        <Select
                                            value={filterValue == undefined ? "" : filterValue}
                                            label="Filtre"
                                        >
                                            {
                                                categories?.map((element, index) => <MenuItem
                                                    value={element.value}
                                                    key={index}
                                                    component={Link} to={`/posts?category=${element.value}`}
                                                    state={{ cat: element }}
                                                    sx={{
                                                        '&.Mui-selected': {
                                                            backgroundColor: 'rgba(247, 115, 64, .27)',
                                                            ":hover": {
                                                                backgroundColor: 'rgba(247, 115, 64, .33)'
                                                            }
                                                        },
                                                    }}
                                                >
                                                    {element.name}
                                                </MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" sx={{ width:"50%" }}>
                                        <InputLabel id="demo-simple-select-standard-label">Sırala</InputLabel>
                                        <Select
                                            value={sort}
                                            onChange={handleChange}
                                            label="Sırala"
                                            displayEmpty
                                        >
                                            {
                                                sortings.map((element, index) => <MenuItem
                                                    value={element.value}
                                                    key={index}
                                                    sx={{
                                                        '&.Mui-selected': {
                                                            backgroundColor: 'rgba(247, 115, 64, .27)',
                                                            ":hover": {
                                                                backgroundColor: 'rgba(247, 115, 64, .33)'
                                                            }
                                                        },
                                                    }}
                                                >
                                                    {element.name}
                                                </MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Stack spacing={2} sx={{ paddingBottom: "8px", marginTop: "12px" }} >
                            {
                                isFetching && <>
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                    <SkeletonBlogItem />
                                </>
                            }
                            {
                                data?.map((item) => (<BlogItem key={item.id} />))
                            }
                        </Stack>
                    </Item>
                </Grid>
                <SideBar />
            </Grid>
        </Layout>
    )
}

export default Posts