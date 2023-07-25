import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LocalStorageAPI from 'services/localStorageAPI';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const lsAPI = new LocalStorageAPI();
const KEY = 'phonebook-contacts';

window.document.title = 'HW-4 Phonebook';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = lsAPI.getItems(KEY);

    if (contacts.length > 0) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length !== contacts.length) {
      lsAPI.setItems(KEY, contacts);
    }
  }

  // Add contact
  handleAddContact = contact => {
    const { contacts } = this.state;
    const { name } = contact;

    // Verify contact
    if (contacts.some(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  // Delete contact
  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  // Add filter
  handleFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  // Filter
  contactFilter = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <Container className="container" maxWidth="sm" sx={{ mt: 4 }}>
        <Typography
          variant="h1"
          gutterBottom
          align="center"
          sx={{ fontSize: '40px', fontWeight: 700, mb: 2 }}
        >
          Phonebook
        </Typography>
        <ContactForm onAddContact={this.handleAddContact} />
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          sx={{ fontSize: '30px', fontWeight: 700, mb: 2 }}
        >
          Contacts
        </Typography>
        <Filter onFilter={this.handleFilter} filter={filter} />
        <ContactList
          contacts={this.contactFilter(contacts)}
          onDeleteContact={this.handleDeleteContact}
        />
      </Container>
    );
  }
}
