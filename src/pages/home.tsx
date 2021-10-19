import React, { useEffect } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import Courses from '../features/courses/Courses';

const HomePage: React.FunctionComponent<IPage> = props => { 
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