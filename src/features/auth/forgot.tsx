import React, { useState } from 'react';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import { MainButton } from '../../styles/buttons';
import { FormContainer, Input } from '../../styles/forms';

const ForgotPwPage = () => { 
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
            <MainButton
                disabled={sending}
                onClick={() => restPassword()}
            >
                Anmelden
            </MainButton>
            ({sent} && <small><p>Email gesendet.</p></small>)
            <ErrorText error={error} /> 
        </FormContainer>
    )
}

export default ForgotPwPage;