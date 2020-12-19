import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

const requireAuth = (ComposedComponent) => {
  const Authentication = (props) => {
    const history = useHistory();

    useEffect(() => {
      if (!props.authenticated) {
        history.push('/signin');
      }
    }, [props.authenticated, history]);

    return <ComposedComponent {...props} />;
  };

  const mapStateToProps = (state) => ({
    authenticated: state.auth.token ? true : false,
  });

  return connect(mapStateToProps)(Authentication);
};

export default requireAuth;
