import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginWithUsernameAndPassword } from './authSlice'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { FormContainer, Input } from '../../styles/forms';
import TwoColumnImage from '../../components/TwoColumnImage';
import image from '../../assets/login.jpg';
import { MainButton } from '../../styles/buttons';
import { SmallText } from '../../styles/type';

const LoginPage = () => { 
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    const dispatch = useDispatch();
    const history = useHistory();

    const logInEmailPassword = () => {
        if (error !== '') setError('');;
        dispatch(loginWithUsernameAndPassword({ email, password }))
        history.push('/');
    }
    
    return (
      <TwoColumnImage image={image}>
        <FormContainer>
          <h2>LogIn</h2>
          <Input
            large
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <Input
            large
            type="password"
            name="password"
            id="password"
            placeholder="Passwort"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <MainButton onClick={() => logInEmailPassword()}>Anmelden</MainButton>
          <SmallText>
            <p>
              Noch nicht registriert?
              <Link to="/register">Jetzt registrieren!</Link>
            </p>
          </SmallText>
          <ErrorText error={error} />
        </FormContainer>
      </TwoColumnImage>
    );
}

export default LoginPage;