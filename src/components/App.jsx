import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import LocalStorageAPI from 'services/localStorageAPI';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

// const lsAPI = new LocalStorageAPI();
const KEY = 'phonebook-contacts';

window.document.title = 'HW-4 Phonebook';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const App = () => {
  const [contacts, setContacts] = useLocalStorage(KEY, defaultContacts);
  const [filter, setFilter] = useState('');

  // Add contact
  const handleAddContact = contact => {
    const { name } = contact;

    if (contacts.some(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    setContacts(contacts => [...contacts, contact]);
    Notify.success(`Add contact ${name}`);
  };

  // Delete contact
  const handleDeleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
    Notify.info(`Delete contact ${id}`);
  };

  // Filter
  const contactFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  return (
    <Container className="container" maxWidth="sm" sx={{ mt: 2 }}>
      <Typography
        variant="h1"
        gutterBottom
        align="center"
        sx={{ fontSize: '40px', fontWeight: 700, mb: 2 }}
      >
        Phonebook
      </Typography>
      <ContactForm onAddContact={handleAddContact} />
      <Typography
        variant="h2"
        gutterBottom
        align="center"
        sx={{ fontSize: '30px', fontWeight: 700, mb: 2 }}
      >
        Contacts
      </Typography>
      <Filter
        onFilter={({ target: { value } }) => setFilter(value)}
        filter={filter}
      />
      <ContactList
        contacts={contactFilter(contacts)}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};

export default App;
