import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Form } from './ContactForm.styled';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const id = nanoid(5);
    onAddContact({ id, name, number });

    setName('');
    setNumber('');
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name': {
        setName(value);
        break;
      }

      case 'number': {
        setNumber(value);
        break;
      }

      default:
        return;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        pattern="^([A-Za-z-']{1,50})|([А-Яа-я-']{1,50})$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        id="tel"
        name="number"
        label="Number"
        variant="outlined"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        pattern="^+d{2}(d{3})d{3}-d{2}-d{2}$"
        required
        value={number}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit" sx={{ mb: 4 }}>
        Add contact
      </Button>
    </Form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
