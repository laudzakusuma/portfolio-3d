import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Home from './pages/Home';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;