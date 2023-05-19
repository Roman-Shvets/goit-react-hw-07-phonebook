import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { items, isLoading } = useSelector(selectContacts);
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();

    const nameInContacts = items.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    nameInContacts
      ? alert(`${name} is already in contacts`)
      : dispatch(addContact({ name, number }));

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const onInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  return (
    <form onSubmit={onFormSubmit} className={css.form}>
      <label className={css.form__label}>
        Name
        <input
          onChange={onInputChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className={css.form__input}
          />
      </label>

      <label className={css.form__label}>
        Number
        <input
          onChange={onInputChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          className={css.form__input}
        />
      </label>

      <button type="submit" className={css.form__button} disabled={isLoading}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;