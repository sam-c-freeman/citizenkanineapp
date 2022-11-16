import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CSVDateView from "./CSVDateView";
import dayjs from 'dayjs';
let localeData = require('dayjs/plugin/localeData');
let customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
import '../Desktop.css';

//MUI
import { Box, Typography, Button, Grid, FormControl, MenuItem, Select, InputLabel, TextField } from '@mui/material';
// import { styled } from '@mui/material/styles';

function Invoicing(){
  const clientList = useSelector(store => store.clientsReducer);
  const dispatch = useDispatch();
  const [selectedId, setId] = useState(0);
  const [selectedMonth, setMonth] = useState ('');
  const [selectedYear, setYear] = useState(dayjs().year());

  //this route gets all clients to populate client list //
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
  }, []);

  const months = dayjs.months();
  const getYears = () => {
    let max = 2050;
    let min = 2020
    let yearsArr = []
    for (let i = min; i <= max; i++) {
      yearsArr.push(i)
    }
    return yearsArr
  }
  const years = getYears();

  const fetchInvoiceData = () => {
    const month = months.indexOf(selectedMonth)+1;
    // console.log(selectedId,month,selectedYear);
    dispatch({
      type: 'FETCH_INVOICE_DATA',
      payload: {
        clientId: selectedId,
        month: month, 
        year: selectedYear
      }});
    setId(0);
  }
  
  return (
    <Box className="desktop_container" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'center'}}>
      <Grid container sx={{ m: 2, mx: 4, p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '80%'}}>
        <Grid item xs={10}>
          <FormControl sx={{mx: 2,  width: 150 }}>
            <InputLabel>Select Client</InputLabel>
              <Select
                size="small"
                value={selectedId}
                onChange={e => setId(e.target.value)}
              >
                <MenuItem value={0}>
                  <em>All</em>
                </MenuItem>
                  { clientList && clientList.map && clientList.map((client) => (
                <MenuItem
                  key = {client.id}
                  value={client.id}
                >
                  {client.first_name} {client.last_name}
                </MenuItem>
                ))} 
              </Select>
          </FormControl>
          <FormControl sx={{mr: 2,  width: 150 }}>
            <InputLabel>Select Month</InputLabel>
              <Select
                size="small"
                value={selectedMonth}
                onChange={e => setMonth(e.target.value)}
              >

                  { months.map((month, i) => (
                <MenuItem
                  key = {i}
                  value={month}
                >
                  {month}
                </MenuItem>
                ))} 
              </Select>
          </FormControl>
          <FormControl sx={{mr: 2,  width: 150 }}>
            <InputLabel>Select Year</InputLabel>
              <Select
                size="small"
                
                value={selectedYear}
                onChange={e => setYear(e.target.value)}
              >
              { years.map((year,i) => (
                <MenuItem
                  key = {i}
                  value={year}
                >
                  {year}
                </MenuItem>
              ))} 
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button size="large" variant="contained" color="secondary"
            onClick={e=>fetchInvoiceData()}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mx: 5, display:'flex', flexDirection: 'column', alignItems: 'center'}}>
          {/* TABLE OPTION */}
          <CSVDateView />
        </Grid>
      </Grid>
    </Box>
    );
}

export default Invoicing;