import React from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from "drizzle-react";
import { Card, InputGroup, Form, FormControl, Row, Col, Button} from "react-bootstrap";

class Edit extends React.Component {
	constructor(props, context) {
		super(props);
		this.drizzle = context.drizzle;
		this.state = {
			name: "",
			email: "",
			phone: "",
			price: 1000,
			invitations: 1
		}
	}

	render() {
	return(
			<div>
				<br></br>
				<Card as="div" style={{ width: '50rem'}}>
					<label>Nombre</label>
					<InputGroup className="mb-3" onChange={evt => this.updateName(evt)}>
	    				<FormControl
	      					placeholder="Introduce tu nombre"
	      					aria-label="Introduce tu nombre"
	      					aria-describedby="basic-addon1"
	    				/>
	  				</InputGroup>

	  				<label>Email</label>
					<InputGroup className="mb-3" onChange={evt => this.updateEmail(evt)}>
	    				<FormControl
	      					placeholder="Introduce tu email"
	      					aria-label="Introduce tu email"
	      					aria-describedby="basic-addon1"
	    				/>
	  				</InputGroup>
  						<label>Teléfono</label>
						<InputGroup className="mb-3" onChange={evt => this.updatePhone(evt)}>
	    					<FormControl
	      						placeholder="Introduce tu teléfono"
	      						aria-label="Introduce tu teléfono"
	      						aria-describedby="basic-addon1"
	    					/>
  						</InputGroup>
	  				<Row>
	  					<Col>
	  						<label>Precio(wei)</label>
							<InputGroup className="mb-3" onChange={evt => this.updatePrice(evt)}>
		    					<Form.Control as="select" type="number">
							    	<option>1000</option>
							    	<option>2000</option>
							    	<option>3000</option>
							    	<option>4000</option>
							    	<option>5000</option>
							    </Form.Control>
	  						</InputGroup>
	  					</Col>
	  					<Col>
	  						<label>Número de invitaciones</label>
							<InputGroup className="mb-3" onChange={evt => this.updateInvitations(evt)}>
		    					<Form.Control as="select">
							    	<option>1</option>
							    	<option>2</option>
							    	<option>3</option>
							    	<option>4</option>
							    	<option>5</option>
							    	<option>6</option>
							    	<option>7</option>
							    	<option>8</option>
							    	<option>9</option>
							    	<option>10</option>
							    	<option>11</option>
							    	<option>12</option>
							    	<option>13</option>
							    	<option>14</option>
							    	<option>15</option>
							    	<option>16</option>
							    	<option>17</option>
							    	<option>18</option>
							    	<option>19</option>
							    	<option>20</option>
							    </Form.Control>
	  						</InputGroup>
	  					</Col>
	  				</Row>
	  				<Row>
	  					<Col>
	  						<div className="buttonCenter">
		  						<Button variant="dark" size="lg" onClick={() => this.onClick()}>
									Editar datos
								</Button>
							</div>
	  					</Col>
	  				</Row>
				</Card>
			</div>
		);
	}

	updateName(evt) {
	    this.setState({
	      name: evt.target.value
	    });
  	}

  	updateEmail(evt) {
	    this.setState({
	      email: evt.target.value
	    });
  	}

  	updatePhone(evt) {
	    this.setState({
	      phone: evt.target.value
	    });
  	}

  	updatePrice(evt) {
	    this.setState({
	      price: parseInt(evt.target.value)
	    });
  	}

  	updateInvitations(evt) {
	    this.setState({
	      invitations: parseInt(evt.target.value)
	    });
  	}

  	onClick() {
	  this.drizzle.contracts.MadridCentral.methods.changeResidentData.cacheSend(this.state.name, this.state.email, this.state.phone, this.state.price, this.state.invitations, {from: this.props.accounts[0]})
  	}
}

const mapStateToProps = state => {
  return {
    MadridCentral: state.contracts.MadridCentral,
    accounts: state.accounts
  };
};

Edit.contextTypes = {
    drizzle: PropTypes.object
};

export default drizzleConnect(Edit, mapStateToProps);