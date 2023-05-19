import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import css from './ContactList.module.css';

const ContactList = () => {
  const { items, isLoading } = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const [deletingContact, setDeletingContact] = useState(null);

  const dispatch = useDispatch();
  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = async id => {
    setDeletingContact(id);
    await dispatch(deleteContact(id));
    setDeletingContact(null);
  };

  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            <p className={css.text}>
              {name}: {number}
            </p>
            <button
              className={css.button}
              onClick={() => handleDeleteContact(id)}
              type="button"
              disabled={isLoading || deletingContact === id}
            >
              {deletingContact === id ? "Deleting...": 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;