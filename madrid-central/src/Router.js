import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { drizzleConnect } from 'drizzle-react';

import Home from './components/Home';
import Resident from './components/Resident';
import NewResident from './components/NewResident';
import Guest from './components/Guest';
import Error from './components/Error';
import Navigation from './components/Navigation'; 
import DepositWithdraw from './components/DepositWithdraw';
import Edit from './components/Edit';

class Router extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/resident" component={Resident} />
            <Route path="/guest" component={Guest} />
            <Route path="/edit" component={Edit} />
            <Route path="/newResident" component={NewResident} />
            <Route path="/depositWithdraw" component={DepositWithdraw} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    MadridCentral: state.contracts.MadridCentral,
    accounts: state.accounts
  }
}

export default drizzleConnect(Router, mapStateToProps);
