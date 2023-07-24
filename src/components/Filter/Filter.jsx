import PropTypes from 'prop-types';
import { Component } from 'react';
import TextField from '@mui/material/TextField';

export default class Filter extends Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
  };

  render() {
    const { filter, onFilter } = this.props;

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
  }
}
