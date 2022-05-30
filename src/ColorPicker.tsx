import {
  Paper,
  Accordion,
  AccordionSummary,
  Box,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";

interface Props {
  name: string;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export const ColorPicker = ({ name, color, setColor }: Props) => {
  const handleChange = (color: string) => {
    setColor(color);
  };

  return (
    <Paper elevation={4} sx={{ mt: 2 }}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={
            <Box
              sx={{
                width: 15,
                height: 15,
                bgcolor: color,
                borderRadius: "2px",
              }}
            ></Box>
          }
        >
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HexColorPicker color={color} onChange={handleChange} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
