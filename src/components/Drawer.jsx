import React from 'react'
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
import { StyledTypography } from '../pages/Home';

const isMobile = window.innerWidth <= 768;
const drawerWidth = isMobile ? 200 : 280;

const openedMixin = (theme) => ({
    width: drawerWidth,
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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
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
        width: drawerWidth,
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
    const routes = {
        "Ana Sayfa": "/",
        "Yazılar":"/posts",
        "Hesap": "/profile",
        "Hakkında": "/about", 
    };
    const icons = [<HomeIcon/>,<ArticleIcon/>,<AccountCircleIcon/>,<InfoIcon/>]
    const { pathname } = useLocation()
    return (
        <CustomDrawer variant="permanent" open={open} sx={{

        }}>
            <Stack flexDirection="row" justifyContent="space-between">
                <DrawerHeader>
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
                    <StyledTypography variant='h6' sx={{marginLeft:"10px"}} component={Link} to="/">Blog</StyledTypography>
                </DrawerHeader>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
            </Stack>
            <Divider />
            <List>
                {Object.keys(routes).map((routeName, index) => {
                    const route = routes[routeName];
                    return (
                        <ListItem key={route} disablePadding sx={{ display: 'block' }} >
                            <ListItemButton
                                component={Link}
                                to={`${route}`}
                                selected={route === pathname}
                                sx={{
                                    minHeight: 60,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {icons[index]}
                                </ListItemIcon>
                                <ListItemText primary={routeName} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </CustomDrawer>
    )
}

export default Drawer