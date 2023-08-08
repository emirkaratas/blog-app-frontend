import React from 'react'
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import { styled, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { CustomIconButton, StyledTypography } from '../pages/Home';
import Profile from './Profile';

const openedMixin = (theme) => ({
    width: "180px",
    [theme.breakpoints.up("sm")]: {
        width: "280px",
    },
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});


const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `0`,
    [theme.breakpoints.up('lg')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));


const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: "200px",
        [theme.breakpoints.up("sm")]: {
            width: "280px",
        },
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Drawer({ handleDrawerClose, open, isDark }) {
    const theme = useTheme();
    const navigate = useNavigate()
    const loggedIn = false
    const role = "Admin"

    const [openProfile, setOpenProfile] = React.useState(false);
    const handleOpenProfile = () => setOpenProfile(true);
    const handleCloseProfile = () => setOpenProfile(false);

    const routes = [
        { name: "Ana Sayfa", link: "/", modal: { onClick: null, isModal: false, selected: null }, icon: <HomeIcon />, show: true, roles: ["Admin", "Guest", "Writer"] },
        { name: "Yazılar", link: "/posts", modal: { onClick: null, isModal: false, selected: null }, icon: <ArticleIcon />, show: true, roles: ["Admin", "Guest", "Writer"] },
        { name: "Giriş Yap", link: "/login", modal: { onClick: null, isModal: false, selected: null }, icon: <AccountCircleIcon />, show: !loggedIn, roles: ["Admin", "Guest", "Writer"] },
        { name: "Profil", link: "", modal: { onClick: handleOpenProfile, isModal: true, selected: openProfile }, icon: <AccountCircleIcon />, show: loggedIn, roles: ["Admin", "Guest", "Writer"] },
        { name: "Hakkında", link: "/about", modal: { onClick: null, isModal: false, selected: null }, icon: <InfoIcon />, show: true, roles: ["Admin", "Guest", "Writer"] },
    ]

    const { pathname } = useLocation()
    return (
        <CustomDrawer variant="permanent" open={open}>
            <Stack flexDirection="row" justifyContent="space-between" color="primary">
                <DrawerHeader sx={{ marginY: { xs: open ? "8px" : "0px", sm: open ? "4px" : "0px" } }}>
                    <Box
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
                    <StyledTypography variant='h6' sx={{ marginLeft: "10px" }} component={Link} to="/">Blog</StyledTypography>
                </DrawerHeader>
                <DrawerHeader>
                    <CustomIconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </CustomIconButton>
                </DrawerHeader>
            </Stack>
            <Divider />
            <List sx={{ marginTop: "4px"}}>
                {routes.map((route) => {
                    return (
                        <ListItem key={route.name} disablePadding sx={{ display: route.show ? route.roles.includes(role) ? "block" : "none" : "none"}} >
                            {
                                <ListItemButton
                                    component={Link}
                                    onClick={route.modal.onClick}
                                    to={route.link}
                                    selected={route.modal.isModal == false ? route.link === pathname : route.modal.selected}
                                    sx={{
                                        minHeight: 60,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(247, 115, 64, .27)',
                                            ":hover":{
                                                backgroundColor: 'rgba(247, 115, 64, .33)'
                                            }
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {route.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={route.name} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            }
                        </ListItem>
                    );
                })}
            </List>
            <Profile openProfile={openProfile} handleCloseProfile={handleCloseProfile} />
        </CustomDrawer>
    )
}

export default Drawer