import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { HexColorPicker } from "react-colorful";
import {
  Box,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from "@mui/material";
import { ColorPicker } from "./ColorPicker";

interface ImageSettings {
  src: string;
  height: number;
  width: number;
}

function App() {
  const [value, setValue] = useState("test");
  const [bgColor, setBgColor] = useState("#fff");
  const [fgColor, setFgColor] = useState("#000");
  const [image, setImage] = useState<ImageSettings | undefined>(undefined);

  const handleChange = (event: any) => setValue(event.target.value);
  const svgRef = useRef<HTMLDivElement>(null);

  function downloadBlob(blob: Blob, filename: string) {
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
  }

  const download = () => {
    const first = svgRef.current as unknown as HTMLElement;
    const content = first.children[0].innerHTML;
    const contentWithSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="200" width="200" viewBox="0 0 29 29">${content}</svg>`;
    const blob = new Blob([contentWithSvg], { type: "image/svg+xml" });
    downloadBlob(blob, `qrcode.svg`);
  };

  return (
    <>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            QR Code Creator
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          m: 2,
        }}
      >
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              ref={svgRef}
              sx={{
                display: "flex",
                alignSelf: "center",
                mb: 2,
              }}
            >
              <QRCodeSVG
                value={value}
                size={200}
                bgColor={bgColor}
                fgColor={fgColor}
                imageSettings={{
                  excavate: true,
                  src: "https://upload.wikimedia.org/wikipedia/commons/a/a3/.NET_Logo.svg",
                  height: 100,
                  width: 100,
                }}
              />
            </Box>
            <TextField
              placeholder="QR Code Value"
              value={value}
              onChange={handleChange}
              size="small"
              fullWidth
            />
            <ColorPicker
              name="Foreground Color"
              color={fgColor}
              setColor={setFgColor}
            />
            <ColorPicker
              name="Background Color"
              color={bgColor}
              setColor={setBgColor}
            />
          </CardContent>

          <CardActions>
            <Button color="primary" onClick={download} variant="outlined">
              Download
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

export default App;
