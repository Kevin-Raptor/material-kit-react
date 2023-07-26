import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

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
  const { userAuthToken } = useAuthContext();
  const { isOpen, onClose } = props;
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleAddressData = (addrData) => {
    setAddressData(addrData);
  };

  const getTags = async () => {
    const getTagsData = await fetchTags(userAuthToken);
    setTags(getTagsData.message);
  };

  // Function to handle chip creation
  const handleCreateChip = () => {
    if (inputValue.trim() !== "" && !value.some((option) => option.name === inputValue)) {
      setValue([...value, { name: inputValue }]);
      setInputValue(""); // Clear the inputValue after adding the chip
    }
  };

  useEffect(() => {
    getTags();
  }, []);

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
            <Grid item xs={5}>
              <Autocomplete
                multiple
                value={value}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string" || newValue.inputValue === inputValue) {
                    return;
                  }
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  const isExisting = options.some((option) => inputValue === option.name);
                  if (inputValue.trim() !== "" && !isExisting) {
                    filtered.push({
                      name: inputValue,
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
                sx={{ width: 500 }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    label="Free solo with text demo"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleCreateChip();
                      }
                    }}
                    onBlur={() => {
                      handleCreateChip();
                    }}
                  />
                )}
              />
              {value.map((option, index) => (
                <Chip
                  key={index}
                  label={option.name}
                  onDelete={() => {
                    setValue(value.filter((item) => item.name !== option.name));
                  }}
                  style={{ marginBottom: 5 }} // Optional: Add spacing between chips
                />
              ))}
            </Grid>
            <Grid item xs={10}>
              <Map handleAddressData={handleAddressData} />
            </Grid>
          </Grid>
          {/* Features */}
          <Grid container spacing={2} columnSpacing={{ xs: 3, sm: 2, md: 3 }}>
            <Grid item xs={12} mt={3}>
              <Typography variant="h6">Features</Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel shrink sx={{ fontWeight: "bold" }}>
                  Total Area
                </InputLabel>
                <TextField
                  fullWidth
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
            <Grid item xs={4}>
              <TextField
                fullWidth
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
                variant="outlined"
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
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

{
  /* <Autocomplete
multiple
value={value}
onChange={(event, newValue) => {
  setValue(newValue);
  console.log(newValue);
}}
inputValue={inputValue}
onInputChange={(event, newInputValue) => {
  setInputValue('');
}}
filterOptions={(options, params) => {
  const filtered = filter(options, params);

  // Suggest the creation of a new value
  const isExisting = options.some((option) => inputValue === option.name);
  if (inputValue !== "" && !isExisting) {
    console.log(inputValue)
    filtered.push({
      inputValue,
      name: `${inputValue}`,
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
sx={{ width: 500 }}
freeSolo
renderInput={(params) => (
  <TextField fullWidth {...params} label="Free solo with text demo" />
)}
renderTags={(value, getTagProps) =>
  value.map((option, index) => (
    <Chip
      label={option.name}
      {...getTagProps({ index })}
      style={{ marginBottom: 5 }} // Optional: Add spacing between chips
    />
  ))
}
/> */
}
