import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import PopUp from './PopUp';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createSessionAction } from '../redux/actions/authActions';
import { updateMessageAction } from '../redux/actions/flashActions';

const SignUp = ({ flash, updateFlashMessage }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordVerif: '',
    name: '',
    lastname: '',
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
            updateFlashMessage('success', res.flash);
            history.replace('/');
          },
          (err) => updateFlashMessage('error', 'Ooops, problem')
        );
    } else {
      updateFlashMessage('error', 'Ooops, all fields must be completed ');
    }
  };

  return (
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
          <img
            src="http://images.innoveduc.fr/react_odyssey_homer/wildhomer.png"
            alt="Homer"
          />{' '}
        </Grid>
        <Grid item xs={12} sm={6}>
          {formIsSubmit && <PopUp message={flash.message} />}

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
              style={{ width: '100%' }}
              onChange={(e) => updateUser(e)}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              margin="normal"
              style={{ width: '100%' }}
              onChange={(e) => updateUser(e)}
            />
            <TextField
              type="password"
              name="passwordVerif"
              label="Password confirmation"
              margin="normal"
              variant="outlined"
              style={{ width: '100%' }}
              onChange={(e) => updateUser(e)}
            />
            <TextField
              type="text"
              name="name"
              label="name"
              margin="normal"
              variant="outlined"
              style={{ width: '100%' }}
              onChange={(e) => updateUser(e)}
            />
            <TextField
              type="text"
              name="lastname"
              label="lastname"
              margin="normal"
              variant="outlined"
              style={{ width: '100%' }}
              onChange={(e) => updateUser(e)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                width: '100%',
                paddingTop: '16px',
                paddingBottom: '16px',
                marginTop: '16px',
                display: 'block',
                flexWrap: 'wrap',
              }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  flash: state.flash,
});

const mapDispatchToProps = (dispatch) => ({
  createSession: (token) => dispatch(createSessionAction(token)),
  updateFlashMessage: (typeMessage, message) =>
    dispatch(updateMessageAction(typeMessage, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
