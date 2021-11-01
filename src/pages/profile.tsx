import React from 'react';
import { useAppSelector } from '../helpers/hooks';
import { useHistory } from 'react-router';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import MakeAdmin from '../features/auth/makeAdmin';
import ChangePwPage from '../features/auth/change';
import LogOutPage from '../features/auth/logout';
import AddCourse from '../features/singleCourse/AddCourse';

const ProfilePage = (props: IPage) => {
    const currentUser = useAppSelector((state) => state.auth.user);

    if (currentUser.uid) {
        return (
            <div>
                <ChangePwPage />
                <LogOutPage /> 
                {currentUser.admin && <MakeAdmin />}
                {currentUser.admin && <AddCourse />}
            </div>
        );
    } 
};

export default ProfilePage;
