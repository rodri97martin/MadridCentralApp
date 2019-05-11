import React from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import ContractData from '../ContractData';
import { Card, Row, Col, Alert } from "react-bootstrap";

class ActualDayActivator extends React.Component {

    constructor(props, context) {
        super(props)
        this.drizzle = context.drizzle;
    }

    componentDidMount() {

        console.log("==== COMPONENTE ActualDay MONTADO ============", this.props.direccion );

        const json = require('../contracts/Day.json');

          const contractConfig = {
             contractName: this.props.direccion,
             web3Contract: new this.drizzle.web3.eth.Contract(json.abi, this.props.direccion)
          };

          this.drizzle.addContract(contractConfig, []);
    }

    componentWillUnmount() {

      console.log("==== COMPONENTE ActualDay DESMONTADO ============", this.props.direccion );

      this.drizzle.deleteContract(this.props.direccion);
    }

    render() {
        const mapStateToProps = state => {
            return {
                ActualDay: state.contracts[this.props.direccion],
                accounts: state.accounts
            }
        };

        const ActualDayContainer = drizzleConnect(ActualDay, mapStateToProps);

        return <ActualDayContainer direccion={this.props.direccion} />;
    }
}


class ActualDay extends React.Component {

  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
  }

  render() {

    let matricula;

    const instanceState = this.props.ActualDay;

    if (instanceState && instanceState.initialized) {

      matricula = <ContractData contract={this.props.direccion} method="getTodayInvitation" methodArgs={[this.props.accounts[0]]} />

    }

    return (
      <div>
          <div>
          <br></br>
          <Card style={{ width: '30rem'}}>
            <h4>Ya tienes una invitación para el día de hoy</h4>
              <Row>
                <Col>
                  <div className="buttonCenter">
                    <Alert variant="dark">
                      <Alert.Heading>{matricula}</Alert.Heading>
                    </Alert>
                  </div>
                </Col>
              </Row>
          </Card>
        </div>
      </div>
    );
  }

};


ActualDayActivator.contextTypes = {
    drizzle: PropTypes.object
};

ActualDay.contextTypes = {
    drizzle: PropTypes.object
};

export default ActualDayActivator;
