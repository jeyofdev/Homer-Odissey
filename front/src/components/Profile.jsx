import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const Profile = () => {
  const [profile, setProfile] = useState({
    email: 'homer.simpson@wildcodeschool.fr',
    name: 'Homer',
    lastname: 'Simpson',
  });

  return (
    <Grid
      container
      alignItems="center"
      style={{
        height: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Grid
        item
        xs={12}
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
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
              <Button variant="contained" style={{ margin: '0 8px' }}>
                <Link to="/signin" className="navlink">
                  Log out
                </Link>
              </Button>
            </Grid>
            <List>
              <ListItem>
                <ListItemText primary="email" secondary="mon email" />
              </ListItem>
            </List>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
