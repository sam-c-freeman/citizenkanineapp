import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

//CALENDAR 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//MUI
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, Paper, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CheckIcon from '@mui/icons-material/Check';


function ClientSchedule() {
  useEffect(() => {
    dispatch({ type: 'FETCH_SCHEDULE', payload: client.id })
  }, []);


  const dispatch = useDispatch();
  const client = useSelector(store => store.clientReducer)
  const schedule = useSelector(store => store.clientScheduleReducer)

  


  const [dog, setDog] = useState('');
  const [action, setAction] = useState('');
  const [scheduled, setScheduled] = useState('');
  // const [value, setValue] = React.useState(dayjs('2022-11-15T21:11:54'));
  const [value, setValue] = React.useState(dayjs());
 
  const [monday, setMonday] = useState(schedule["1"])
  const [tuesday, setTuesday] = useState(schedule["2"]);
  const [wednesday, setWednesday] = useState(schedule["3"]);
  const [thursday, setThursday] = useState(schedule["4"]);
  const [friday, setFriday] = useState(schedule["5"]);



  // this should gather info on what days are clicked to adjust the weekly schedule...
  // currently only works for one day
  const handleClick = (event) => {
    // toggle
    switch (event){
      case "Monday":
        setMonday(current => !current);
        dispatch({type: 'SET_MONDAY_CHANGE', payload: !monday})
        break;
      case "Tuesday":
        setTuesday(current => !current);
        dispatch({type: 'SET_TUESDAY_CHANGE', payload: !tuesday})
        break;
      case "Wednesday":
        setWednesday(current => !current);
        dispatch({type: 'SET_WEDNESDAY_CHANGE', payload: !wednesday})
        break;
      case "Thursday":
        setThursday(current => !current);
        dispatch({type: 'SET_THURSDAY_CHANGE', payload: !thursday})
        break;
      case "Friday":
        setFriday(current => !current);
        dispatch({type: 'SET_FRIDAY_CHANGE', payload: !friday})
        break;
    } 
  
  };


  const handleChange = (newValue) => {
    setValue(newValue);
    
  };

  // console.log('what is value right now?', value)

  // this should eventually dispatch to a saga with all of these values or whatever
  const handleSubmit = (event) => {
    let scheduleChangeObject = []
    let month = (value.$M +1)
    console.log('month?', month)
    if(dog.length > 1 ){
    for(let oneDog of dog){
      // console.log('do dogs get here?', oneDog)
      let dogObject ={
        date: `${value.$y}-${month}-${value.$D}`,
        is_scheduled: scheduled,
        dog_id: oneDog.dog_id,
        client_id: client.id
      }
      scheduleChangeObject.push(dogObject)
    }
  } else {
    let dogObject ={
      date: `${value.$y}-${month}-${value.$D}`,
      is_scheduled: scheduled,
      dog_id: dog,
      client_id: client.id
    }
    scheduleChangeObject.push(dogObject)
  } 
  //  dispatch({type: 'SET_SCHEDULE_CHANGE', payload: scheduleChangeObject})
   dispatch({type: 'SEND_ONE_SCHEDULE_CHANGE', payload: scheduleChangeObject})
  }

const regularScheduleChange = (event) =>{
  dispatch({type: 'REGULAR_SCHEDULE_CHANGE', payload: schedule})
}

  return (
    <div className="container">
      <h1>{client.first_name} {client.last_name}</h1>
      <h2>Weekly Schedule Change</h2>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Monday')} >
            <CardContent sx={{ backgroundColor: schedule["1"] ? '#7BCEC8' : null }}>
              Monday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2} >
          <Card raised onClick={(event) => handleClick('Tuesday')}>
            <CardContent  sx={{ backgroundColor: schedule["2"] ? '#7BCEC8' : null }}>
              Tuesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Wednesday')}>
            <CardContent sx={{backgroundColor: schedule["3"] ? '#7BCEC8' : null}}>
              Wednesday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Thursday')}>
            <CardContent sx={{backgroundColor: schedule["4"] ? '#7BCEC8' : null}}>
              Thursday
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={2}>
          <Card raised onClick={(event) => handleClick('Friday')}>
            <CardContent sx={{backgroundColor: schedule["5"] ? '#7BCEC8' : null}}>
              Friday
            </CardContent>
          </Card>
          <Button variant='contained' color='secondary' sx={{mt: 3, ml: 6}} onClick={regularScheduleChange}>Submit</Button>

        </Grid>

      </Grid>

      <h2>Month View / Adjust Schedule</h2>

      {/* OKAY so this actually becomes like a visualization of the calendar hopefully BUT we aren't there yet so  */}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ mr: 4, pb: 1 }}>
            <InputLabel>Dog</InputLabel>
       
            <Select value={dog} onChange={(event) => setDog(event.target.value)}>
            <MenuItem value={client.dogs}>All Dogs</MenuItem>
            {client.dogs && client.dogs.map(singleDog => {
              return (
                <MenuItem key={singleDog.dog_id} value={singleDog.dog_id}>{singleDog.dog_name}</MenuItem>
              )
            })}
            </Select>
        
          </FormControl>


          <FormControl fullWidth sx={{ mr: 4, pb: 1 }}>
            <InputLabel>Action</InputLabel>
            <Select value={scheduled} onChange={(event) => setScheduled(event.target.value)}>
              <MenuItem value={true}>Add Walk</MenuItem>
              <MenuItem value={false}>Cancel Walk</MenuItem>
            </Select>
          </FormControl>
      
          <Button variant='contained' color='secondary' onClick={handleSubmit}>Submit</Button>
        </Grid>
        <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </Grid>

      </Grid>
      <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'EditClientForm' })}>Back</Button>
      {/* <Button onClick={() => dispatch({ type: 'SET_CLIENT_MODAL', payload: 'ClientScheduleChanges' })}>Edit</Button> */}
    </div >
  )
}

export default ClientSchedule;