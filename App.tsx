import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './app/navigation/stack';
import {navigationRef} from './app/navigation/NavigationUtils';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './app/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
