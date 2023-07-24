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

function BlogItem({ recommended }) {
    const theme = useTheme();
    const isDark = theme.palette.mode == "dark"
    console.log()
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
                sx={{ height: { xs: "200px", sm: "auto" }, maxWidth: { xs: "100%", sm: !recommended ? "30%" : "20%" } }}
                image="data:image/png;base64,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"
                alt="Title"
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    {
                        recommended ? <StyledTypography variant={"subtitle1"} sx={{
                            display: '-webkit-box',
                            overflow:'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            
                        }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, adipisci?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, adipisci?
                        </StyledTypography> : 
                        <StyledTypography variant={"h5"}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, adipisci?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, adipisci?
                        </StyledTypography>
                    }
                    <Typography variant={recommended ? "caption" : "subtitle1"} color="text.secondary" sx={{
                        cursor: "pointer",
                        transition: ".3s ",
                        opacity: isDark? .7:.85,
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
        </Card>
    )
}

export default BlogItem