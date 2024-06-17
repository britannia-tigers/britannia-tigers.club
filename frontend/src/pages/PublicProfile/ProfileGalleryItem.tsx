import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen/index";
import styled from "styled-components";

interface ProfileGalleryItemProps {
  src: string
  width?: number
  height?: number
}

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export function ProfileGalleryItem({ 
  src,
  width = 800,
  height = 800
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
      src={img.toURL()} width={width} height={height}
    />
  )
}