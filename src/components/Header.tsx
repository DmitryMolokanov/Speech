import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  ListItem,
  Toolbar,
  List,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <Box sx={{ flexGrow: 1, position: "relative", zIndex: 2 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'end', }}>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setIsMenu(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer open={isMenu} onClose={() => setIsMenu(false)} anchor={"right"} sx={{ m: 5 }}>
        <List>
          <ListItem>
            <Button component={RouterLink} to="/" sx={{ fontWeight: 700 }}>
              Main page
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={RouterLink}
              to="/collections"
              sx={{ fontWeight: 700 }}
            >
              Collection
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={RouterLink}
              to="/speech-recognition"
              sx={{ fontWeight: 700 }}
            >
              Speech Recognition
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
