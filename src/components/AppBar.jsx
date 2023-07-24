import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LightModeIcon from '@mui/icons-material/LightMode';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/Api';
import { useQuery } from 'react-query';
import { Autocomplete, TextField } from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';
import { CustomIconButton, StyledTypography } from '../pages/Home';

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
        width: "calc(100% - 200px)",
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

const ThemeButton = styled(IconButton)(
    ({ isdark }) => ({
        backgroundColor: "#e6e6e6",
        ":hover": { backgroundColor: "#f2f2f2" },
        ...(isdark == "true" && {
            backgroundColor: "#595959",
            ":hover": { backgroundColor: "#666666" }
        })
    })
)

function AppBar({ open, handleDrawerOpen, handleThemeChange, isDark }) {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState("")
    const [result, setResult] = useState("")
    const searchText = useDebounce(inputValue, 250);
    const { data } = useQuery(["search", searchText], fetchProducts, {
        enabled: searchText.length > 1,
        staleTime: 10 * 1000
    })

    const groupData = (option) => {
        if (inputValue.length > 1) return option.hair.color
    }

    return (
        <CustomAppBar position="fixed" open={open} color="inherit" >
            <Stack direction="row" justifyContent="space-between">
                <Toolbar>
                    <CustomIconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            mr: 3,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </CustomIconButton>
                    {
                        !open && <Box
                            component="img"
                            sx={{
                                height: 48,
                                color: 'white',
                                cursor: "pointer",

                            }}
                            onClick={() => navigate("/")}
                            alt="Logo"
                            src={"https://images.prismic.io/userzoom/7d6cc26c-b2fa-446f-aec8-149568e4e56c_Zooie.png?auto=compress,format"}
                        />
                    }
                    {
                        !open && <StyledTypography variant='h6' sx={{ marginLeft: "10px" }} component={Link} to="/">Blog</StyledTypography>
                    }
                </Toolbar>
                <Autocomplete
                    value={result}
                    onChange={(e, v) => v != null && setResult(v)}
                    options={data != undefined && data.sort((a, b) =>
                        b.hair.color.toString().localeCompare(a.hair.color.toString())
                    ) || []}
                    groupBy={(option) => groupData(option)}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    getOptionLabel={(option) => (option.firstName ? `${option.firstName} ${option.lastName}` : '')}
                    noOptionsText={inputValue.length <= 1 ? "Yazınız" : "Sonuç Bulunamadı"}
                    sx={{ width: 500, marginY: 1 }}
                    renderInput={(params, item) => <TextField {...params}
                        label="Yazınız"
                        onSelect={() => navigate(result && `/posts/${result.id}`)}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    }
                />
                <Toolbar>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        <ThemeButton isdark={isDark.toString()} onClick={handleThemeChange}>
                            {isDark ? <NightlightRoundIcon /> : <LightModeIcon />}
                        </ThemeButton>
                    </Stack>
                </Toolbar>
            </Stack>
        </CustomAppBar>
    )
}

export default AppBar