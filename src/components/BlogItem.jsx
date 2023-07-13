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
import { styled } from '@mui/material/styles'


const StyledTypography = styled(Typography)(({ theme }) => ({
    cursor: "pointer",
    transition: ".3s ",
    ':hover': {
        color: `${theme.palette.primary.main}`
    },
}))

function BlogItem({ recommended }) {
    const theme = useTheme();
    const isDark = theme.palette.mode == "dark"
    const isMobile = window.innerWidth < 768;
    console.log()
    return (
        <Card sx={{
            display: "flex", ':hover': {
                transform: "scale(1.0012)",
                boxShadow: isDark ? 15 : 4,
                size: 1.2,
            },
            borderRadius: "10px"
        }}>
            <CardMedia
                component="img"
                sx={{ width: !recommended ? (isMobile ? 150 : 250) : (isMobile ? 100 : 100), objectFit: "contain" }}
                image="https://avatars.githubusercontent.com/u/6412038?s=200&v=4"
                alt="Title"
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <StyledTypography component="h5" variant="h5">
                        React
                    </StyledTypography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{
                        cursor: "pointer",
                        transition: ".3s ",
                        ':hover': {
                            opacity: isDark ? .7 : .85
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