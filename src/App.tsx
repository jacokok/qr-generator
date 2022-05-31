import { useState, useRef } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { ColorPicker } from "./ColorPicker";
import { Header } from "./Header";
import { Image } from "./Image";
import { ImageSettings } from "./types";
import { downloadCanvas, downloadSVG } from "./util";

function App() {
  const [value, setValue] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [fgColor, setFgColor] = useState("#000");
  const [image, setImage] = useState<ImageSettings | undefined>(undefined);

  const handleChange = (event: any) => setValue(event.target.value);
  const svgRef = useRef<HTMLDivElement>(null);

  const handleFileDownload = (isLarge: boolean) => {
    if (image?.src) {
      downloadCanvas(svgRef.current, isLarge);
    } else {
      downloadSVG(svgRef.current, isLarge);
    }
  };

  const largerImage = image
    ? {
        src: image.src,
        excavate: image.excavate,
        height: image.height * 5,
        width: image.width * 5,
      }
    : image;

  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "start",
          p: 2,
        }}
      >
        <Grid item md={6} xs={12}>
          <Card sx={{ bgcolor: "background.main" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
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
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
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
                }}
              >
                {image?.src ? (
                  <>
                    <QRCodeCanvas
                      value={value}
                      size={200}
                      bgColor={bgColor}
                      fgColor={fgColor}
                      imageSettings={image}
                    />
                    <QRCodeCanvas
                      hidden={true}
                      value={value}
                      size={1000}
                      bgColor={bgColor}
                      fgColor={fgColor}
                      imageSettings={largerImage}
                    />
                  </>
                ) : (
                  <QRCodeSVG
                    value={value}
                    size={200}
                    bgColor={bgColor}
                    fgColor={fgColor}
                    imageSettings={image}
                  />
                )}
              </Box>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                onClick={() => handleFileDownload(false)}
                variant="outlined"
              >
                Download
              </Button>
              <Button
                color="secondary"
                onClick={() => handleFileDownload(true)}
                variant="outlined"
              >
                Download Large
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
