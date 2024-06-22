import {
  useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styled from 'styled-components';
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import { ImageGalleryItemProps } from './ImageGallery.interface';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export function ImageGalleryItem({ 
  id,
  src,
  value,
  width = 500,
  height = 500,
  onClick
}: ImageGalleryItemProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});

  const style = {
    cursor: onClick ? 'pointer' : 'default',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dlpk5xuhc'
    }
  }); 

  const img = cld.image(src).resize(
    thumbnail().width(width).height(height)
  );

  return (
    <Img ref={setNodeRef} 
      onClick={onClick}
      style={style} src={img.toURL()} width={'auto'} height={'auto'}
      {...attributes} {...listeners} />
  )
}