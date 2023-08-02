import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useState } from "react";

export const ChildTag = (props) => {
  const [value, setValue] = useState("");
  const {handleSelectChildTag, handleShowSelectTag} = props;
  const handleChange = (event) => {
    setValue(event.target.value);
    if(value === 'yes')
    handleSelectChildTag(false);
    handleShowSelectTag(true)
  };
  return (
    <>
       <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
      <Typography variant="caption" display="block" gutterBottom>
        Do you want to add child tag ?
      </Typography>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </Stack>
    <Grid container>
      <Grid item xs={12}>

      </Grid>
    </Grid>
    </>
   
  );
};
