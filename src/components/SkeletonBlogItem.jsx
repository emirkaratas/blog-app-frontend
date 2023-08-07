import React from 'react'
import {
    Box,
    Card,
    CardContent,
    Skeleton,
} from "@mui/material";

function SkeletonBlogItem({ recommended }) {
    return (
        <Card sx={{
            display: "flex",
            borderRadius: "10px",
            flexDirection: { xs: "column", sm: "row" },
            height: { xs: "auto", sm: !recommended ? "200px" : "120px" }
        }}>
            <Skeleton variant="rectangular" animation="wave" sx={{ height: { xs: "200px", sm: "auto" }, width: { xs: "100%", sm: !recommended ? "300px" : "120px" } }} />
            <Box sx={{ display: "flex", flexDirection: "column", width: { sx: "100%", sm: !recommended ? "calc(100% - 300px)" : "calc(100% - 120px)" } }} justifyContent="space-evenly">
                <CardContent >
                    {
                        recommended ?
                            <>
                                <Skeleton animation="wave" height={20} />
                                <Skeleton animation="wave" height={20} sx={{ marginBottom: "8px" }} />
                            </>
                            :
                            <React.Fragment>
                                <Skeleton animation="wave" height={30} />
                                <Skeleton animation="wave" height={30} />
                                <Skeleton animation="wave" height={30} />
                            </React.Fragment>
                    }

                    <Skeleton animation="wave" height={recommended ? 20 : 30} sx={{ width: { xs: "20%", md: !recommended ? "20%" : "25%", "lg": !recommended ? "12%" : "25%", xl: !recommended ? "10%" : "12%" } }} />
                </CardContent>
                {!recommended && <Box sx={{ display: "flex", alignItems: "center", margin: 2, marginTop: 0 }}>
                    <Skeleton animation="wave" variant="circular" height={40} width={40}/>
                    <Box sx={{ ml: 1 }}>
                        <Skeleton animation="wave" width={60} />
                        <Skeleton animation="wave" width={60} />
                    </Box>
                </Box>
                }
            </Box>
        </Card >
    )
}

export default SkeletonBlogItem