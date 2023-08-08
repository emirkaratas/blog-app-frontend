import React, { useState } from 'react'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { StyledTypography } from '../pages/Home';


function BlogItem({ recommended }) {
    const [show, setShow] = useState(false);
    const theme = useTheme();
    const isDark = theme.palette.mode == "dark"
    return (
        <Box sx={{position:"relative"}}>
            <Card sx={{
                display: "flex", ':hover': {
                    transform: "scale(1.0012)",
                    boxShadow: isDark ? 15 : 4,
                    size: 1.2,
                },
                borderRadius: "10px",
                flexDirection: { xs: "column", sm: "row" },
                height: { xs: "auto", sm: !recommended ? "200px" : "120px" }
            }}>
                <CardMedia
                    component="img"
                    sx={{ height: { xs: "200px", sm: "auto" }, width: { xs: "100%", sm: !recommended ? "35%" : "120px", lg: !recommended ? "300px" : "120px" } }}
                    image="https://e0.pxfuel.com/wallpapers/920/271/desktop-wallpaper-what-would-happen-if-you-mutated-your-react-redux-state-r-reactjs-react-native-thumbnail.jpg"
                    alt="Title"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }} justifyContent="space-evenly">
                    <CardContent sx={{ flex: "1 0 auto" }} >
                        <StyledTypography variant={recommended ? "subtitle1" : "h5"} sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: recommended ? 2 : 3,
                            ":hover": { transition: "opacity 5s ease-in-out" }
                        }} onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiur rem in provident suit. Aperiam quidem at tenetur rem in providentscipit tempore vitae adipiscimpore vitae adipisci!
                        </StyledTypography>
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
                    {
                        !recommended && <Box sx={{ display: "flex", alignItems: "center", margin: 2, marginTop: 0 }}>
                            <Avatar alt="Author" src="https://blog.logrocket.com/wp-content/uploads/2020/07/react-native-geolocation.png" />
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
                </Box >
            </Card >
            <Box sx={{
                position: "absolute",
                visibility: !show ? "hidden" : !recommended ? "visible" : "hidden",
                opacity: !show ? "0" : "1",
                transitionDelay: show ? ".8s" : "0s",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.4)",
                left: "50%",
                right:"1%",
                zIndex:"2",
                top:"55%",           
                backgroundColor:theme.palette.mode === 'dark' ? '#1A2027' : '#F9F9F9',
                border:"1px solid",
                borderColor:theme.palette.primary.main,
                display:{xs:"none",lg:"block"},
                
            }}> <Typography variant='caption'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quidem at teneturLorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quidem at tenetur
                </Typography>
            </Box>
        </Box>

    )
}

export default BlogItem