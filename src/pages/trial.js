import { Box, Button, Container } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Spreadsheet from "react-spreadsheet";
import { useState } from 'react';
import { ReactSpreadsheetImport } from "react-spreadsheet-import";


const dummyData = [
    [{ value: 1 }, { value: 2 }],
    [{ value: 1 }, { value: 2 }],
    [{ value: 1 }, { value: 2 }],
    [{ value: 1 }, { value: 2 }],
    [{ value: 1 }, { value: 2 }],
];

const fields = [
    {
      // Visible in table header and when matching columns.
      label: "Name",
      // This is the key used for this field when we call onSubmit.
      key: "name",
      // Allows for better automatic column matching. Optional.
      alternateMatches: ["first name", "first"],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: "Rupert",
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: "Age",
      // This is the key used for this field when we call onSubmit.
      key: "age",
      // Allows for better automatic column matching. Optional.
      alternateMatches: ["first name", "ages"],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - "input" / "checkbox" / "select".
        type: "input",
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: "30",
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Age is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error",
        },
      ],
    },
  ]

const Page = () => {
    const [data, setData] = useState(dummyData)
    const [isOpen, setIsOpen] = useState(false)

    const handleSetData = (data) => {
        console.log({ data })
        setData(data)
    }

    const handleOnClose = () => {
        setIsOpen(false)
    }

    const convertData = (data) => {
        return data.map((item) => {
          const transformedItem = Object.entries(item).map(([key, value]) => {
            return { value };
          });
          return transformedItem;
        });
      };

    const handleAddCsvData = (data, file) => {
        console.log({data,file})

        let convertedData = convertData(data.all)
        setData(convertedData)
    }
    return (
        <>
            <Head>
                <title>
                    Trial | Devias Kit
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Button onClick={() => setIsOpen(true)}>Open</Button>
                    <ReactSpreadsheetImport isOpen={isOpen} onClose={handleOnClose} onSubmit={handleAddCsvData} fields={fields} />

                    <Spreadsheet data={data} onChange={handleSetData} />
                </Container>
            </Box>
        </>

    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
