import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { tabConfig } from "src/config/tabs-config";
import { propertyData } from "src/utils/dummy-data";

export const AllPropertyList = (props) => {
    const [propertyDataArray, setPropertyDataArray] = useState([]);
    const {selectedTab} = props;
    console.log(selectedTab)
    const getPropertyData = (selectedTab) => {
        switch(selectedTab[0].tabName){
            case tabConfig[0].tabName:
                setPropertyDataArray(propertyData);
                break
            case tabConfig[1].tabName:
                const filteredDataOverDue = propertyData.filter((item)=>item.paymentStatus === selectedTab[0].tabName);
                setPropertyDataArray(filteredDataOverDue);
                break
            case tabConfig[2].tabName:
                const filteredDataDueSoon = propertyData.filter((item)=>item.paymentStatus === selectedTab[0].tabName);
                setPropertyDataArray(filteredDataDueSoon);
                break
            case tabConfig[3].tabName:
                const filteredDataDueLater = propertyData.filter((item)=>item.paymentStatus === selectedTab[0].tabName);
                setPropertyDataArray(filteredDataDueLater);
                break
            default:
                setPropertyDataArray(propertyData)
        }
    }
    useEffect(()=>{
        setPropertyDataArray(propertyData)
    }, [])


    useEffect(()=>{
        getPropertyData(selectedTab);
    }, [selectedTab[0].tabName])

 
  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell align="right">Tenants</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Outstanding</TableCell>
              <TableCell align="right">Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {propertyDataArray.map((row) => (
              <TableRow>
                <TableCell>
                  <Typography variant="body1">{row.property}</Typography>
                  <Typography variant="caption" display="block">
                    {row.address}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="body2">{row.tenants}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="body2">{row.date}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="body2">{row.outstanding}</Typography>
                </TableCell>
                <TableCell align="right">
                    <Typography variant="body2">{row.paymentStatus}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
