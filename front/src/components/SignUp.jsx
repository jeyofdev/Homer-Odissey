import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
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
  const [formisSubmit, setFormIsSubmit] = useState(false);

  const updateEmailField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/auth/signup', user)
      .then((response) => response.data)
      .then(
        (res) => setFlash({ ...flash, success: res.flash }),
        (err) => setFlash({ ...flash, success: '', error: 'Ooops, problem' })
      );

    setFormIsSubmit(true);
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
            <Grid item xs={12} sm={6} style={{ 'text-align': 'center' }}>
              {' '}
              <img src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png" />{' '}
            </Grid>
            <Grid item xs={12} sm={6} alignContent="center">
              {formisSubmit &&
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
                  item
                  xs={12}
                  sm={6}
                  type="email"
                  name="email"
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  onChange={(e) => updateEmailField(e)}
                />
                <TextField
                  item
                  xs={12}
                  sm={6}
                  type="password"
                  name="password"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  margin="normal"
                  className={classes.textField}
                  onChange={(e) => updateEmailField(e)}
                />
                <TextField
                  type="password"
                  name="passwordVerif"
                  label="Password confirmation"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  onChange={(e) => updateEmailField(e)}
                />
                <TextField
                  type="text"
                  name="name"
                  label="name"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  onChange={(e) => updateEmailField(e)}
                />
                <TextField
                  type="text"
                  name="lastname"
                  label="lastname"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  onChange={(e) => updateEmailField(e)}
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
