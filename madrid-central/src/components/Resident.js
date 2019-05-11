import React from 'react';
import { Redirect } from 'react-router-dom';
import { drizzleConnect } from "drizzle-react";
import ExistingResident from "./ExistingResident";
import PropTypes from "prop-types";


class Resident extends React.Component {
	
	constructor(props, context) {
		super(props);
		this.contracts = context.drizzle.contracts;
		this.state = {
      		dataKey: this.contracts["MadridCentral"].methods["residentExists"].cacheCall(),
      		dataKey2: this.contracts["MadridCentral"].methods["getResidentAddress"].cacheCall(),
    	};
	}

	render () {

		if (!(this.state.dataKey in this.props.MadridCentral.residentExists)) {
	      return <span>Fetching...</span>;
	    }

		var exisistingResident = this.props.MadridCentral["residentExists"][this.state.dataKey];

		if (!(this.state.dataKey2 in this.props.MadridCentral.getResidentAddress)) {
	      return <span>Fetching...</span>;
	    }

		var resident = this.props.MadridCentral["getResidentAddress"][this.state.dataKey2].value;
		console.log(resident);
		console.log(this);


		if (exisistingResident.value) {
			return (
				<div>
					<ExistingResident direccion={resident.toString()} />
				</div>

			);
		} else {
			return (
				<div>
					<Redirect to="/newResident" />
				</div>

			);
		}
	}
}

Resident.contextTypes = {
  drizzle: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    MadridCentral: state.contracts.MadridCentral,
    accounts: state.accounts
  };
};

export default drizzleConnect(Resident, mapStateToProps);