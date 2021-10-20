import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginWithUsernameAndPassword } from './authSlice'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { FormContainer, Input, Button } from '../../styles/forms';

const LoginPage = () => { 
    const [logedin, setLogin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    const dispatch = useDispatch();
    const history = useHistory();

    const logInEmailPassword = () => {
        if (error !== '') setError('');
        setLogin(true);
        dispatch(loginWithUsernameAndPassword({ email, password }))
        history.push('/');
    }
    
    return (
        <FormContainer>
            <h2>LogIn</h2>
            <Input
                large
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}
                value={email}
            />
            <Input
                large
                type="password"
                name="password"
                id="password"
                placeholder="Passwort"
                onChange={event => setPassword(event.target.value)}
                value={password}
            />
            <Button
                disabled={logedin}
                onClick={() => logInEmailPassword()}
            >
                Anmelden
            </Button>
            <small><p>Noch nicht registriert?<Link to="/register">Jetzt registrieren!</Link></p></small>
            <ErrorText error={error} /> 
        </FormContainer>
    )
}

export default LoginPage;