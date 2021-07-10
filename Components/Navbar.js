import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'
import Router from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: "#181D23",
    height: "90px",
    fontFamily: "'Montserrat', sans-serif"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginTop: "20px",
    fontSize: "2rem"
  },
  Button: {
    marginTop: "15px",
    fontSize: "1rem",
    padding: '0.6rem',
    textTransform: 'capitalize',
    border: 'solid 0.01px #9488F0',
    borderRadius: '10px',
    margin: '1rem',
    backgroundColor: '#232A32',
    height: '3rem',
    '&:hover': {
      background: "#9488F0",
   }
}
}));

function Navbar() {
  const classes = useStyles();
  const cookieuser = parseCookies()
  const user =  cookieuser.token 
  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar} position="sticky">
        <Toolbar>
        <Link href="/">
          <Typography style={{cursor: "pointer", margin: '10px', fontSize: '50px', flexDirection: 'row', display: 'flex', fontFamily: "'Montserrat', sans-serif"}} variant="h6" className={classes.title}>
            JP <div style={{color: '#9488F0', height: '50px'}} >lus+ </div>
          </Typography></Link>
        
          {user ? <> <Link href="/profile"><a><Button className={classes.Button} color="inherit">Profile</Button></a></Link>
          <Button className={classes.Button} color="inherit" onClick={()=>{
                  cookie.remove('token')
                  cookie.remove('email')
                  cookie.remove('fName')
                  cookie.remove('lName')
                  Router.push('/login')
                }} >Logout</Button>
          </>
           :
           <>
          <Link href="/login"><a><Button className={classes.Button} color="inherit">Login</Button></a></Link>
          <Link href="/signup"><a><Button className={classes.Button} color="inherit">Sign Up</Button></a></Link>
          </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Navbar