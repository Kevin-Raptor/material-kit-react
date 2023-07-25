import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Map from '../../components/maps/map'

const initialValues = {
  propertyName: "",
  totalArea: "",
  bedRoom: "",
  bathRoom: ""
};

const validationSchema = Yup.object().shape({
  propertyName: Yup.string().required("property name is required"),
});

const AddProperty = (props) => {
  const [addressData, setAddressData] = useState({});
  const { isOpen, onClose } = props;

  const handleAddressData = (addrData) => {
      setAddressData(addrData);
      console.log('AddProperty.js', addrData);
  }
  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values); // You can do whatever you want with the form data here
      onClose(); // Close the dialog after form submission
    },
  });
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xl">
      <DialogTitle sx={{ paddingY: 2 }}>Add Property</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} style={{ margin: "5px 0px" }}>
            {/* General information */}
          <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6">General Information</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="propertyName"
                  name="propertyName"
                  label="Property Name"
                  value={formik.values.propertyName}
                  onChange={formik.handleChange}
                  error={formik.touched.propertyName && Boolean(formik.errors.propertyName)}
                  helperText={formik.touched.propertyName && formik.errors.propertyName}
                />
              </Grid>
              <Grid item xs={12}>
                <Map handleAddressData={handleAddressData}/>
              </Grid>
          </Grid>
          {/* Features */}
          <Grid container spacing={2} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
              <Grid item xs={12} mt={3}>
                <Typography variant="h6">Features</Typography>
              </Grid>
              <Grid item xs={3}>
              <FormControl fullWidth>
                        <InputLabel
                          shrink
                          sx={{fontWeight: 'bold'}}
                        
                        >
                        Total Area
                        </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="totalArea"
                  name="totalArea"
                  label="Total Area"
                  value={formik.values.totalArea || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.totalArea && Boolean(formik.errors.totalArea)}
                  helperText={formik.touched.totalArea && formik.errors.totalArea}
                  // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  // id="bedRoom"
                  // name="bedRoom"
                  label="Bedrooms"
                  value={formik.values.bedRoom}
                  // onChange={formik.handleChange}
                  // error={formik.touched.bedRoom && Boolean(formik.errors.bedRoom)}
                  // helperText={formik.touched.bedRoom && formik.errors.bedRoom}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="bathRoom"
                  name="bathRoom"
                  label="Bathrooms"
                  value={formik.values.bathRoom}
                  onChange={formik.handleChange}
                  error={formik.touched.bathRoom && Boolean(formik.errors.bathRoom)}
                  helperText={formik.touched.bathRoom && formik.errors.bathRoom}
                />
              </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "16px" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProperty;
