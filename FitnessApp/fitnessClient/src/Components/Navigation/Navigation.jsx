import React from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Navigation = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("logout");
    handleClose();
  };

  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 48 48"
          >
          
          </svg>
        </div>
        <div className="space-y-6">
          {Array.isArray(navigationMenu) &&
            navigationMenu.length > 0 &&
            navigationMenu.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer flex space-x-3 items-center"
                onClick={() =>
                  item.title === "Profile"
                    ? navigate(`/profile/${5}`)
                    : navigate(item.path)
                }
              >
                {item.icon}
                <p className="text-xl">{item.title}</p>
              </div>
            ))}
        </div>
        <div className="py-10">
          <Button
            sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "#000000",
            }}
            variant="contained"
          >
            Post
          </Button>
        </div>
        <div className="py-10"></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            alt="username"
            src="https://i.pinimg.com/736x/ce/6b/a0/ce6ba011f7ca428886756d91cf807dde.jpg"
          />
          <div>
            <span>Bruce</span>
            <span className="opacity-70">@bruce</span>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
