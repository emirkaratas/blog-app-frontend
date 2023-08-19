import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LightModeIcon from '@mui/icons-material/LightMode';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/Api';
import { useQuery } from 'react-query';
import { Autocomplete, TextField } from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';
import { CustomIconButton } from '../pages/Home';
import LinearProgress from '@mui/material/LinearProgress';
import ClearIcon from '@mui/icons-material/Clear';

const CustomAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: "200px",
        width: "calc(100% - 180px)",
        [theme.breakpoints.up("sm")]: {
            width: "calc(100% - 280px)",
            marginLeft: "280px"
        },
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function AppBar({ open, handleDrawerOpen, handleThemeChange, isDark }) {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState("")
    const [focused, setFocused] = useState(false)
    const [result, setResult] = useState("")
    const searchText = useDebounce(inputValue, 250);
    const { data } = useQuery(["search", searchText], fetchProducts, {
        enabled: searchText.length > 1,
        staleTime: 10 * 1000
    })

    const [scrollTop, setScrollTop] = useState(0)
    const onScroll = () => {
        const winScroll = document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        setScrollTop(scrolled);
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const groupData = (option) => {
        if (inputValue.length > 1) return option.hair.color
    }
    return (
        <CustomAppBar position="fixed" open={open} color="primary" >
            <Stack direction="row" justifyContent="space-between">
                <Toolbar sx={{ paddingX: open ? "8px!important" : 2, my: { xs: "8px", sm: "4px", md: "0px" } }}>
                    <CustomIconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            mr: 2,
                            color: !isDark && "white",
                            ...(open && { display: 'none' }),
                            ":hover": {
                                color: !isDark && "white",
                                opacity: !isDark && ".8"
                            }
                        }}
                    >
                        <MenuIcon />
                    </CustomIconButton>
                    {
                        !open && <Box
                            component="img"
                            sx={{
                                height: 48,
                                width: 48,
                                objectFit: "cover",
                                color: 'white',
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/")}
                            alt="Logo"
                            src={"https://images.prismic.io/userzoom/7d6cc26c-b2fa-446f-aec8-149568e4e56c_Zooie.png?auto=compress,format"}
                        />
                    }
                </Toolbar>
                <Box sx={{
                    width: focused ? { xs: "50%", sm: "50%", md: "40%", lg: "20%" } : { xs: 24, md: "40%", lg: "20%" },
                    transition: ".6s width", marginY: 1, '& fieldset': { borderRadius: "5px" },
                    "& .MuiAutocomplete-popupIndicator": { transform: "none" },
                    visibility: { xs: !focused ? "hidden" : "visible", md: "visible" },
                }}>
                    <Fade in={true} timeout={1000}>
                        <Autocomplete
                            disablePortal={true}
                            onClose={() => setFocused(false)}
                            value={result}
                            onChange={(e, v) => v != null && setResult(v)}
                            options={data != undefined && data.sort((a, b) =>
                                b.hair.color.toString().localeCompare(a.hair.color.toString())
                            ) || []}
                            groupBy={(option) => groupData(option)}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            popupIcon={!focused ? <SearchIcon /> : <ClearIcon />}
                            disableClearable
                            getOptionLabel={(option) => (option.firstName ? `${option.firstName} ${option.lastName}` : '')}
                            noOptionsText={inputValue.length <= 1 ? "Yazınız" : "Sonuç Bulunamadı"}
                            renderInput={(params, item) =>
                                <TextField {...params}
                                    sx={{
                                        marginY: 0, background: !isDark && "white", borderRadius: "5px", textColor: !isDark && "white", "& label": {
                                            "&.Mui-focused": {
                                                color: !isDark && 'black'
                                            },
                                        }
                                    }}
                                    label="Yazınız"
                                    onBlur={() => setFocused(false)}
                                    onSelect={() => navigate(result && `/posts/${result.id}`)}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    variant={!isDark ? "filled" : "outlined"}
                                    InputProps={!isDark ? { ...params.InputProps, disableUnderline: true } : { ...params.InputProps }}
                                />
                            }
                        /></Fade>
                </Box>
                <Toolbar >
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        <CustomIconButton onClick={() => setFocused(true)} sx={{
                            color: !isDark && "white",
                            ":hover": { color: !isDark && "white", opacity: !isDark && ".8" },
                            display: { xs: focused ? "none" : "block", md: "none" },
                            height: 40,
                            width: 40,
                        }}
                        >
                            <SearchIcon />
                        </CustomIconButton>
                        <CustomIconButton isdark={isDark.toString()} onClick={handleThemeChange}
                            sx={{ color: !isDark && "white", ":hover": { color: !isDark && "white", opacity: !isDark && ".8" } }}
                        >
                            {isDark ? <NightlightRoundIcon /> : <LightModeIcon />}
                        </CustomIconButton>
                    </Stack>
                </Toolbar>
            </Stack>
            <LinearProgress variant="determinate" value={scrollTop} sx={{
                '& .MuiLinearProgress-bar': {
                    backgroundColor: !isDark && "#F9F9F9"
                }
            }} />
        </CustomAppBar>
    )
}

export default AppBar