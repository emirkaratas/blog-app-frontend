import React from 'react'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { StyledTypography } from '../pages/Home';

function BlogItem({ recommended, isLoading }) {
    const theme = useTheme();
    const isDark = theme.palette.mode == "dark"
    isLoading = isLoading
    return (
        <Card sx={{
            display: "flex", ':hover': {
                transform: "scale(1.0012)",
                boxShadow: isDark ? 15 : 4,
                size: 1.2,
            },
            borderRadius: "10px",
            flexDirection: { xs: "column", sm: "row" }
        }}>
                <CardMedia
                    component="img"
                    sx={{ height: { xs: "200px", sm: "auto" }, width: { xs: "100%", sm: !recommended ? "300px" : "30%" } }}
                    image="https://e0.pxfuel.com/wallpapers/920/271/desktop-wallpaper-what-would-happen-if-you-mutated-your-react-redux-state-r-reactjs-react-native-thumbnail.jpg"
                    alt="Title"
                />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    {
                        recommended ?
                                < StyledTypography variant={"subtitle1"} sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, adipisci?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, adipisci?
                                </StyledTypography> 
                            :
                                <StyledTypography variant={"h5"}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, adipisci?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, adipisci?
                                </StyledTypography>
                    }           
                        <Typography variant={recommended ? "caption" : "subtitle1"} color="text.secondary" sx={{
                            cursor: "pointer",
                            transition: ".3s ",
                            opacity: isDark ? .7 : .85,
                            ':hover': {
                                opacity: isDark ? .9 : 1
                            },
                        }}>
                            Kategori
                        </Typography>               
                </CardContent>
                {!recommended && <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>        
                        <Avatar alt="Author" src="https://www.patterns.dev/img/reactjs/react-logo@3x.svg" />
                    <Box sx={{ ml: 1 }}>
                            <StyledTypography variant="subtitle2">
                                Emir Karataş
                            </StyledTypography>                  
                            <Typography variant="subtitle2" color="text.secondary">
                                Date
                            </Typography>
                    </Box>
                </Box>
                }
            </Box>
        </Card >
    )
}

export default BlogItem