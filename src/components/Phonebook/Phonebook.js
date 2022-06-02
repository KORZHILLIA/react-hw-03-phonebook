import { Component } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import FilterInput from './FilterInput/FilterInput';
import Contacts from './Contacts/Contacts';

class Phonebook extends Component {
  LOCAL_STORAGE_KEY = 'contacts';
  localStorageContent =
    JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) || '';

  state = {
    contacts: [...this.localStorageContent],
    filter: '',
  };

  deleteBtnHandler = contactId =>
    this.setState(prevState => {
      const contactIndex = prevState.contacts.findIndex(
        ({ id }) => id === contactId
      );
      prevState.contacts.splice(contactIndex, 1);
      localStorage.setItem(
        this.LOCAL_STORAGE_KEY,
        JSON.stringify([...prevState.contacts])
      );
      return { contacts: [...prevState.contacts] };
    });

  filterChangeHandler = event =>
    this.setState({ filter: event.currentTarget.value });

  onSubmit = obj =>
    this.setState(prevState => {
      const contactIndex = prevState.contacts.findIndex(
        ({ name }) => name.toLowerCase() === obj.name.toLowerCase()
      );
      if (contactIndex === -1) {
        localStorage.setItem(
          this.LOCAL_STORAGE_KEY,
          JSON.stringify([...prevState.contacts, obj])
        );
        return {
          contacts: [...prevState.contacts, obj],
        };
      } else {
        alert('no');
      }
    });

  getFilteredContacts = () => {
    const requiredName = this.state.filter.toLowerCase();
    return [
      ...this.state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(requiredName)
      ),
    ];
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <ContactsForm onSubmit={res => this.onSubmit(res)}></ContactsForm>
        <FilterInput
          filter={filter}
          changeHandler={this.filterChangeHandler}
        ></FilterInput>
        <Contacts
          contactsArray={this.getFilteredContacts()}
          onDelete={res => this.deleteBtnHandler(res)}
        ></Contacts>
      </div>
    );
  }
}

export default Phonebook;
