import React from 'react';
import {MainLinkText} from '../../styles/buttons'
import {
  SingelCourseCard,
  SingelCourseCardDescription,
  SingelCourseCardImage,
} from '../../styles/courses';

interface singleCourseCardProps {
    name: string,
    url: string,
    shortDesc: string,
    id: string
}

const SingleCourseCard = ({name, url, shortDesc, id}: singleCourseCardProps) => {
    return (
      <SingelCourseCard key={id}>
        <SingelCourseCardImage 
          src={url} 
          alt={name} 
        />
        <h3>{name}</h3>
        <SingelCourseCardDescription>{shortDesc}</SingelCourseCardDescription>
        <MainLinkText to={'course/' + id}>Details &rarr;</MainLinkText>
      </SingelCourseCard>
    );
}

export default SingleCourseCard;