import React from 'react';
import { connect } from 'react-redux';
import { updateMessageAction } from '../redux/actions/flashActions';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const PopUp = ({ flash }) => {
  const color = flash.type === 'success' ? '#43a047' : '#d32f2f';

  return (
    <SnackbarContent
      message={flash.message}
      style={{ backgroundColor: color }}
    />
  );
};

const mapStateToProps = (state) => ({
  flash: state.flash,
});

const mapDispatchToProps = (dispatch) => ({
  updateFlashMessage: (typeMessage, message) =>
    dispatch(updateMessageAction(typeMessage, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
