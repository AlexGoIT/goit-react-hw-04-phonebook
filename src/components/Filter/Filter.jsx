import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const Filter = ({ onFilter, filter }) => {
  return (
    <TextField
      id="filter"
      label="Filter"
      name="filter"
      variant="outlined"
      fullWidth
      onChange={onFilter}
      value={filter}
    />
  );
};

export default Filter;

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
