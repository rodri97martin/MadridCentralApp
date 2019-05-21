import React from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from "drizzle-react";
import { Card, InputGroup, Form, Row, Col, Button} from "react-bootstrap";
import Invitation from './Invitation';

class History extends React.Component {
	constructor(props, context) {
		super(props);
		this.drizzle = context.drizzle;
		this.state = {
			day: 1,
			dayToChange: 1,
			month: 1,
			monthToChange: 1,
			year: 2019,
			yearToChange: 2019,
			timestamp: 0,
			isDateSelected: false
		}
	}

	render() {
		if (this.state.isDateSelected) {
			return(
				<Invitation 
					isDateSelected={this.state.isDateSelected}
					year={this.state.year}
					month={this.state.month}
					day={this.state.day}
					timestamp={this.state.timestamp} />
			);
		}
		return(
			<div>
				<br></br>
				<Card as="div" style={{ width: '30rem'}}>
					<Row>
						<Col>
							<label>Día</label>
							<InputGroup className="mb-3" onChange={evt => this.updateDay(evt)}>
		    					<Form.Control as="select" type="number">
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
							    	<option>21</option>
							    	<option>22</option>
							    	<option>23</option>
							    	<option>24</option>
							    	<option>25</option>
							    	<option>26</option>
							    	<option>27</option>
							    	<option>28</option>
							    	<option>29</option>
							    	<option>30</option>
							    	<option>31</option>
							    </Form.Control>
	  						</InputGroup>
						</Col>
						<Col>
							<label>Mes</label>
							<InputGroup className="mb-3" onChange={evt => this.updateMonth(evt)}>
		    					<Form.Control as="select" type="number">
							    	<option value="1">Enero</option>
							    	<option value="2">Febrero</option>
							    	<option value="3">Marzo</option>
							    	<option value="4">Abril</option>
							    	<option value="5">Mayo</option>
							    	<option value="6">Junio</option>
							    	<option value="7">Julio</option>
							    	<option value="8">Agosto</option>
							    	<option value="9">Septiembre</option>
							    	<option value="10">Octubre</option>
							    	<option value="11">Noviembre</option>
							    	<option value="12">Diciembre</option>
							    </Form.Control>
	  						</InputGroup>
						</Col>
						<Col>
							<label>Año</label>
							<InputGroup className="mb-3" onChange={evt => this.updateYear(evt)}>
		    					<Form.Control as="select" type="number">
							    	<option>2019</option>
							    	<option>2018</option>
							    </Form.Control>
	  						</InputGroup>
						</Col>
					</Row>
					
	  				<Row>
	  					<Col>
	  						<div className="buttonCenter">
		  						<Button variant="dark" size="lg" onClick={() => this.onClick()}>
									Ver invitación
								</Button>
							</div>
	  					</Col>
	  				</Row>
				</Card>
			</div>
		);
		
	}

	updateDay(evt) {
	    this.setState({
	      dayToChange: parseInt(evt.target.value)
	    });
  	}

  	updateMonth(evt) {
	    this.setState({
	      monthToChange: parseInt(evt.target.value)
	    });
  	}

  	updateYear(evt) {
	    this.setState({
	      yearToChange: parseInt(evt.target.value)
	    });
  	}

  	monthToString(month) {
  		switch (month) {
			case 1:
			    return "January";
			case 2:
			    return "February";
			case 3:
			    return "March";
			case 4:
			    return "April";
			case 5:
			    return "May";
			case 6:
			    return "June";
			case 7:
			    return "July";
			case 8:
			    return "August";
			case 9:
			    return "September";
			case 10:
			    return "October";
			case 11:
			    return "November";
			case 12:
			    return "December";
			default: 
				return "";
		}
  	}

  	onClick() {
  		var date = new Date(`${this.monthToString(this.state.monthToChange)} ${this.state.dayToChange}, ${this.state.yearToChange} 12:00:00`);
  		var timestamp = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  		this.setState({
  			day: this.state.dayToChange,
  			month: this.state.monthToChange,
  			year: this.state.yearToChange,
	      	timestamp: timestamp,
	      	isDateSelected: true
	    });
  	}
}

const mapStateToProps = state => {
  return {
    MadridCentral: state.contracts.MadridCentral,
    accounts: state.accounts
  };
};

History.contextTypes = {
    drizzle: PropTypes.object
};

export default drizzleConnect(History, mapStateToProps);