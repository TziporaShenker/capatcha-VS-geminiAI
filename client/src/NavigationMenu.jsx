import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

const NavigationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar style={{ justifyContent: "space-between", direction: "rtl" }}>
        {/* לוגו */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "22px",
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif", // עדכון הפונט
          }}
        >
          CaptchaApp
        </Link>

        {/* ניווט */}
        {isMobile ? (
          <div>
            <IconButton onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                component={Link}
                to="/captchaTest"
                onClick={handleClose}
                style={{
                  fontFamily: "'Roboto', sans-serif", // עדכון פונט לתפריט בנייד
                  fontSize: "16px",
                }}
              >
                captcha test
              </MenuItem>
              <MenuItem
                component={Link}
                to="/captchaTable"
                onClick={handleClose}
                style={{
                  fontFamily: "'Roboto', sans-serif", // עדכון פונט לתפריט בנייד
                  fontSize: "16px",
                }}
              >
                captcha table
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/captchaTest"
              style={{
                textDecoration: "none",
                color: location.pathname === "/captchaTest" ? "#5b9efc" : "#555",
                fontSize: "18px",
                fontWeight: location.pathname === "/captchaTest" ? "bold" : "500",
                borderBottom:
                  location.pathname === "/captchaTest"
                    ? "2px solid #5b9efc"
                    : "none",
                fontFamily: "'Roboto', sans-serif", // פונט מותאם
              }}
            >
              captcha test
            </Link>
            <Link
              to="/captchaTable"
              style={{
                textDecoration: "none",
                color: location.pathname === "/captchaTable" ? "#5b9efc" : "#555",
                fontSize: "18px",
                fontWeight: location.pathname === "/captchaTable" ? "bold" : "500",
                borderBottom:
                  location.pathname === "/captchaTable"
                    ? "2px solid #5b9efc"
                    : "none",
                fontFamily: "'Roboto', sans-serif", // פונט מותאם
              }}
            >
              captcha table
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationMenu;