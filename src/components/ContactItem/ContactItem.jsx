import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Item } from './ContactItem.styled';

const ContactItem = ({ contact: { id, name, number }, onDeleteContact }) => {
  return (
    <Item>
      <span>{name}</span>
      <span>{number}</span>
      <IconButton aria-label="delete" onClick={() => onDeleteContact(id)}>
        <DeleteIcon />
      </IconButton>
    </Item>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
