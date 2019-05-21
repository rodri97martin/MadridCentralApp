import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import PropTypes from 'prop-types';
import { drizzleConnect } from "drizzle-react";

class Navigation extends React.Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
          dataKey: this.contracts["MadridCentral"].methods["getBalance"].cacheCall()
      };
  }

	render() {

    if (!(this.state.dataKey in this.props.MadridCentral.getBalance)) {
        return <span>Fetching...</span>;
      }

    var balance = this.props.MadridCentral["getBalance"][this.state.dataKey].value;

    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Madrid Central</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/resident">Soy un residente</Nav.Link>
            <Nav.Link href="/guest">Quiero una invitación</Nav.Link>
            <Nav.Link href="/depositWithdraw">Ingresar/Retirar</Nav.Link>
            <Nav.Link href="/history">Historial</Nav.Link>
          </Nav>
          <Navbar.Text>
            Saldo: {balance/1000000000000000} finney
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    MadridCentral: state.contracts.MadridCentral,
    accounts: state.accounts
  };
};

export default drizzleConnect(Navigation, mapStateToProps);