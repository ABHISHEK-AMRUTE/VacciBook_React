import './App.css';



import { AccordionSummary, AccordionDetails, Accordion, FormControl, InputLabel, Chip, Select, AppBar, Toolbar, IconButton, Button, Paper, makeStyles, TextField, Grid } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Component } from 'react';
import { red } from '@material-ui/core/colors';
import PageVisibility from 'react-page-visibility';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class App extends Component {


  constructor() {
    super()

    navigator.serviceWorker.register('sw.js');
    Notification.requestPermission(function (result) {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification('Testing Notifications', {
          body: "So that you won't miss out any slots",
          icon: './vaccination.svg'
        });
      });
    });


    var date = new Date();
    var formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    console.log(formatedDate)
    this.state = {
      pincode: "460001",
      date: formatedDate,
      time: 5000,
      age: 18,
      type: "COVAXINE",
      dose: 1,
      datestring: '',
      list: [],
      doRing: false,
      audioTimer: '',
      checkTimer: '',
      timerOn: false


    }

    this.state.list = [{
      "center_id": 1234,
      "name": "District General Hostpital",
      "name_l": "",
      "address": "45 M G Road",
      "address_l": "",
      "state_name": "Maharashtra",
      "state_name_l": "",
      "district_name": "Satara",
      "district_name_l": "",
      "block_name": "Jaoli",
      "block_name_l": "",
      "pincode": "413608",
      "lat": 28.7,
      "long": 77.1,
      "from": "09:00:00",
      "to": "18:00:00",
      "fee_type": "Paid",
      "fee": "250",
      "session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "date": "31-05-2021",
      "available_capacity": 50,
      "available_capacity_dose1": 0,
      "available_capacity_dose2": 25,
      "min_age_limit": 18,
      "vaccine": "COVISHIELD",
      "slots": [
        "FORENOON",
        "AFTERNOON"
      ]
    },
    {
      "center_id": 1234,
      "name": "District General Hostpital",
      "name_l": "",
      "address": "45 M G Road",
      "address_l": "",
      "state_name": "Maharashtra",
      "state_name_l": "",
      "district_name": "Satara",
      "district_name_l": "",
      "block_name": "Jaoli",
      "block_name_l": "",
      "pincode": "413608",
      "lat": 28.7,
      "long": 77.1,
      "from": "09:00:00",
      "to": "18:00:00",
      "fee_type": "Paid",
      "fee": "250",
      "session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "date": "31-05-2021",
      "available_capacity": 50,
      "available_capacity_dose1": 25,
      "available_capacity_dose2": 25,
      "min_age_limit": 18,
      "vaccine": "COVISHIELD",
      "slots": [
        "FORENOON",
        "AFTERNOON"
      ]
    },
    {
      "center_id": 1234,
      "name": "District General Hostpital",
      "name_l": "",
      "address": "45 M G Road",
      "address_l": "",
      "state_name": "Maharashtra",
      "state_name_l": "",
      "district_name": "Satara",
      "district_name_l": "",
      "block_name": "Jaoli",
      "block_name_l": "",
      "pincode": "413608",
      "lat": 28.7,
      "long": 77.1,
      "from": "09:00:00",
      "to": "18:00:00",
      "fee_type": "Paid",
      "fee": "250",
      "session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "date": "31-05-2021",
      "available_capacity": 50,
      "available_capacity_dose1": 25,
      "available_capacity_dose2": 25,
      "min_age_limit": 18,
      "vaccine": "COVISHIELD",
      "slots": [
        "FORENOON",
        "AFTERNOON"
      ]
    }];
    this.clickHandler = this.onButtonClicked.bind(this);



  }


  onPincodeChange = (event) => { this.setState({ pincode: event.target.value }) }
  onDateChange = (event) => {
    var arr = event.target.value.split('-');
    var temp = `${arr[2]}-${arr[1]}-${arr[0]}`;

    this.setState({
      date: event.target.value,
      datestring: temp
    })

  }
  onTimeChange = (event) => { this.setState({ time: event.target.value }) }
  onAgeChange = (event) => { this.setState({ age: event.target.value }) }
  onTypeChange = (event) => { this.setState({ type: event.target.value }) }
  onDoseChange = (event) => { this.setState({ dose: event.target.value }) }


  clearAudioIntervals = () => {
    clearInterval(this.state.audioTimer);
    // if (document.visibilityState == "visible") {
    //   console.log("Clearing audio interval timer and playback")

    // }
  }

  clearEverthing = () => {
    clearInterval(this.state.audioTimer);
    clearInterval(this.state.checkTimer);
    this.setState({
      doRing: false,
      audioTimer: '',
      checkTimer: '',
      timerOn: false

    })

  }


  onButtonClicked = () => {

    this.clearEverthing()

    // pincode = document.getElementById('pincode').value;
    // var temp = new Date(document.getElementById('date').value);
    // day = temp.getDate();
    // month = temp.getMonth() + 1;
    // year = temp.getFullYear()
    // time = document.getElementById('time').value;
    // age = document.getElementById('age').value;

    console.log(this.state)


    var tempcheckTimer = setInterval(() => {

      console.log('checking for slots...')
      var temp = []
      fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + this.state.pincode + '&date=' + this.state.datestring)
        .then(response => response.json())
        .then(data => {


          var ifRing = this.state.doRing;
          console.log(data)
          data.sessions.forEach(element => {


            if (this.state.age == element.min_age_limit || this.state.age == 50) {
              console.log('inside age')
              if (this.state.type == element.vaccine || this.state.type == "Check for both") {
                console.log('inside vaccine type')
                if ((this.state.dose == 0 && element.available_capacity_dose1 > 0) || (this.state.dose == 1 && element.available_capacity_dose2 > 0) || (this.state.dose == 2 && (element.available_capacity_dose1 > 0 || element.available_capacity_dose2 > 0))) {
                  console.log('inside dose')
                  ifRing = true;
                  temp.push(element)
                  navigator.serviceWorker.ready.then(function (registration) {
                    registration.showNotification('Vaccine slots are available', {
                      body: element.address + ", " + element.block_name + ", " + element.district_name + ", " + element.state_name,
                      icon: './vaccination.svg'
                    });
                  });
                }

              }
            }
          });


          if (ifRing) {
            console.log('wanted to ring')

            clearInterval(tempcheckTimer);
            var audio = new Audio('voice_over.mp3');
            audio.play();

            if (document.visibilityState != "visible") {

              var tempaudioTimer = setInterval(() => {
                var audio = new Audio('voice_over.mp3');
                audio.play();

              }, 6000)

              this.setState({
                checkTimer: '',
                audioTimer: tempaudioTimer,
                list: temp,
                timerOn: false
              })

            } else {

              this.setState({
                checkTimer: '',
                audioTimer: '',
                list: temp,
                timerOn: false
              })

            }




          } else {
            console.log('no to ring')
            this.setState({
              checkTimer: tempcheckTimer,
              audioTimer: '',
              list: temp,
              timerOn: true
            })
          }
        });



    }, this.state.time);


    this.setState({
      timerOn: true
    })
  }


  handleVisibilityChange = isVisible => {


    if (isVisible) { console.log('visible'); this.clearAudioIntervals() }
    else console.log('not visible')

  }


  // document.addEventListener("visibilitychange", event => {
  //   clearAudioIntervals()
  // })




  render() {

    const li = (<div class="glassmorphism"><Table className="table" aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Address</TableCell>
          <TableCell align="right">Min Age</TableCell>
          <TableCell align="right">Dose 1</TableCell>
          <TableCell align="right">Dose 2</TableCell>
          <TableCell align="right">Vaccine</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {   this.state.list.map(element => {
          const dose1_st = `${element.available_capacity_dose1}`
          const dose2_st = `${element.available_capacity_dose2}`
          const age_allowed = `${element.min_age_limit} +`
          const number_of_dose_one = (element.available_capacity_dose1 > 0 ? <Chip label={dose1_st} color="primary" /> : <Chip label={dose1_st} color="secondary" />);
          const number_of_dose_two = (element.available_capacity_dose2 > 0 ? <Chip label={dose2_st} color="primary" /> : <Chip label={dose2_st} color="secondary" />);

          return (

            // <Paper className="papers listPaper" elevation={3} >
            //   <Grid container>
            //     <Grid className="gridItem" item xs={12} sm={3}>
            //       <b>{element.name}</b> <br></br>
            //       {element.address}, {element.district_name}, {element.state_name}
            //     </Grid>
            //     <Grid className="gridItem" item xs={12} sm={9}>

            //       {number_of_dose_one} &nbsp; &nbsp; {number_of_dose_two} &nbsp; &nbsp; <Chip color="primary" label={age_allowed}></Chip>

            //     </Grid>
            //   </Grid>

            // </Paper>


            <TableRow >
              <TableCell component="th" scope="row">
                <b>{element.name}</b> <br></br>
                {element.address}, {element.district_name}, {element.state_name}
              </TableCell>
              <TableCell align="right">{age_allowed}</TableCell>
              <TableCell align="right">{number_of_dose_one}</TableCell>
              <TableCell align="right">{number_of_dose_two}</TableCell>
              <TableCell align="right">{element.vaccine}</TableCell>
            </TableRow>


          )
        })}
      </TableBody>
    </Table>
    </div>)


    var checkingDisplay = this.state.timerOn ? (

      <div className="glassmorphism center" >
        <h1>
          VacciBook is checking for slots.
      </h1>
     I will notify you when any slots will be available. You can continue working. <b>Please don't close this tab, inorder to get notifications</b>
      </div>) : (<div className=" glassmorphism"  >



        <Grid container >
          <Grid className="gridItem" item xs={12} sm={6}>
            <div className="topMargin" />
            <Typography variant="h3" color="textPrimary" > <b>VACCIBOOK</b></Typography>


            <Typography color="textSecondary">  I know you are busy. Let me check slots for you while you work.</Typography>
            <br></br>
            <b>How to operate?</b>
            <Typography color="textSecondary">
              <ul>
                <li>Fill in the form.</li>
                <li>Start slot checking</li>
                <li>VacciBook will check slots after every selected time.</li>
                <li>When slots are available, you will be notified by notification and voice over.</li>
                <li>Don't close this tab. You can work leaving this tab open sideways.</li>
              </ul>
            </Typography>
            {/* <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        Want help?
  </AccordionSummary>
      <AccordionDetails>
        adasd
  </AccordionDetails>
    </Accordion> */}

          </Grid>
          <Grid className="gridItem" item xs={12} sm={6}>


            <div className="formDiv">


            <div className="extraPadding" >
              <TextField fullWidth className="formItemStyles" type="number" id="outlined-basic" label="Pin Code" variant="outlined" value={this.state.pincode} onChange={this.onPincodeChange} /><br></br>
              </div>
              <div className="extraPadding" >
              <TextField
                value={this.state.date}
                className="formItemStyles"
                id="date"
                fullWidth

                onChange={this.onDateChange}
                label="Want to book vaccine on which date?"
                type="date"

                variant="outlined"
                className="textField"
                InputLabelProps={{
                  shrink: true,
                }}
              />
           </div>

              <Grid container>
                <Grid className="gridItem" item xs={12} sm={6}>
                  <div className="extraPadding">
                    <FormControl variant="outlined" className="formControl">
                      <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
                      <Select
                        native
                        onChange={this.onAgeChange}
                        value={this.state.age}
                        fullWidth={true}
                        label="Age"
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}

                      >
                        <option aria-label="None" value={50} />
                        <option value={18}>18+</option>
                        <option value={45}>45+</option>
                        <option value={50}>Check For Both</option>
                      </Select>
                    </FormControl>
                  </div>

                </Grid>
                <Grid className="gridItem" item xs={12} sm={6}>
                  <div className="extraPadding">
                    <FormControl variant="outlined" className="formControl">
                      <InputLabel htmlFor="outlined-age-native-simple">Vaccine type</InputLabel>
                      <Select
                        native
                        onChange={this.onTypeChange}
                        value={this, this.state.type}
                        fullWidth={true}
                        label="Age"
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}

                      >
                        <option aria-label="None" value="Check for both" />
                        <option value={"COVISHIELD"}>Covishield</option>
                        <option value={"COVAXINE"}>Covaxine</option>
                        <option value={"Check for both"}>Check For Both</option>
                      </Select>
                    </FormControl>
                  </div>

                </Grid>
              </Grid>

              <div className="extraPadding" >
              <FormControl variant="outlined" className="formControl">
                <InputLabel htmlFor="outlined-age-native-simple">Time Interval after which I will check for slots repeatedly is</InputLabel>
                <Select
                  native
                  onChange={this.onTimeChange}
                  value={this.state.time}
                  fullWidth={true}
                  label="time"
                  inputProps={{
                    name: 'time',
                    id: 'adfaf',
                  }}

                >
                  <option aria-label="None" value="" />
                  <option value={5000}>5 Seconds</option>
                  <option value={10000}>10 Seconds</option>
                  <option value={30000}>30 Seconds</option>
                  <option value={60000}>1 Minute</option>
                  <option value={300000}>5 Minutes</option>
                  <option value={600000}>10 Minutes</option>
                </Select>
              </FormControl>
          </div>

              <Grid container>
                <Grid className="gridItem" item xs={12} sm={6}>
                  <div className="extraPadding">
                    <FormControl variant="outlined" className="formControl">
                      <InputLabel htmlFor="outlined-age-native-simple">Select Dose</InputLabel>
                      <Select
                        native
                        value={this.state.dose}
                        fullWidth={true}
                        label="Age"
                        onChange={this.onDoseChange}
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}

                      >
                        <option aria-label="None" value="" />
                        <option value={0}>Dose One</option>
                        <option value={1}>Dose Two</option>
                        <option value={2}>Check For Both</option>
                      </Select>
                    </FormControl>
                  </div>


                </Grid>
                <Grid className="gridItem" item xs={12} sm={6}>
                  <div className="extraPadding">
                  <div className="topMargin" />
                    <Button size="large" className="topMargin formControl-half" variant="contained" color="primary" onClick={this.onButtonClicked}>Start Checking</Button>

                  </div>


                </Grid>
              </Grid>




              <div className="topMargin" />
              <div className="topMargin" />
      <Typography color="textSecondary"> * We hereby inform you that we do not store above information on any kind of our servers.
</Typography>

    </div>

          </Grid>

        </Grid>






      </div>)

    return (
      <div className="App" >
        <PageVisibility onChange={this.handleVisibilityChange}></PageVisibility>


        <div className="outerDivOfPage">

          {checkingDisplay}
          <div className="topMargin" /> <div className="topMargin" /> <div className="topMargin" />


          <div>
            {li}
          </div>

        </div>
        {/* end of wrapping div of the form body */}


      </div>
    );
  }
}

export default App;
