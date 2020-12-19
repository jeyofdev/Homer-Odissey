import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = () => ({
  button: {
    display: 'block',
    flexWrap: 'wrap',
    width: '100%',
  },
  input: {
    display: 'none',
  },
  textField: {
    width: '100%',
  },
});

const SignUp = (props) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordVerif: '',
    name: '',
    lastname: '',
  });
  const [flash, setFlash] = useState({
    success: '',
    error: '',
  });
  const [formIsSubmit, setFormIsSubmit] = useState(false);

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormIsSubmit(true);

    const { email, password, passwordVerif, name, lastname } = user;

    if (email && password && passwordVerif && name && lastname) {
      axios
        .post('/auth/signup', user)
        .then((response) => response.data)
        .then(
          (res) => {
            setFlash({ ...flash, success: res.flash });
            history.push('/');
          },
          (err) => setFlash({ ...flash, success: '', error: 'Ooops, problem' })
        );
    } else {
      setFlash({
        ...flash,
        success: '',
        error: 'Ooops, all fields must be completed ',
      });
    }
  };

  const { classes } = props;

  return (
    <Grid
      container
      alignItems="center"
      style={{ height: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      <Grid
        item
        xs={12}
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <Paper
          elevation={4}
          style={{
            margin: 32,
            padding: 32,
          }}
        >
          <Grid container alignItems="center" justify="center">
            <Grid
              style={{
                textAlign: 'left',
                position: 'relative',
                width: '100%',
              }}
              className="nav"
            >
              <Button variant="contained" style={{ margin: '0 8px' }}>
                <Link to="/signin" className="navlink">
                  Sign in
                </Link>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
              {' '}
              <img src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png" />{' '}
            </Grid>
            <Grid item xs={12} sm={6}>
              {formIsSubmit &&
                (flash.success ? (
                  <SnackbarContent
                    className={classes.snackbar}
                    message={flash.success}
                    style={{ backgroundColor: '#43a047' }}
                  />
                ) : (
                  <SnackbarContent
                    className={classes.snackbar}
                    message={flash.error}
                    style={{ backgroundColor: '#d32f2f' }}
                  />
                ))}

              <form
                noValidate
                autoComplete="off"
                onSubmit={(e) => handleSubmit(e)}
                style={{ marginTop: '16px' }}
              >
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  onChange={(e) => updateUser(e)}
                />
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField}
                  onChange={(e) => updateUser(e)}
                />
                <TextField
                  type="password"
                  name="passwordVerif"
                  label="Password confirmation"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  onChange={(e) => updateUser(e)}
                />
                <TextField
                  type="text"
                  name="name"
                  label="name"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  onChange={(e) => updateUser(e)}
                />
                <TextField
                  type="text"
                  name="lastname"
                  label="lastname"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  onChange={(e) => updateUser(e)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.textField}
                  style={{
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    marginTop: '16px',
                  }}
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(SignUp);
