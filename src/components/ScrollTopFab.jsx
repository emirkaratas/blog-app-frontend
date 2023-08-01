import React from "react";
import {
    Box,
    Grow,
    Fab,
} from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export const ScrollTop = () => {
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 300,
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
   
    return (
        <Grow in={trigger}>
            <Box
                role="presentation"
                sx={{
                    position: "fixed",
                    bottom: {xs:4,sm:2,md:8,lg:16},
                    right: {xs:4,sm:6,md:6,lg:4},
                    zIndex: 1,
                }}
            >
                <Fab
                    onClick={scrollToTop}
                    color="primary"
                    size="medium"
                    sx={{
                        fontSize: {xs:"12px",md:"32px",lg:"16px"},
                        color:"white"
                    }}
                >
                    <KeyboardArrowUp />
                </Fab>
            </Box>
        </Grow>
    )
}