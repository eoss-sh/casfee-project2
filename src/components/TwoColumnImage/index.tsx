import React, { ReactNode } from 'react';
import { ImageHalfCover, TwoColumns } from '../../styles/layouts';


interface TwoColumnImageProps {
  image: string,
  children?: ReactNode 
}

const TwoColumnImage = ({
 image, children
}: TwoColumnImageProps) => {
  return (
    <TwoColumns>
      <ImageHalfCover src={image} />
      {children}
    </TwoColumns>
  );
};

export default TwoColumnImage;
