import PropTypes from 'prop-types';
import css from './Message.module.css';

const Message = ({ text }) => <p className={css.message}>{text} </p>;

export default Message;

Message.protoTypes = {
  text: PropTypes.string.isRequired,
};