import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor= persistStore(store)

export default function App({ Component, pageProps }) {

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </PersistGate>
  )
}
