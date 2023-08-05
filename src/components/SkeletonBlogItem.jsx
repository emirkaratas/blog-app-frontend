import React from 'react'
import {
    Box,
    Card,
    CardContent,
    Grid,
    Skeleton,
} from "@mui/material";

function SkeletonBlogItem({ recommended }) {
    return (
        <Card sx={{
            display: "flex",
            borderRadius: "10px",
            flexDirection: { xs: "column", sm: "row" },
        }}>
            <Skeleton variant="rectangular" animation="wave" sx={{ height: { xs: "200px", sm: "auto" }, width: { xs: "100%", sm: !recommended ? "300px" : "120px" } }} />
            <Grid sx={{ width: { sx: "100%", sm: !recommended ? "calc(100% - 300px)" : "calc(100% - 120px)" } }}>
                <Grid item xs={12} >
                    <CardContent >
                        {
                            recommended ?
                                <>
                                    <Skeleton animation="wave" height={20} />
                                    <Skeleton animation="wave" height={20} sx={{marginBottom:"8px"}}/>
                                </>
                                :
                                <React.Fragment>
                                    <Skeleton animation="wave" height={30} />
                                    <Skeleton animation="wave" height={30} />
                                    <Skeleton animation="wave" height={30} sx={{ display: { lg: "none" } }} />
                                </React.Fragment>
                        }

                        <Skeleton animation="wave" height={recommended ? 20 : 30} sx={{ width: { xs: "20%", md: !recommended ?"20%":"25%", "lg": !recommended ?"12%":"25%", xl: !recommended ?"10%":"12%" } }} />
                    </CardContent>
                </Grid>
                {!recommended && <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                    <Skeleton animation="wave" variant="rounded" height={40} width={40} sx={{ marginLeft: 1 }} />
                    <Box sx={{ ml: 1, width: "100%" }}>
                        <Skeleton animation="wave" sx={{ width: { xs: "20%", md: "20%", "lg": "12%", xl: "10%" } }} />
                        <Skeleton animation="wave" sx={{ width: { xs: "20%", md: "20%", "lg": "12%", xl: "10%" } }} />
                    </Box>
                </Box>
                }
            </Grid>
        </Card >
    )
}

export default SkeletonBlogItem