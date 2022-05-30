import { AppBar, Toolbar, Typography, Icon, SvgIcon } from "@mui/material";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar>
        <SvgIcon fontSize="large">
          <Logo height="100%" width="100%" />
        </SvgIcon>

        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          QR Code Creator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
