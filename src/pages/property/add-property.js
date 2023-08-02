import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Map from "../../components/maps/map";
import { useAuthContext } from "src/contexts/auth-context";
import { fetchTags, fetchTagsWithOutParent } from "src/utils/api-calls/service";

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
  const [inputValue1, setInputValue1] = useState("");
  const [tags, setTags] = useState([]);
  const [chipValue, setChipValue] = useState([]);
  const [selectTag, setSelectTag] = useState(true);
  const [addChildTag, setAddChildTag] = useState(false);
  const [showSelectTag, setShowSelectTag] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [suggestionTags, setSuggestionTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectSuggestionTag, setSelectSuggestionTag] = useState([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    getTags();
  }, []);

  useEffect(()=>{
      if(inputValue1.includes('/')){
        getTagsWithNoParent();
      }
  }, [inputValue1])

  const getTags = async () => {
    const getTagsData = await fetchTags(userAuthToken);
    setTags(getTagsData.message);
  };

  const getTagsWithNoParent = async() => {
    const getChildTags = await fetchTagsWithOutParent(userAuthToken)
    setTags([])
    setTags(getChildTags.message.results);
    setSuggestionTags(getChildTags.message.results)
  }

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
  // const handleDeleteChip = (chipToDelete) => {
  //   let tempTag = tags;
  //   const isTagExist = tags.some((tag) => tag.tagId === chipToDelete.tagId);
  //   tempTag.push(chipToDelete);
  //   if (!isTagExist) {
  //     setTags(tempTag);
  //   }
  //   setChipValue((prevChipValue) => prevChipValue.filter((chip) => chip !== chipToDelete));
  // };
  const handleAddProperty = (event) => {
    console.log({ getTags });
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

  const handleSuggestionClick = async(suggestion) => {
    setIsDropDownOpen(false);
    setTagInput(suggestion.name+'/');
    // const noParentTags = await getTagsWithNoParent();
    // console.log(suggestionTags)
  };

  const handleTagInput = (event) => {
    let { value } = event.target;
    if(value.includes('/')){
      setTagInput(value);
      setIsDropDownOpen(value.length > 0);
      console.log(`value inside if `, value)
      console.log('inside if condition')
      const suggestedData = tags.filter((tag) =>
      tag.name.toLowerCase().includes(value.split('/')[1].toLowerCase())
    );
    console.log(`suggestedData - 1`, suggestedData)
    setSuggestionTags([]);
    setSuggestionTags(suggestedData);
    console.log({suggestionTags})
    }
    else{
      setTagInput(value);
      setIsDropDownOpen(value.length > 0);
      const suggestedData = tags.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      console.log(`suggestedData - 2`, suggestedData)
      setSuggestionTags(suggestedData);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      setTagInput((prevValue) => prevValue.trim() + " /");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values); // You can do whatever you want with the form data here
      onClose(); // Close the dialog after form submission
    },
  });

  console.log({tagInput});

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
            {/* Property Name */}
            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Add Tags"
                variant="outlined"
                value={tagInput}
                onChange={handleTagInput}
                onKeyDown={handleKeyDown}
              />
              {isDropDownOpen && (
                <>
                  <Grid item xs={12}>
                    {suggestionTags.map((tag) => (
                      <MenuItem key={tag.tagId} onClick={() => handleSuggestionClick(tag)}>
                        {tag.name}
                      </MenuItem>
                    ))}
                    {!suggestionTags.length && (
                      <MenuItem key={1} onClick={() => handleSuggestionClick({name: tagInput})}>
                        {`Add '${tagInput}'`}
                      </MenuItem>
                    )}
                  </Grid>
                </>
              )}
            </Grid>

            {/* GMaps */}
            <Grid item xs={12} sx={{ zIndex: 300000 }}>
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
          <Grid container spacing={2} columnSpacing={{ xs: 4, sm: 2, md: 3 }}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">Features</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
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
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={12}>
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
