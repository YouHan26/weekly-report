/**
 * Created by YouHan on 2017/11/20.
 */
import PropTypes from 'prop-types';

const types = {
  user: PropTypes.shape({
    login: PropTypes.bool.isRequired,
    showModal: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
      email: PropTypes.string
    })
  })
};

export default types;
