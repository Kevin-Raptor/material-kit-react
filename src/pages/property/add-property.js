import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  Typography,
  createFilterOptions,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Map from "../../components/maps/map";
import { useAuthContext } from "src/contexts/auth-context";
import { fetchTags } from "src/utils/api-calls/service";

const initialValues = {
  propertyName: "",
  totalArea: "",
  bedRoom: "",
  bathRoom: "",
  doorNo: "",
  floorNo: "",
  address: "",
};

const validationSchema = Yup.object().shape({
  propertyName: Yup.string().required("property name is required"),
  doorNo: Yup.string().required("door number is required"),
});

const filter = createFilterOptions();

const AddProperty = (props) => {
  const [addressData, setAddressData] = useState({});
  const [addressString, setAddressString] = useState("");
  const [validGmapsAddress, setValidGmapsAddress] = useState(false);
  const [addressLatLng, setAddressLatLng] = useState({
    lat: 12.980498,
    lng: 77.576634,
  });
  const { userAuthToken } = useAuthContext();
  const { isOpen, onClose } = props;
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [chipValue, setChipValue] = useState([]);
  const [selectTag, setSelectTag] = useState(true);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    const getTagsData = await fetchTags(userAuthToken);
    setTags(getTagsData.message);
  };

  const handleAddressData = (addrData) => {
    setAddressData(addrData);
  };

  const handleAddressString = (addrStringData) => {
    setAddressString(addrStringData);
  };
  const handleValidGmapAddress = (gmapAddrData) => {
    setValidGmapsAddress(gmapAddrData);
  };
  const handleAddrLatLng = (addrLatLngData) => {
    setAddressLatLng(addrLatLngData);
  };
  const handleDeleteChip = (chipToDelete) => {
    let tempTag = tags;
    const isTagExist = tags.some((tag) => tag.tagId === chipToDelete.tagId);
    tempTag.push(chipToDelete);
    if (!isTagExist) {
      setTags(tempTag);
    }
    setChipValue((prevChipValue) => prevChipValue.filter((chip) => chip !== chipToDelete));
  };
  const handleAddProperty = (event) => {
    console.log({getTags})
    event.preventDefault();
    let propertyDetailsArray = [];
    let propertyDetailsObj = {
      name: formik.values.propertyName,
      address: addressString,
      geolocation: `${addressLatLng.lat}, ${addressLatLng.lng}`,
      meta: {
        [formik.values.floorNo]: formik.values.floorNo,
        [formik.values.doorNo]: formik.values.doorNo,
        [formik.values.totalArea]: formik.values.totalArea,
        [formik.values.bedRoom]: formik.values.bedRoom,
        [formik.values.bathRoom]: formik.values.bathRoom,
        [formik.values.address]: formik.values.address,
      },
    };
    propertyDetailsArray.push(propertyDetailsObj);
    console.log({ properties: propertyDetailsArray });
  };

  const handleSelectTag = (event, newValue) => {
    console.log(`handleSelectTag called`);
    setSelectTag(true);
    setInputValue("");
    setValue("");
    console.log({ newValue });
    if (newValue && newValue.inputValue) {
      /**
       *  existing case
       *  create a map of existing tagnames with tagId
       *  if name is exist then get tagid for that name
       *
       *  new tag
       *  if name does not exist in map then make an api call
       *  with new tag name from the response append the object into tags
       *  and then update the map
       */
      setChipValue((prevSelectedTags) => [...prevSelectedTags, { name: newValue.inputValue }]);
      let updatedTag = tags.filter((item) => item.name !== newValue.inputValue);
      setTags(updatedTag);
    } else if (newValue) {
      // setInputValue(""); // Clear the input value when an option is selected
      setChipValue((prevSelectedTags) => [...prevSelectedTags, newValue]);
      let updatedTag = tags.filter((item) => item.name !== newValue?.name);
      setTags(updatedTag);
    }
  };
  const handleChooseTag = () => {
    setSelectTag(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values); // You can do whatever you want with the form data here
      onClose(); // Close the dialog after form submission
    },
  });
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md">
      <DialogTitle sx={{ paddingY: 2 }}>Add Property</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} style={{ margin: "5px 0px" }}>
          {/* General information */}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography variant="h6">General Information</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                size="small"
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
            <Grid item xs={12} container direction="row">
              {chipValue.map(
                (item) =>
                  item?.name && (
                    <Grid item key={item?.name}>
                      <Chip
                        label={item.name}
                        onDelete={() => handleDeleteChip(item)}
                        size="small"
                        style={{ margin: "2px" }}
                      />
                    </Grid>
                  )
              )}
              {selectTag ? (
                <Button
                  sx={{ ml: "4px" }}
                  size="small"
                  variant="outlined"
                  onClick={handleChooseTag}
                >
                  + New Tag
                </Button>
              ) : (
                <Autocomplete
                  size="small"
                  value={value}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  onChange={handleSelectTag}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== "" && !isExisting) {
                      console.log(`new Value`);
                      filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                        actualName: inputValue,
                      });
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={tags}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.name}</li>}
                  sx={{ width: 150, ml: '4px' }}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="Add Tags" />}
                />
              )}
            </Grid>

            {/* GMaps */}
            <Grid item xs={10} sx={{ zIndex: 300000 }}>
              <Map
                addressData={addressData}
                addressString={addressString}
                validGmapsAddress={validGmapsAddress}
                addressLatLng={addressLatLng}
                handleAddressData={handleAddressData}
                handleAddressString={handleAddressString}
                handleValidGmapAddress={handleValidGmapAddress}
                handleAddrLatLng={handleAddrLatLng}
              />
            </Grid>
          </Grid>
          {/* Features */}
          <Grid container spacing={2} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">Features</Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                {/* <InputLabel shrink sx={{ fontWeight: "bold" }}>
                  Total Area
                </InputLabel> */}
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  id="totalArea"
                  name="totalArea"
                  label="Total Area"
                  value={formik.values.totalArea || ""}
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
                size="small"
                variant="outlined"
                id="bedRoom"
                name="bedRoom"
                label="Bedrooms"
                value={formik.values.bedRoom}
                onChange={formik.handleChange}
                error={formik.touched.bedRoom && Boolean(formik.errors.bedRoom)}
                helperText={formik.touched.bedRoom && formik.errors.bedRoom}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                size="small"
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
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                id="doorNo"
                name="doorNo"
                label="Door No."
                value={formik.values.doorNo}
                onChange={formik.handleChange}
                error={formik.touched.doorNo && Boolean(formik.errors.doorNo)}
                helperText={formik.touched.doorNo && formik.errors.doorNo}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                id="floorNo"
                name="floorNo"
                label="Floor No."
                value={formik.values.floorNo}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          {/* Submit Button */}
          <Grid container justifyContent="flex-end" sx={{ marginTop: "16px" }}>
            <Button type="submit" variant="contained" color="primary" onClick={handleAddProperty}>
              Submit
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProperty;
