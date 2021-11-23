import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice'
import { FormContainer } from '../../styles/forms';
import { FlexRowCenter } from '../../styles/layouts';
import { MainButton, SecondaryButton } from '../../styles/buttons';

const LogOutPage = () => { 

    const history = useHistory();
    const dispatch = useDispatch(); 

    const logoutofApp = () => { 
                dispatch(logout())
                history.push('/login')
            }
    return (
        <FormContainer>
            <p>Sind Sie sicher, dass Sie sich auslogen möchten?</p>
            <FlexRowCenter>
                <MainButton
                    onClick={() => logoutofApp()}
                >
                    Logout
                </MainButton>
                <SecondaryButton
                    onClick={() => { history.goBack()} }
                >
                    Cancel
                </SecondaryButton>
            </FlexRowCenter>
        </FormContainer>
    )
}

export default LogOutPage;