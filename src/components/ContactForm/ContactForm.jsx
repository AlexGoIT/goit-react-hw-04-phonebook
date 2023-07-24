import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Form } from './ContactForm.styled';

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { onAddContact } = this.props;
    const id = nanoid(5);

    onAddContact({ id, name, number });

    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          pattern="^([A-Za-z-']{1,50})|([А-Яа-я-']{1,50})$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleChange}
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
          onChange={this.handleChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" sx={{ mb: 4 }}>
          Add contact
        </Button>
      </Form>
    );
  }
}
