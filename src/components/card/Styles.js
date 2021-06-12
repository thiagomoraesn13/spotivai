import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    width: 300,
    marginTop: 32
  },
  media: {
    height: 140,
  },
  Card_collapse: {
    maxHeight: '700px',
    padding: 16,
    cursor: 'pointer',
    margin: 8,
    borderRadius: 10,
    width: 300
  },
  Card_not_collapse: {
    height: '900px',
    padding: 16,
    cursor: 'pointer',
    margin: 8,
    borderRadius: 10,
    width: 300
  },
  Divider: {
    margin: '8px 0'
  }
});