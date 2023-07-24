import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Form } from './ContactForm.styled';

const ContactForm = ({ onAddContact }) => {
  const [state, setState] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const { name, number } = state;
    const id = nanoid(5);

    onAddContact({ id, name, number });

    setState({
      name: '',
      number: '',
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setState({ [name]: value });
  };

  const { name, number } = state;

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
