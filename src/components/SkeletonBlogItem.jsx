import React from 'react'
import {
    Box,
    Card,
    CardContent,
    Grid,
    Skeleton,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

function SkeletonBlogItem({ recommended }) {
    const theme = useTheme();
    const isDark = theme.palette.mode == "dark"
    return (
        <Card sx={{
            display: "flex",
            borderRadius: "10px",
            flexDirection: { xs: "column", sm: "row" },
        }}>
            <Skeleton variant="rectangular" animation="wave" sx={{ height: { xs: "200px", sm: "auto" }, width: { xs: "100%", sm: !recommended ? "300px" : "30%" } }} />
            <Grid sx={{width:{sx:"100%",sm:"calc(100% - 300px)"}}}>
                <Grid item xs={12} >
                    <CardContent >
                        {
                            recommended ?
                                <Skeleton animation="wave" height={15} sx={{ marginBottom: 1 }} />
                                :
                                <React.Fragment>
                                    <Skeleton animation="wave" height={30} />
                                    <Skeleton animation="wave" height={30} />                                   
                                    <Skeleton animation="wave" height={30} sx={{ display: {lg:"none"} }}/>                                   
                                </React.Fragment>
                        }

                        <Skeleton animation="wave" height={recommended ? 15 : 30} sx={{ width: { xs: "20%", md: "20%", "lg": "12%",xl:"10%" } }} />
                    </CardContent>
                </Grid>
                {!recommended && <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                    <Skeleton animation="wave" variant="rounded" height={40} width={40} sx={{ marginLeft: 1 }} />
                    <Box sx={{ ml: 1, width: "100%" }}>
                        <Skeleton animation="wave" sx={{ width: { xs: "20%", md: "20%", "lg": "12%",xl:"10%" } }} />
                        <Skeleton animation="wave" sx={{ width: { xs: "20%", md: "20%", "lg": "12%",xl:"10%" } }} />
                    </Box>
                </Box>
                }
            </Grid>


        </Card >
    )
}

export default SkeletonBlogItem