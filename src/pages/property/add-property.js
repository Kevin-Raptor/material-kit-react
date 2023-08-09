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
  Breadcrumbs,
  Chip,
  makeStyles,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Map from "../../components/maps/map";
import { useAuthContext } from "src/contexts/auth-context";
import {
  addNewTag,
  addRelationBetweenParentAndChild,
  fetchTags,
  fetchTagsWithOutParent,
  getChildParentRelationExist,
} from "src/utils/api-calls/service";
import capitalizeFirstLetter from "src/utils/capitalize-first-letter";

const initialValues = {
  propertyName: "",
  totalArea: "",
  bedRoom: "",
  bathRoom: "",
  doorNo: "",
  floorNo: "",
  address: "",
};

const chipColor = ["red", "green", "blue", "yellow", "orange", "violet"];
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
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState(null);
  const [suggestionInput, setSuggestionInput] = useState("");
  const [suggestionTags, setSuggestionTags] = useState([]);
  const [selectSuggestionTag, setSelectSuggestionTag] = useState([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [showChip, setShowChip] = useState(false);
  const [valueAfterSlash, setValueAfterSlash] = useState("");
  const [tagChip, setTagChip] = useState([]);

  const getTags = async () => {
    const getTagsData = await fetchTags(userAuthToken);
    setTags(getTagsData.message);
  };

  useEffect(() => {
    getTags();
    getTagsWithNoParent()

  }, []);


  const getTagsWithNoParent = async () => {
    const getChildTags = await fetchTagsWithOutParent(userAuthToken);
    localStorage.setItem('noParentTags', JSON.stringify(getChildTags.message.results));
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

  const getSuggestionTagWithNoParentAndChildTag = async(parentTagId) => {
    const getChildParentTag = await getChildParentRelationExist(parentTagId, userAuthToken);
    let getNoParentTags = localStorage.getItem('noParentTags');
    let storedData = JSON.parse(getNoParentTags);
    if(!storedData.length && !getChildParentTag.message.length){
      return [];
    }
    if(!storedData.length){
     const arr = [...getChildParentTag.message[0].children];
       return arr;
    }
    else{
      const arr = [...getChildParentTag.message[0].children, ...storedData];
      return arr;
    }
  }

  const handleAddProperty = (event) => {
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

  const handleSuggestionClick = async (suggestion) => {
    /**
     *  if tag is not avaialble in drop down then add tag by making an api call
     */
    let newTagResult;
    let newValueAfterSlash = "";

    if (suggestion?.tagId) {
      setSelectSuggestionTag((prevState) => [...prevState, suggestion]);
      const suggestionData = await getSuggestionTagWithNoParentAndChildTag(suggestion?.tagId);
      setTags(suggestionData);
      setSuggestionInput((prev) => prev + suggestion.name + " / ");
      setTagInput(null);
    } else if (suggestion?._id) {
      const suggestionData = await getSuggestionTagWithNoParentAndChildTag(suggestion?._id);
      setTags(suggestionData);
      setSelectSuggestionTag((prevState) => [...prevState, suggestion]);
      setSuggestionInput((prev) => prev + suggestion.name + " / ");
      setTagInput(null);
      // debugger;
      let isChildParentRelationExist = await getChildParentRelationExist(
        selectSuggestionTag[(selectSuggestionTag.length)-1]?._id,
        userAuthToken
      );

      /**
       * for already child parent relationship existing
       * and assigning new child to parent
       */
      if (
        isChildParentRelationExist.message.length > 0 &&
        isChildParentRelationExist.message[0].parent.tagId === selectSuggestionTag[0]._id &&
        !isChildParentRelationExist.message[0].children.some((item) => item._id === suggestion._id)
      ) {
        await addRelationBetweenParentAndChild(
          selectSuggestionTag[(selectSuggestionTag.length)-1]._id,
          suggestion._id,
          userAuthToken
        );
        /**
         *  when there is no relation between child and parent hence establishing new
         *  relation between child and parent
         */
      } else if (isChildParentRelationExist.message.length === 0) {
        await addRelationBetweenParentAndChild(
          selectSuggestionTag[(selectSuggestionTag.length)-1]._id,
          suggestion._id,
          userAuthToken
        );
      }
    } else if (!suggestion?.tagId) {
      let newTagObj;
      let tempArray = [];
      // debugger;
      if (suggestion.name.includes("/")) {
        let lenValue = suggestion.name.split(" / ");
        let strLen = lenValue.length - 1;
        newValueAfterSlash = lenValue[strLen];
        newTagObj = {
          name: newValueAfterSlash,
          fullName: capitalizeFirstLetter(newValueAfterSlash),
        };
      } else {
        newTagObj = {
          name: suggestion.name,
          fullName: capitalizeFirstLetter(suggestion.name),
        };
      }

      tempArray.push(newTagObj);
      newTagResult = await addNewTag(userAuthToken, { tags: tempArray });
      setSelectSuggestionTag((prevState) => [...prevState, newTagResult.message.results[0]]);
      setSuggestionInput(suggestion.name + " / ");
      setTagInput(null);
      if (selectSuggestionTag[(selectSuggestionTag.length)-1]?._id) {
        const assignRelation = await addRelationBetweenParentAndChild(
          selectSuggestionTag[(selectSuggestionTag.length)-1]._id,
          newTagResult.message.results[0]._id,
          userAuthToken
        );
        console.log(assignRelation);
      }
      const suggestionData = await getSuggestionTagWithNoParentAndChildTag(newTagResult.message.results[0]._id);
      setTags(suggestionData);
    }
    setIsDropDownOpen(false);
  };

  const handleTagInput = async(event) => {
    let { value } = event.target;
    if (value.trim() == "") {
      getTags();
      setSuggestionInput("");
      setSelectSuggestionTag([]);
    }
    if (value.includes(" / ")) {
      setTagInput(value);
      setIsDropDownOpen(value.length > 0);
      let lenValue = value.split(" / ");
      console.log({lenValue})
      let strLen = lenValue.length - 1;
      const newValueAfterSlash = lenValue[strLen];
      setValueAfterSlash(newValueAfterSlash);
      console.log({newValueAfterSlash});

      /**
       * if tag and subtag is same or it contain somewhtiespace then do not show the suggestion tag
       */
      console.log(`before if condition`, !value.split('/').includes(''))
      if(selectSuggestionTag[(selectSuggestionTag.length) - 1].name === newValueAfterSlash || newValueAfterSlash.match(/\s{1,}/) || value.split('/').includes('')){
       setIsDropDownOpen(false)
      }
      else{
        setIsDropDownOpen(true)
      }
      const data = selectSuggestionTag.filter((item)=>item.name === newValueAfterSlash);
      if(data.length > 0){
        const getChildTag = await getSuggestionTagWithNoParentAndChildTag(data[0]._id);
        console.log({getChildTag});
        setTags(getChildTag);
        const suggestedData = tags.filter((tag) =>
        tag.name.toLowerCase().includes(newValueAfterSlash?.toLowerCase())
      );
      setSuggestionTags(suggestedData);
      console.log({ suggestionTags });
      }
      else{
        const suggestedData = tags.filter((tag) =>
        tag.name.toLowerCase().includes(newValueAfterSlash?.toLowerCase())
      );
      setSuggestionTags(suggestedData);
      console.log({ suggestionTags });
      }

    } else {
      const data = selectSuggestionTag.filter((item)=>item.name === value);
      if(data.length > 0){
        const getChildTag = await getSuggestionTagWithNoParentAndChildTag(data[0]._id);
        setTags(getChildTag);
        const suggestedData = tags.filter((tag) =>
        tag.name.toLowerCase().includes(value?.toLowerCase())
      );
      setSuggestionTags(suggestedData);
      }
      setTagInput(value);
      setIsDropDownOpen(value.length > 0);
      const suggestedData = tags.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestionTags(suggestedData);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "/") {
      setTagInput((prevValue) => prevValue.trim() + " / ");
    }
  };

  const showTagsChip = (data) => {
    setShowChip(!showChip);
    setTagInput("");
    setSuggestionInput("")
    setTagChip((prev)=>[...prev, ...data]);
    setSelectSuggestionTag([]);
    getTags();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values); // You can do whatever you want with the form data here
      onClose(); // Close the dialog after form submission
    },
  });

  console.log({ tagInput });
  console.log({ suggestionInput });
  console.log({ selectSuggestionTag });

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

            <Grid item xs={10}>
              <TextField
                fullWidth
                size="small"
                label="Add Tags"
                variant="outlined"
                value={tagInput === null ? suggestionInput : tagInput}
                onChange={handleTagInput}
                // onKeyDown={handleKeyDown}
              />
              {isDropDownOpen && (
                <>
                  <Grid item xs={12} sx={{ zIndex: 500 }}>
                    {suggestionTags.map((tag) => (
                      <MenuItem
                        key={tag.tagId}
                        onClick={() => handleSuggestionClick(tag)}
                        sx={{ backgroundColor: "whitesmoke" }}
                      >
                        {tag.name}
                      </MenuItem>
                    ))}
                    {!suggestionTags.length && (
                      <MenuItem key={1} onClick={() => handleSuggestionClick({ name: tagInput })}>
                        {valueAfterSlash === "" ? `Add ${tagInput}` : `Add ${valueAfterSlash}`}
                      </MenuItem>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
            <Grid item xs={2}>
              <Button onClick={()=>showTagsChip(selectSuggestionTag)}> Add Tags</Button>
            </Grid>
            <Grid item xs={12}>
              {showChip && (
                <>
                  <Breadcrumbs>
                    {tagChip.map((item, index) => (
                      <Chip
                        label={item.name}
                        size="small"
                        variant="outlined"
                        sx={{ color: "whitesmoke", backgroundColor: `${chipColor[index]}` }}
                      />
                    ))}
                  </Breadcrumbs>
                </>
              )}
            </Grid>
            {/* GMaps */}
            <Grid item xs={12}>
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
        </form>
        <Grid
          container
          justifyContent="flex-end"
          mt={2}
          // sx={{ position: "sticky", bottom: 0, zIndex: 100 }}
        >
          <Button type="submit" variant="contained" color="primary" onClick={handleAddProperty}>
            Submit
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddProperty;
