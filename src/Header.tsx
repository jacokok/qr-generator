import { AppBar, Toolbar, Typography } from "@mui/material";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar>
        <Logo height="40" width="40" />
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          QR Code Creator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
