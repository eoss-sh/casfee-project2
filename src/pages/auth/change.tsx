import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPage from '../../interfaces/page';
import { FormContainer, Input, Button } from '../../styles/forms';

const ChangePwPage: React.FunctionComponent<IPage> = props => { 
    const [changing, setChanging] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const changePassword = () => {
        if (newPassword !== newPasswordConfirm) {
            setError('Die eingegebenen Passwörter stimmen nicht überein.')
            return
        }
        if (error !== '') setError('');
        
        setChanging(true);
        const user = auth.currentUser;
        user?.updatePassword(newPassword)
            .then(() => {
                logging.info('Passwort gäendert.');
                history.push('/login');
            })
            .catch((error) => {
                logging.error(error);
                if (error.code.includes('auth/wrong-password')) {
                    setError('Das angegebene Passwort ist nicht korrekt.')
                } else  if (error.code.includes('auth/weak-password')) {
                    setError('Bitte verwenden Sie ein strengeres Passwort.')
                }
                else if (error.code.includes('auth/user-not-found')) {
                    setError('Die eingegebene Email-Adresse existierst nicht.')
                }
                else {
                    setError('Im Moment können Sie sich nicht anmelden. Bitte probieren Sie es später wieder.')
                }
                setChanging(false);
            })
    }
    return (
        <FormContainer>
            <h2>Passwort ändern</h2>
            <Input
                large
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Neues Passwort"
                onChange={event => setNewPassword(event.target.value)}
                value={newPassword}
            />
            <Input
                large
                type="password"
                name="newPasswordConfirm"
                id="newPasswordCOnfirm"
                placeholder="Neues Passwort bestätigen"
                onChange={event => setNewPasswordConfirm(event.target.value)}
                value={newPasswordConfirm}
            />
            <Button
                disabled={changing}
                onClick={() => changePassword()}
            >
                Anmelden
            </Button>
            <small><p>Noch nicht registriert?<Link to="/register">Jetzt registrieren!</Link></p></small>
            <ErrorText error={error} /> 
        </FormContainer>
    )
}

export default ChangePwPage;