import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {parseCookies} from 'nookies'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Your application is under review!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'It may take up to 7 days to approve your application.'}
          {'Keep checking this page regularly.'}
        </Typography>
        <Typography variant="body1">We'll meet soon</Typography>
      </Container>
    </div>
  );
}



export async function getServerSideProps(ctx){
    const {token, email} = parseCookies(ctx)
    const {res} = ctx
    if(token){
        const res1 =  await fetch(`http://localhost:3000/api/pricing`,{
      method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                email: email
              })
    })
    const res2 = await res1.json()  
    if(res2.approvedStatus == true){
        res.writeHead(302,{Location:"/profile"})
        res.end()
    }
    }
    
    if(!token){
        const {res} = ctx
        res.writeHead(302,{Location:"/login"})
        res.end()
    }
    return {
        props:{}
    }
}