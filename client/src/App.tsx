import React, { useEffect, useState } from 'react';
import AppRouter from './routes/AppRouter'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import AppFooter from './components/Footer'



const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(null);


  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message));

    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    loadGoogleScript();

    const initializeOneTap = () => {
      /* Ensure Google Identity Services client library is loaded */
      // if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '927647679318-36n4dvep88921pp6m9m7stmh092p8ufh.apps.googleusercontent.com', // Replace with your client ID
          callback: handleCredentialResponse,
          auto_select: true,  // Automatically sign in users who have signed in previously
          cancel_on_tap_outside: false,  // Optional
        });

        // Prompt the user to sign in
        window.google.accounts.id.prompt();
      // }
    };

    initializeOneTap();
  }, []);

  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    // Send the response.credential (JWT) to your backend for verification and sign-in.

    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('User authenticated:', data);
        setEmail(data.email)
    }
  )
    .catch((error) => {
      console.error('Error during authentication:', error);
    });
  };


  return (
    /* //   <h1>{message}</h1>
    //   <h1>Here is some more stuff</h1>

    //   <h2>Google One Tap Sign-In</h2>
    //   { email !== null &&
    //     <h2>Welcome {email}!</h2>
    //   } */

    // <AppRouter />
    <Router>
      <AppRouter />
      <AppFooter />
    </Router>
  );
}

export default App;
