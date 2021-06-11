import styled from 'styled-components';

import { TextField, Typography, Paper, Grid, Button } from '@material-ui/core';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  display: flex;
  justify-content: center;
  padding: 16px;
  align-items: center;
  box-shadow: none;
  background-color: transparent;
  max-width: 1200px;
  margin: 40px auto;
  padding: 32px
  `
export const Title = styled(Typography)`
  color:  ${props => props.primary ? 'red' : '#fff'};
  margin-top: 16px
  `
export const CustomPaper = styled(Paper)`
  max-width: 500px;
  padding: 8px;
  max-height: 200px;
  padding-top: 16px;
  color: red;
  margin-top: 16px
  `
export const Content = styled.div`margin-top: 16px`

export const CustomTextField = styled(TextField)`width: 100%`

export const CustomGrid = styled(Grid)`
 box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
 background-color: #fff;
 border-radius: 4px;
 margin: 8px !important;
 max-width: 800px !important;
 `
export const WrapperTabs = styled.div`
 box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
 background-color: #fff;
 border-radius: 4px;
 `
export const WrapperButton = styled(Grid)`width: 100%`

export const CustomButton = styled(Button)`width: 100%`

export const WrapperSuggestion = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center
`
