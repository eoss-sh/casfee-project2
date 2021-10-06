import React, { useEffect } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';

const AboutPage: React.FunctionComponent<IPage> = props => { 
    useEffect(() => { 
        logging.info(`loading ${props.name}`)
    }, [props.name])
    return <p>This is the ABOUT Page!</p>  
}

export default AboutPage;