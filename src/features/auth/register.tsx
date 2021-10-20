import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import { FormContainer, Input, Button } from '../../styles/forms';

const RegisterPage = () => { 
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signUpWithEmailAndPassword = () => { 
        if (password !== confirm) {
            setError('Die eingegebenen Passwörter stimmen nicht überein.')
            return
        }
        if (error !== '') setError('');
        
        setRegistering(true);

        auth.createUserWithEmailAndPassword(email, password)
            .then(result => { 
                logging.info(result);
                history.push('/login');
            })
            .catch(error => { 
                logging.error(error);

                if (error.code.includes('auth/weak-password')) {
                    setError('Bitte verwenden Sie ein strengeres Passwort.')
                }
                else if (error.code.includes('auth/email-already-in-use')) {
                    setError('Die eingegebene Email-Adresse wird bereits verwendet.')
                }
                else { 
                    setError('Im Moment können Sie sich nicht anmelden. Bitte probieren Sie es später wieder.')
                }

                setRegistering(false);
            })
    }

    return (
        <FormContainer>
            <h2>Registrierung</h2>
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
            <Input
                large
                type="password"
                name="confirm"
                id="confirm"
                placeholder="Passwort Bestätigen"
                onChange={event => setConfirm(event.target.value)}
                value={confirm}
            />
            <Button
                disabled={registering}
                onClick={() => signUpWithEmailAndPassword()}
            >
                Anmelden
            </Button>
            <small><p>Bereits registriert? <Link to="/login">Login</Link></p></small>
            <ErrorText error={error} /> 
        </FormContainer>
    )
}

export default RegisterPage;