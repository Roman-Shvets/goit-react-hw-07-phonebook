import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import css from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onFilterChange = e => {
    const data = e.target.value.trim();
    dispatch(setFilter(data));
  };

  return (
    <div className={css.filter}>
      <label className={css.title} htmlFor="filter">
        Find contact by name:
      </label>
      <input
        onChange={onFilterChange}
        className={css.input}
        type="text"
        name="filter"
        value={filter}
       />
    </div>
  );
};

export default Filter;