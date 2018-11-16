import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
 
class App extends React.Component {

  state = {
    gastos: []
  }

  componentDidMount = () => {
    axios.get('http://localhost:8000/gastos')
      .then(res =>res.data)
      .then(gastos => {
        this.setState({ gastos })
      })
  }

  render = () => {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell numeric>Importe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.gastos.map(gasto => {
              return (
                <TableRow key={gasto.id}>
                  <TableCell component="th" scope="row">
                    {gasto.nombre}
                  </TableCell>
                  <TableCell numeric>
                    {gasto.importe}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }

}

export default withStyles(styles)(App);