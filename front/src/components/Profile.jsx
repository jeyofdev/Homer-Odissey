import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  profileAction,
  deleteSessionAction,
} from '../redux/actions/authActions';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const Profile = ({ token, profile, deleteSession, updateProfile }) => {
  useEffect(() => {
    axios({
      method: 'get',
      url: '/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => updateProfile(res.data));
  }, []);

  const handleLogOut = () => {
    deleteSession();
    updateProfile({});
  };

  const { email, name, lastname } = profile;

  return (
    <Paper
      elevation={4}
      style={{
        margin: '0 auto',
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
          <Button
            onClick={handleLogOut}
            variant="contained"
            style={{ margin: '0 8px' }}
          >
            LOG OUT
          </Button>
        </Grid>
        <List>
          <ListItem>
            <ListItemText primary="email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="fullname"
              secondary={`${name} ${lastname}`}
            />
          </ListItem>
        </List>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  profile: state.auth.profile,
});

const mapDispatchToProps = (dispatch) => ({
  deleteSession: (token) => dispatch(deleteSessionAction()),
  updateProfile: (profile) => dispatch(profileAction(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
