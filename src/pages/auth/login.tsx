import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPage from '../../interfaces/page';
import { FormContainer, Input, Button } from '../../styles/forms';

const LoginPage: React.FunctionComponent<IPage> = props => { 
    const [login, setLogin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const logInEmailPassword = () => {

        if (error !== '') setError('');
        
        setLogin(true);

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                logging.info(user);
                history.push('/');
            })
            .catch((error) => {
                logging.error(error);
                if (error.code.includes('auth/wrong-password')) {
                    setError('Das angegebene Passwort ist nicht korrekt.')
                }
                else if (error.code.includes('auth/user-not-found')) {
                    setError('Die eingegebene Email-Adresse existierst nicht.')
                }
                else {
                    setError('Im Moment können Sie sich nicht anmelden. Bitte probieren Sie es später wieder.')
                }
                setLogin(false);
            })
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
                disabled={login}
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