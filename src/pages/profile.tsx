import React from 'react';
import { useAppSelector } from '../helpers/hooks';
import IPage from '../interfaces/page';
import MakeAdmin from '../features/auth/makeAdmin';
import ChangePwPage from '../features/auth/change';
import LogOutPage from '../features/auth/logout';

const ProfilePage = (props: IPage) => {
    const currentUser = useAppSelector((state) => state.auth.user);

    if (currentUser.uid) {
        return (
            <div>
                <ChangePwPage />
                <LogOutPage /> 
                {currentUser.admin && <MakeAdmin />}
            </div>
        );
    } 
};

export default ProfilePage;
