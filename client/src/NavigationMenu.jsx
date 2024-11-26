// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import IconButton from "@mui/material/IconButton";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";


// const NavigationMenu = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       style={{
//         backgroundColor: "white",
//         boxShadow: "none",
//         borderBottom: "1px solid #ccc",
//       }}
//     >
//       <Toolbar style={{ justifyContent: "space-between" }}>
//         {/* לוגו או שם בצד שמאל */}
//         <Link
//           to="/"
//           style={{
//             textDecoration: "none",
//             color: "#333",
//             fontSize: "20px",
//             fontWeight: "bold",
//           }}
//         >
//           CaptchaApp
//         </Link>

//         {/* ניווט */}
//         {isMobile ? (
//           <div>
//             <IconButton onClick={handleMenu}>
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem component={Link} to="/captchaTest" onClick={handleClose}>
//                 captcha test
//               </MenuItem>
//               <MenuItem
//                 component={Link}
//                 to="/captchaTable"
//                 onClick={handleClose}
//               >
//                 captcha table
//               </MenuItem>
//             </Menu>
//           </div>
//         ) : (
//           <div>
//             <Link
//               to="/captchaTest"
//               style={{
//                 margin: "0 10px",
//                 textDecoration: "none",
//                 color: "#555",
//                 fontSize: "16px",
//               }}
//             >
//               captcha test
//             </Link>
//             <Link
//               to="/captchaTable"
//               style={{
//                 margin: "0 10px",
//                 textDecoration: "none",
//                 color: "#555",
//                 fontSize: "16px",
//               }}
//             >
//               captcha table
//             </Link>
//           </div>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavigationMenu;
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        boxShadow: "none",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Toolbar style={{ justifyContent: "space-between", direction: "rtl" }}>
        {/* לוגו או שם בצד ימין */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#333",
            fontSize: "20px",
            fontWeight: "bold",
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
              <MenuItem component={Link} to="/captchaTest" onClick={handleClose}>
                captcha test
              </MenuItem>
              <MenuItem
                component={Link}
                to="/captchaTable"
                onClick={handleClose}
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
                color: "#555",
                fontSize: "18px", // הגדלת הטקסט
                fontWeight: "500",
              }}
            >
              captcha test
            </Link>
            <Link
              to="/captchaTable"
              style={{
                textDecoration: "none",
                color: "#555",
                fontSize: "18px", // הגדלת הטקסט
                fontWeight: "500",
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
