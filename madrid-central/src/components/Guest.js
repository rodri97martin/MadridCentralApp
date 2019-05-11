import React from 'react';
import ContractForm from "../ContractForm";
import ContractData from "../ContractData";
import PropTypes from 'prop-types';
import ActualDay from './ActualDay';
import { drizzleConnect } from "drizzle-react";
import { Card, InputGroup, FormControl, Row, Col, Button } from "react-bootstrap";

class Guest extends React.Component {

	constructor(props, context) {
		super(props);
		this.drizzle = context.drizzle;
		this.state = {
      		dataKey: this.drizzle.contracts["MadridCentral"].methods["getTodayAddress"].cacheCall(),
      		dataKey2: this.drizzle.contracts["MadridCentral"].methods["currentDay"].cacheCall(),
      		matricula:""
    	};
	}

	render() {

		if (!(this.state.dataKey in this.props.MadridCentral.getTodayAddress)) {
	      return <span>Fetching...</span>;
	    }

		var actualDayAddress = this.props.MadridCentral["getTodayAddress"][this.state.dataKey].value;

		if (!(this.state.dataKey2 in this.props.MadridCentral.currentDay)) {
	      return <span>Fetching...</span>;
	    }

	    var actualDay = this.props.MadridCentral["currentDay"][this.state.dataKey2].value;

		if (actualDay == 0) {
			return (
				<div>
					<br></br>
					<Card style={{ width: '30rem'}}>
						<label>Matrícula</label>
						<InputGroup className="mb-3" onChange={evt => this.updateMatricula(evt)}>
		    				<FormControl
		      					placeholder="Introduce tu matrícula"
		      					aria-label="Introduce tu matrícula"
		      					aria-describedby="basic-addon1"
		    				/>
		  				</InputGroup>
		  				<Row>
		  					<Col>
			  					<div className="buttonCenter">
			  						<Button variant="dark" size="lg" type="submit" onClick={() => this.onClick()}>
										Pedir invitación
									</Button>
								</div>
		  					</Col>
	  					</Row>
					</Card>
				</div>
			);
		}

		return (
			<ActualDay direccion={actualDayAddress} />
		);
	}

	updateMatricula(evt) {
		this.setState({
	      matricula: evt.target.value
	    });
	}

	onClick() {
		var timestamp = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
		this.drizzle.contracts.MadridCentral.methods.getInvitation.cacheSend(timestamp, this.state.matricula, {from: this.props.accounts[0]})
	}
}

Guest.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    MadridCentral: state.contracts.MadridCentral,
    accounts: state.accounts
  };
};

export default drizzleConnect(Guest, mapStateToProps);