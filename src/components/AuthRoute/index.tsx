import React from 'react'; 
import { Redirect } from 'react-router';
import { auth } from '../../config/firebase';


export interface IAuthRouteProps { 
    children: React.ReactNode,
}

const AuthRoute= (props: IAuthRouteProps) => { 
    const { children } = props;

    if (!auth.currentUser) { 
        return <Redirect to="/login" />;
    }

    return (
        <div>{children}</div>
    );
}

export default AuthRoute;