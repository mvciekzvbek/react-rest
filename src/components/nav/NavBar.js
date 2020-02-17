import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from '@material-ui/core/Link';

import { useAuth0 } from '../../react-auth0-spa';
import UserAvatar from '../shared/UserAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    margin: 0,
    backgroundColor: '#0093ff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  link: {
    margin: theme.spacing(1),
    textDecoration: 'none',
    color: 'inherit',

    '&:hover': {
      textDecoration: 'none'
    }
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const {
    isAuthenticated, loginWithRedirect, user, logout,
  } = useAuth0();

  const [auth, setAuth] = React.useState(isAuthenticated);
  const [value, setValue] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" className={classes.link}>
              MZ
            </Link>
          </Typography>
          {auth && (
            <>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Latest" component={RouterLink} to="/latest" {...a11yProps(0)} />
                  <Tab label="Categories" component={RouterLink} to="/categories" {...a11yProps(1)} />
                </Tabs>
              </div>
              {/*<div className={classes.sectionMobile}>*/}
              {/*  <IconButton*/}
              {/*    aria-label="show more"*/}
              {/*    aria-controls={mobileMenuId}*/}
              {/*    aria-haspopup="true"*/}
              {/*    onClick={handleMobileMenuOpen}*/}
              {/*    color="inherit"*/}
              {/*  >*/}
              {/*    <MoreIcon />*/}
              {/*  </IconButton>*/}
              {/*</div>*/}
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <UserAvatar user={user} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={RouterLink} to="/profile">Profile</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          )}
          {!auth && (
            <Button color="inherit" onClick={loginWithRedirect}>Log in</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
