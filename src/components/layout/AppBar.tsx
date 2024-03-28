import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useRef } from 'react';
import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { ABZeusConfigState, setInput, setOptions } from '../../state/ABZeusConfigSlice'
import { Button, ButtonGroup, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import {
    Link,
    useNavigate
  } from "react-router-dom";

  
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen?: boolean) => {
        if (!newOpen) { newOpen = !open; }
        setOpen(newOpen);
    };

    const navigate = useNavigate();

    const changeLocation = (loc:string) => {

        navigate(loc);
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
            <List>
                <ListItem key={"dictionary"} disablePadding>

                    <Box sx={{p:2}}>
                        -O-Z*us
                    </Box>

                </ListItem>
                <Divider />
                <ListItem key={"/"} disablePadding>
                    <ListItemButton onClick={() => changeLocation("/")}>
                        {/*<ListItemIcon>
                               <InboxIcon />
                            </ListItemIcon>*/} 
                        <ListItemText primary={<>Home (<span className='abzeus'> home </span>)</>} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"/alfwet"} disablePadding>
                    <ListItemButton  onClick={() => changeLocation("/alfwet")} >
                        {/*<ListItemIcon>
                               <InboxIcon />
                            </ListItemIcon>*/} 
                        <ListItemText primary={<>Alfwet (<span className='abzeus'> alfwet </span>)</>} />
                    </ListItemButton>

                </ListItem>
            </List>
            <Divider />

        </Box>
    );

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Opcioes</p>
            </MenuItem>
        </Menu>
    );

    const ABZeusState: ABZeusConfigState = useSelector((state: RootState) => state.ABZeusConfig)
    const dispatch = useDispatch()

    const inputRef = useRef<any>(null);

    const searchValue = (event: any) => {
        const inputValue = event.target.value.replace(/\s/g, '');
        if (inputRef.current) {
            inputRef.current.value = inputValue;
            dispatch(setInput(inputValue));
        }
    };

    const setLanguage = (lang: string) => {
        dispatch(setOptions({ lang: lang }));
    }

    const LanguageButtons = () => {
        // TODO language array dynamic
        return <Box sx={{ m: 1 }} className="hideOnScreenshot">
            <ButtonGroup>
                <Button variant={"contained"} value="english" onClick={() => setLanguage("en")} disabled={ABZeusState.options?.lang === "en"}>English</Button>
                <Button variant={"contained"} value="spanish" onClick={() => setLanguage("es")} disabled={ABZeusState.options?.lang === "es"}>Spanish</Button>
                <Button variant={"contained"} value="greek" onClick={() => setLanguage("gk")} disabled={ABZeusState.options?.lang === "gk"}>Greek</Button>
            </ButtonGroup>
        </Box>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => {

                            toggleDrawer()
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        -O-Z*us
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            inputRef={inputRef}
                            onChange={(event) => searchValue(event)}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <LanguageButtons />
                    {/*<Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
  </Box>*/}
                </Toolbar>
            </AppBar>
            {/*renderMobileMenu*/}
            {/*renderMenu*/}

            <Drawer open={open} onClose={() => toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>

    );
}