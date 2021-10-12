import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice'
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPage from '../../interfaces/page';
import { FormContainer, Button } from '../../styles/forms';
import { FlexRowCenter } from '../../styles/layouts';

const LogOutPage: React.FunctionComponent<IPage> = props => { 

    const history = useHistory();
    const dispatch = useDispatch(); 

    const logoutofApp = () => { 
        auth.signOut()
            .then(() => { 
                dispatch(logout())
                history.push('/login')
            })
            .catch((error) => { 
                logging.error(error)
            })
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