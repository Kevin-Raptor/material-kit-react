import { Chip, Grid } from "@mui/material";

export const Tags = (props) => {
  const { chipValue, handleDeleteChip } = props;
  return (
    <>
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
    </>
  );
};
