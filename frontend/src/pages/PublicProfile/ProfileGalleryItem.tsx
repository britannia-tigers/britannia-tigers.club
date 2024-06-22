import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface ProfileGalleryItemProps {
  src: string
  width?: number
  height?: number
  onClick?: MouseEventHandler
}

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export function ProfileGalleryItem({ 
  src,
  width = 800,
  height = 800,
  onClick
}: ProfileGalleryItemProps) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dlpk5xuhc'
    }
  }); 

  const img = cld.image(src).resize(
    thumbnail().width(width).height(height)
  );


  return (
    <Img
      onClick={onClick}
      src={img.toURL()} width={'auto'} height={'auto'}
    />
  )
}