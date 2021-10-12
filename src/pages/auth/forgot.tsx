import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPage from '../../interfaces/page';
import { FormContainer, Input, Button } from '../../styles/forms';

const ForgotPwPage: React.FunctionComponent<IPage> = props => { 
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');


    const restPassword = () => {
        if (error !== '') setError('');
        
        setSending(true);
        auth.sendPasswordResetEmail(email)
            .then(() => {
                setSent(true)
            })
            .catch((error) => { 
                setError(error)
            })
    }

    return (
        <FormContainer>
            <h2>Passwort Link anfordern</h2>
            <Input
                large
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}
                value={email}
            />
            <Button
                disabled={sending}
                onClick={() => restPassword()}
            >
                Anmelden
            </Button>
            ({sent} && <small><p>Email gesendet.</p></small>)
            <ErrorText error={error} /> 
        </FormContainer>
    )
}

export default ForgotPwPage;