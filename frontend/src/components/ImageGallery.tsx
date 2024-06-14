import { List } from "grommet";
import { PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";

interface ImageGalleryDataType {
  src: string
}

interface ImageGalleryProps {
  data?: ImageGalleryDataType[]
}

const Img = styled.img`
  width: 200;
  height: 200;
  object-fit: cover;
`

export function ImageGallery({ data }: PropsWithChildren<ImageGalleryProps>) {

  const [ordered, setOrdered] = useState(data);
  useEffect(() => setOrdered(data), [data]);

  return (
    <>
      <List data={ordered} onOrder={setOrdered}>
      {({ src }) => (
        <>
          <Img src={src} width={200} height={200}/>
        </>
      )}
      </List>
    </>
  )
}