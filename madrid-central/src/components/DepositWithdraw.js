import React from 'react';
import { drizzleConnect } from "drizzle-react";
import { Card, InputGroup, FormControl, Row, Col, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

class DepositWithdraw extends React.Component {

	constructor(props, context) {
		super(props);
		this.drizzle = context.drizzle;
		this.state = {
			inputValue: 0
		}
	}

	render () {
	    return(
	    	<div>
		    	<br></br>
		    	<Col>
		    		<Row>
						<Card style={{ width: '30rem'}}>
							<label>Ingresar</label>
							<InputGroup className="mb-3" onChange={evt => this.updateInputValue(evt)}>
			    				<FormControl
			      					placeholder="Introduce una cantidad"
			      					aria-label="Introduce una cantidad"
			      					aria-describedby="basic-addon1"
			    				/>
		  					</InputGroup>
		  					<Row>
			  					<Col>
			  						<div className="buttonCenter">
				  						<Button variant="dark" size="lg" type="submit" onClick={() => this.deposit()}>
											Ingresar
										</Button>
									</div>
			  					</Col>
	  						</Row>
						</Card>
					</Row>
					<br></br>
					<Row>
						<Card style={{ width: '30rem'}}>
							<label>Al hacer click en retirar se le traspasará todo el saldo disponible en su cuenta</label>
							<Row>
			  					<Col>
			  						<div className="buttonCenter">
				  						<Button variant="dark" size="lg" type="submit" onClick={() => this.withdraw()}>
											Retirar
										</Button>
									</div>
			  					</Col>
	  						</Row>
						</Card>
					</Row>
				</Col>
			</div>
	    );
	}

	deposit() {
	  this.drizzle.contracts.MadridCentral.methods.deposit.cacheSend({from: this.props.accounts[0], value: this.state.inputValue});
  	}

  	withdraw() {
	  this.drizzle.contracts.MadridCentral.methods.withdraw.cacheSend({from: this.props.accounts[0]});
  	}	

	updateInputValue(evt) {
	    this.setState({
	      inputValue: evt.target.value
	    });
  	}
}



const mapStateToProps = state => {
  return {
    MadridCentral: state.contracts.MadridCentral,
    accounts: state.accounts
  };
};

DepositWithdraw.contextTypes = {
  drizzle: PropTypes.object,
};

export default drizzleConnect(DepositWithdraw, mapStateToProps);

