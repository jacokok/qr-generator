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
import { Header } from "./Header";
import { Image } from "./Image";
import { ImageSettings } from "./types";

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

  console.log(image);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          m: 2,
        }}
      >
        <Card sx={{ bgcolor: "background.main" }}>
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
                imageSettings={image}
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
            <Image image={image} setImage={setImage} />
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
