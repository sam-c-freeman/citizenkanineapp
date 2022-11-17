import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import '../../Desktop.css';

//COMPONENTS
import ClientModal from '../ClientModal/ClientModal';

//MUI
import { TableFooter, Paper, Table, TablePagination, TableSortLabel, Toolbar, TableBody, TableContainer, TableHead, TableRow, TableCell, Avatar, AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemSecondaryAction, Typography, Button, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// NO THESE COLORS AREN'T FINAL BUT WE DEF SHOULD HAVE SOME VISUAL CHANGE
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.secondary.light,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function ClientList() {
  const clientList = useSelector(store => store.clientsReducer);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('')

  //this route gets all clients to populate client list //
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' })
    dispatch({ type: 'CLEAR_MODALS'})
  }, []);

  const openModal = (view) => {
    dispatch({ type: 'SET_CLIENT_MODAL', payload: view }); //assures the view to be the right component
    dispatch({ type: 'SET_MODAL_STATUS' });   //opens the modal
  }

  const fetchOneClient = (client) => {
    console.log(client)
    dispatch({type: 'SET_CLIENT', payload: client })
    openModal('ClientDetails')
  }

  // const searchFunction = (event) => {
  //   dispatch({type: 'SEARCH_CLIENTS', payload: search})
  // }



  return (
    <Box className="desktop_container" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', my: 25}}>
      <Grid container sx={{ m: 2, mx: 4, p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'80%', gap: 2 }}>
       
          <TextField
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            label="Search Clients & Dogs"
            variant="filled"
            sx={{width: '60%'}}
          />
       
          <Button size="large" variant="contained" color="secondary" onClick={() => searchFunction()}>Search</Button>
          <Button onClick={() => openModal('AddClient')} variant='contained' color='secondary'>Add Client</Button>
       
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mx: 5, display:'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* TABLE OPTION */}
          <TableContainer component={Paper} sx={{width: '70%'}}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight: '800'}}>Name:</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Dogs:</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Phone</TableCell>
                  <TableCell sx={{fontWeight: '800'}}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientList && clientList.map && clientList.map((client ) => (
                    <StyledTableRow key={client.id} hover onClick={() => fetchOneClient(client)}> 
                      <TableCell>{client.first_name} {client.last_name}</TableCell>
                      <TableCell>{client.dogs.map(dog => (dog.dog_name + ' '))}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.email}</TableCell>
                    </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      </Grid>
      {/* <Button onClick={() => openModal('ClientDetails')}>LISA FRANK - SPIKE, FIDO</Button>  opens client details */}
      <ClientModal /> {/* only open when button is pressed */}
    </Box>
  );

}

export default ClientList;

