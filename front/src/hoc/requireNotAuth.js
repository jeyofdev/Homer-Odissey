import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const requireNotAuth = (ComposedComponent) => {
  const NotAuthentication = (props) => {
    const history = useHistory();

    useEffect(() => {
      if (props.authenticated) {
        history.push('/profile');
      }
    }, [props.authenticated, history]);

    return <ComposedComponent {...props} />;
  };

  const mapStateToProps = (state) => ({
    authenticated: state.auth.token ? true : false,
  });

  return connect(mapStateToProps)(NotAuthentication);
};

export default requireNotAuth;
