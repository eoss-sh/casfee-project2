import React from 'react';
import {Link} from 'react-router-dom';
import {SingelCourseCard} from '../../styles/courses';

interface singleCourseCardProps {
    name: string,
    url: string,
    shortDesc: string,
    id: string
}

const SingleCourseCard = ({name, url, shortDesc, id}: singleCourseCardProps) => {
    return (
      <SingelCourseCard key={id}>
        <p>{name}</p>
        <p>{shortDesc}</p>
        <Link to={'course/' + id}>Detail</Link>
      </SingelCourseCard>
    );
}

export default SingleCourseCard;