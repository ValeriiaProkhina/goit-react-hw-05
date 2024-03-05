import { useState, useEffect } from "react";
import "./App.module.css";
import ContactForm from "../ContactForm/ContactForm";
import contactListJson from "../../contactList.json";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import { nanoid } from "nanoid";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("saved-contacts");
    return savedContacts !== null ? JSON.parse(savedContacts) : contactListJson;
  });
  const [filter, setFilter] = useState("");
  useEffect(() => {
    localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { ...newContact, id: nanoid() }];
    });
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = (id) => {
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== id);
    });
  };

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAdd={addContact} />
        <SearchBox value={filter} onFilter={setFilter}>
          Find contacts by name
        </SearchBox>
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      </div>
    </>
  );
}
