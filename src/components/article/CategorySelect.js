import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles(() => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const CategorySelect = ({
  categories,
  onSelect,
}) => {
  const classes = useStyles();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setSelectedCategories(e.target.value);
    const ids = e.target.value.map((name) => {
      const match = categories.items.filter((category) => name === category.name);
      return match[0].id;
    });
    onSelect({
      target: {
        name: e.target.name,
        value: ids,
      },
    });
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <InputLabel id="demo-mutiple-chip-label">Categories</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        open={isOpen}
        value={selectedCategories}
        onChange={handleChange}
        onClick={toggleOpen}
        input={<Input id="select-multiple-chip" />}
        name="categoriesIds"
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        className={classes.select}
        MenuProps={MenuProps}
      >
        {categories.items.map(({ id, name }) => (
          <MenuItem key={id} value={name} onClick={toggleOpen}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

CategorySelect.propTypes = {
  categories: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(CategorySelect);
