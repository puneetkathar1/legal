import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Router from 'next/router'
import {parseCookies} from 'nookies'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClick2 = () => {
    setOpen2(true);

  };
  const handleClick3 = () => {
    setOpen3(true);

  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpen2(false);
    setOpen3(false);

  };
  const classes = useStyles();
  const [data, setData] = React.useState({
    fName:"",
    lName:"",
    email:"",
    password:""
})

const handleSubmit =  async (e) => {
    e.preventDefault()
    if(data.email.includes(".com") && data.email.includes("@") && data.fName.length > 1 && data.lName.length > 1 && data.password.length > 6 ){
      const res =   await fetch(`https://murray-puneetkathar1.vercel.app//api/signup`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          password: data.password
        })
      })
  
      const res2 = await res.json()
      console.log(res2)
      if(res2.error == "User Exists"){
        handleClick3()
        Router.push('/pricing')
      }
      if(res2.error == "Invalid Input"){
        handleClick()
      }
      if(res2.message == "Registered"){
        handleClick2()
          Router.push('/pricing')
      }

    } else {
      handleClick()
}
    
    }
const handleChange = (e) => {
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        
        }
  return (
    <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form  className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="fName"
                onChange={(e)=>handleChange(e)}
                value={data.fName}
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lName"
                onChange={(e)=>handleChange(e)}
                value={data.lName}
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                onChange={(e)=>handleChange(e)}
                value={data.email}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password (More than 6 Characters)"
                type="password"
                id="password"
                onChange={(e)=>handleChange(e)}
                value={data.password}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e)=>handleSubmit(e)}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Invalid Input
        </Alert>
    </Snackbar>
    <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          You have been Registered! Redirecting to Login Page
        </Alert>
    </Snackbar>
    <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          User Already Exists!
        </Alert>
    </Snackbar>
    </div>
  );
}

export async function getServerSideProps(ctx){
  const {token} = parseCookies(ctx)
  if(token){
      const {res} = ctx
      res.writeHead(302,{Location:"/profile"})
      res.end()
  }
  return {
      props:{}
  }
}