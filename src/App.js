import { BrowserRouter } from 'react-router-dom';
import BodyContainer from './components/body/BodyContainer';
import Header from './components/header/Header';

import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <BodyContainer />
    </BrowserRouter>
  );
};

export default App;
