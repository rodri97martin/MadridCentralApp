import React from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import ContractData from '../ContractData';
import { Table, Row, Col, Button } from "react-bootstrap";

class ExistingResidentActivator extends React.Component {

    constructor(props, context) {
        super(props)
        this.drizzle = context.drizzle;
    }

    componentDidMount() {

        console.log("==== COMPONENTE ExistingResident MONTADO ============", this.props.direccion );

        const json = require('../contracts/Resident.json');

          const contractConfig = {
             contractName: this.props.direccion,
             web3Contract: new this.drizzle.web3.eth.Contract(json.abi, this.props.direccion)
          };

          this.drizzle.addContract(contractConfig, []);
    }

    componentWillUnmount() {

      console.log("==== COMPONENTE ExistingResident DESMONTADO ============", this.props.direccion );

      this.drizzle.deleteContract(this.props.direccion);
    }

    render() {
        const mapStateToProps = state => {
            return {
                ExistingResident: state.contracts[this.props.direccion],
                accounts: state.accounts
            }
        };

        const ExistingResidentContainer = drizzleConnect(ExistingResident, mapStateToProps);

        return <ExistingResidentContainer direccion={this.props.direccion} />;
    }
}


class ExistingResident extends React.Component {

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    
  }

  render() {

    let name;
    let email;
    let code;
    let phone;
    let price;
    let invitations;

    const instanceState = this.props.ExistingResident;

    if (instanceState && instanceState.initialized) {

      name = <ContractData contract={this.props.direccion} method="getName" />
      email = <ContractData contract={this.props.direccion} method="getEmail" />
      code = <ContractData contract={this.props.direccion} method="getCode" />
      phone = <ContractData contract={this.props.direccion} method="getPhone" />
      price = <ContractData contract={this.props.direccion} method="getPrice"/>
      invitations = <ContractData contract={this.props.direccion} method="getInvitations" />

    }
       
    return (
      <div className="tableContent">
        <br></br>
        <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Código</th>
              <th>Teléfono</th>
              <th>Precio(finney)</th>
              <th>Nº de invitaciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              <td>{code}</td>
              <td>{phone}</td>
              <td>{price}</td>
              <td>{invitations}</td>
            </tr>
          </tbody>
        </Table>
        <br></br>
        <Row>
          <Col>
            <div className="buttonCenter">
              <Button variant="dark" size="lg" href="/edit">
                Editar datos
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};


ExistingResidentActivator.contextTypes = {
    drizzle: PropTypes.object
};

ExistingResident.contextTypes = {
    drizzle: PropTypes.object
};

export default ExistingResidentActivator;
