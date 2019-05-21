import React from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from "drizzle-react";
import { Card, Row, Col, Alert, Button} from "react-bootstrap";

class Invitation extends React.Component {
	constructor(props, context) {
		super(props);
		this.drizzle = context.drizzle;
		this.state = {
			dataKey: this.drizzle.contracts["MadridCentral"].methods["getInvitationFromDay"].cacheCall(props.timestamp)
		}

	}

	render() {
		if (!(this.state.dataKey in this.props.MadridCentral.getInvitationFromDay)) {
	      return <span>Fetching...</span>;
	    }

	    var invitation = this.props.MadridCentral["getInvitationFromDay"][this.state.dataKey].value;
	    if (invitation == undefined) {
	    	return(
				<div>
					<br></br>
					<Card as="div" style={{ width: '30rem'}}>
						<h4>El día {this.props.day} de {this.monthToString(this.props.month)} de {this.props.year} no tuviste invitación</h4>
					</Card>
					<br></br>
					<div className="buttonCenter">
		  				<Button variant="dark" size="lg" href="/history">
							Comprobar otra fecha
						</Button>
					</div>
				</div>

			);
	    }

		return(
			<div>
				<br></br>
				<Card as="div" style={{ width: '30rem'}}>
					<h4>El día {this.props.day} de {this.monthToString(this.props.month)} de {this.props.year} tuviste invitación para la matrícula:</h4>
					<Row>
                		<Col>
                  			<div className="buttonCenter">
                    			<Alert variant="dark">
                      				<Alert.Heading>{invitation}</Alert.Heading>
                    			</Alert>
                  			</div>
                		</Col>
              		</Row>
				</Card>
				<br></br>
				<div className="buttonCenter">
	  				<Button variant="dark" size="lg" href="/history">
						Comprobar otra fecha
					</Button>
				</div>
			</div>
		);
	}

  	monthToString(month) {
  		switch (month) {
			case 1:
			    return "enero";
			case 2:
			    return "febrero";
			case 3:
			    return "marzo";
			case 4:
			    return "abril";
			case 5:
			    return "mayo";
			case 6:
			    return "junio";
			case 7:
			    return "julio";
			case 8:
			    return "agosto";
			case 9:
			    return "septiembre";
			case 10:
			    return "octubre";
			case 11:
			    return "noviembre";
			case 12:
			    return "diciembre";
			default: 
				return "";
		}
  	}
}

const mapStateToProps = state => {
  return {
    MadridCentral: state.contracts.MadridCentral,
    accounts: state.accounts
  };
};

Invitation.contextTypes = {
    drizzle: PropTypes.object
};

export default drizzleConnect(Invitation, mapStateToProps);