import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice'
import { FormContainer, Button } from '../../styles/forms';
import { FlexRowCenter } from '../../styles/layouts';

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
                <Button
                    onClick={() => logoutofApp()}
                >
                    Logout
                </Button>
                <Button
                    onClick={() => { history.goBack()} }
                >
                    Cancel
                </Button>
            </FlexRowCenter>
        </FormContainer>
    )
}

export default LogOutPage;