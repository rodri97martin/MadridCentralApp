import React from 'react';
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';

import drizzleOptions from './drizzleOptions';
import Router from './Router';

class App extends React.Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
      	<LoadingContainer>
          <Router/>
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
