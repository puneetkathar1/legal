import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import cookie from 'js-cookie'
import Router from 'next/router'
import {parseCookies} from 'nookies'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Aminos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
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
    };
  const classes = useStyles();
  const [data, setData] = React.useState({
    email:"",
    password:""
})

const handleSubmit = async (e) => {
    e.preventDefault()
    if(data.email.includes(".com") && data.email.includes("@") && data.password.length > 1){
        const res =   await fetch(`https://murray-puneetkathar1.vercel.app//api/login`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email: data.email,
            password: data.password
          })
        })
    
        const res2 = await res.json()
        if(res2.error == "No User Found"){
          handleClick3()
        }
        if(res2.error == "Invalid Input"){
          handleClick()
        }
        if(res2.error == "Not Approved"){
            Router.push('/underreview')
          }
        else{
            console.log(res2)
       cookie.set('token',res2.token)
       cookie.set('fName',res2.user.fName)
       cookie.set('lName',res2.user.lName)
       cookie.set('email',res2.user.email)
    //    reactLocalStorage.setObject('var', {res2.user.fName, res2.user.lName, res2.user.email});
       Router.push('/profile')
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={(e)=>handleChange(e)}
              value={data.email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>handleChange(e)}
              value={data.password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e)=>handleSubmit(e)}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
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
          No User Found!
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