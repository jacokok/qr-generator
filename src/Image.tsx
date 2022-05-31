import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Slider,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ImageSettings } from "./types";

const Input = styled("input")({
  display: "none",
});

interface Props {
  image?: ImageSettings;
  setImage: React.Dispatch<React.SetStateAction<ImageSettings | undefined>>;
}

export const Image = ({ image, setImage }: Props) => {
  const [upload, setUpload] = useState<File | null | undefined>(undefined);
  const [size, setSize] = useState<number>(50);
  const [checked, setChecked] = useState(true);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (image) {
      const imageSettings: ImageSettings = {
        src: image.src,
        height: image.height,
        width: image.width,
        excavate: event.target.checked,
      };
      setImage(imageSettings);
    }
  };

  const handleSlide = (event: Event, newValue: number | number[]) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue;
    setSize(val);
    if (image) {
      const imageSettings: ImageSettings = {
        src: image.src,
        height: val,
        width: val,
        excavate: image.excavate,
      };
      setImage(imageSettings);
    }
  };

  const clear = () => {
    setUpload(undefined);
    setImage(undefined);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files ?? undefined;
    const file = files?.item(0);
    setUpload(file);
    const objectUrl = file ? URL.createObjectURL(file) : "";
    const imageSettings: ImageSettings = {
      src: objectUrl,
      height: size ?? 50,
      width: size ?? 50,
      excavate: checked ?? true,
    };
    setImage(imageSettings);
  };

  return (
    <Paper elevation={4} sx={{ mt: 2 }}>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Upload Image</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            Uploading image will download in PNG instead of SVG format
          </Typography>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleFileUpload}
            />
            <Button variant="outlined" component="span">
              Upload
            </Button>
            <Button onClick={clear}>Clear</Button>
            <Typography
              variant="caption"
              component="div"
              color="text.primary"
              sx={{ mt: 1 }}
            >
              {upload?.name}
            </Typography>
          </label>
          <Slider
            size="small"
            value={size}
            onChange={handleSlide}
            min={10}
            max={100}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChecked} />}
            label="Excavate Image"
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
