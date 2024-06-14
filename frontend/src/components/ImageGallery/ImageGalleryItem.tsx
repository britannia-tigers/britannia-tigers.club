import {
  useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styled from 'styled-components';
import { ImageGalleryItemProps } from './ImageGallery.interface';

const Img = styled.img`
  width: 200;
  height: 200;
  object-fit: cover;
`

export function ImageGalleryItem({ 
  id,
  src,
  value,
  width = '100%',
  height = '100%'
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

  return (
    <Img ref={setNodeRef} style={style} src={src} width={width} height={height} {...attributes} {...listeners}/>
  )
}