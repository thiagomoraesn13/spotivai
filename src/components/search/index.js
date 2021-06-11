import React from 'react';

import { Select, Grid, makeStyles, MenuItem } from '@material-ui/core';

import { CustomTextField, CustomGrid, WrapperButton } from '../wrappers/components';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { options } from '../../utils/optionsSelect'

const Search = ({ inputValue, setInputValue, fetchInfo, action }) => {
  const classes = useStyles();

  return (
    <CustomGrid container spacing={2} alignItems='center'>
      <Grid item sm={8}>
        <CustomTextField
          id="outlined-basic"
          label="Digite"
          variant="outlined"
          value={inputValue}
          onChange={(value) => setInputValue(value.target.value)}
        />
      </Grid>

      <WrapperButton item sm={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Selecione uma opção</InputLabel>
          <Select
            displayEmpty
            value={action}
            disabled={!inputValue}
            onChange={(event) => fetchInfo(event.target.value)}
            label="Age"
            inputProps={{
              name: 'option',
              id: 'outlined-age-native-simple',
            }}
          >
            {
              options.map((value, index) =>
                <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
              )
            }
          </Select>
        </FormControl>
      </WrapperButton>
    </CustomGrid >
  )
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default Search;