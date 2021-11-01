import React, { useEffect } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import Courses from '../features/courses/Courses';
import MakeAdmin from '../features/auth/makeAdmin';

const HomePage = (props: IPage) => { 
    useEffect(() => { 
        logging.info(`loading ${props.name}`)
    }, [props.name])
    return (
      <div>
        <Courses />
      </div>
    ); 
}

export default HomePage;