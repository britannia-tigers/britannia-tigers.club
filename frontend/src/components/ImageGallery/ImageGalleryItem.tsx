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
  height = 500
}: ImageGalleryItemProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});

  const style = {
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

  console.log(img.toURL());

  return (
    // <div ref={setNodeRef} style={style}>
    //   <AdvancedImage cldImg={img} {...attributes} {...listeners} />
    // </div>
    <Img ref={setNodeRef} style={style} src={img.toURL()} {...attributes} {...listeners}/>
  )
}