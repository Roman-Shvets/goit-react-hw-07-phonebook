import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Message from './Message';
import css from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.contacts__title}>Contacts</h2>
      <Filter />

      {items.length === 0 && !isLoading && !error ? (
        <Message text="There aren't any contacts in the phonebook" />
      ) : (
        <ContactList />
      )}

      {error && <Message text="An error has occurred!" />}

      {isLoading && !error && items.length === 0 && (
        <Message text="Loading..." />
      )}
    </div>
  );
};

export default App;
