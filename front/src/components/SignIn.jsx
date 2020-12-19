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

const SignIn = ({ createSession, flash, updateFlashMessage }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [formIsSubmit, setFormIsSubmit] = useState(false);

  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormIsSubmit(true);

    const { email, password } = user;

    if (email && password) {
      axios
        .post('/auth/signin', user)
        .then((response) => response.data)
        .then(
          (res) => {
            updateFlashMessage('success', res.flash);
            createSession(res.token);
            history.replace('/');
          },
          (err) =>
            updateFlashMessage('error', 'Ooops, your login details are wrong')
        );
    } else {
      updateFlashMessage('error', 'Ooops, all fields must be completed');
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
            <Link to="/signup" className="navlink">
              Sign Up
            </Link>
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ textAlign: 'center', position: 'relative' }}
        >
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
                display: 'block',
                paddingTop: '16px',
                paddingBottom: '16px',
                marginTop: '16px',
                flexWrap: 'wrap',
                width: '100%',
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
