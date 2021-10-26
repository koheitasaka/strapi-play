/* eslint-disable @next/next/no-img-element */
import { getStrapiMedia } from '../libs/media';

const Image = ({ image, style }: any) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <img
      src={imageUrl}
      alt={image.alternativeText || image.name}
      style={style}
    />
  );
};

export default Image;
