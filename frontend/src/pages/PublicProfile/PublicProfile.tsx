import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom"
import { useUser } from "../../hooks/user";
import { PageWrapper } from "../../components/PageWrapper";
import { Helmet } from "react-helmet";
import { InnerContainer, InnerTitle } from "../../components/InnerContainer";
import { BrowserView } from "react-device-detect";
import { ResizedSection } from "../../components/ResizedSection";
import { Box, Button, Carousel, Distribution, Grid, Image, Layer } from "grommet";
import { ProfileGalleryItem } from "./ProfileGalleryItem";
import { Paragraph, SmallParagraph, SmallSubTitle, SubTitle } from "../../components/Titles";
import { ImageGallery } from "../../components/ImageGallery";
import { RadarChart } from "../../components/RadarChart";
import { ImageGalleryItem } from "../../components/ImageGallery/ImageGalleryItem";
import { Close } from "../../components/Close";
import { Cloudinary } from '@cloudinary/url-gen';
import { useSelfStore } from "../../stores/selfStore";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export function PublicProfile() {

  const { id } = useParams();
  const userId = useMemo(() => id && atob(id), [id]);
  const user = useUser(userId);
  const [showCarousel, setShowCarousel] = useState(false)
  const [curCarouselIndex, setCurCarouselIndex] = useState(-1)


  const { heroImages, galleryImages, description, picture, chart } = useMemo(() => {
    const { user_metadata, app_metadata, picture } = user || {};
    const { description, images, stats } = user_metadata || {};
    const { teamAvatar } = app_metadata || {}

    // use team picture if it exists
    let teamAvatarPicture:string | undefined;
    if(teamAvatar && teamAvatar.length) {
      const cld = new Cloudinary({
        cloud: {
          cloudName: 'dlpk5xuhc'
        }
      }); 
      
      teamAvatarPicture = cld.image(teamAvatar).resize(
        thumbnail().width(200).height(200)
      ).toURL()
    }


    const allImages = images?.map((t, i) => ({
      i,
      src: t,
      value: setValueByIndex(i)
    })) || [];

    const heroImages = allImages.slice(0, 4)
    const galleryImages = images?.slice(5) || [];

    console.log(user_metadata)

    return {
      heroImages,
      galleryImages,
      description,
      picture: teamAvatarPicture || picture,
      chart: stats?.chart
    }
  }, [user])

  const handleClick = useCallback((e: { src: string, index: number }) => {
    setShowCarousel(true);
    setCurCarouselIndex(e.index)
  }, [user]);

  return(
    <>
      <Helmet>
        <title>Team :: {user?.name}</title>
      </Helmet>
      <PageWrapper backTo="/team" bgColor="black">
        <Box style={{ height: 420 }} >
          <Distribution fill values={heroImages} gap='none'>
            {i => <ProfileGalleryItem src={i.src}/>}
          </Distribution>
        </Box>

        <InnerContainer paddingTop='small'>
          <Grid
            gap="medium"
            rows={['auto', 'auto', 'flex']}
            areas={[
              ['title', 'title'],
              ['info', 'chart'],
              ['gallery', 'gallery']
            ]}
            columns={['1/2', '1/2']}
          >
            <Grid gridArea="title">
              <SubTitle style={{ textTransform: 'uppercase' }}  marginBottom="0px">{user?.name}</SubTitle>
              <Paragraph marginTop="2px">{user?.user_metadata.stats.position?.join(', ')}</Paragraph>
            </Grid>
            <Grid gridArea="info">
              <Paragraph marginTop="0px">{description}</Paragraph>
            </Grid>
            <Grid gridArea="chart" justifyContent="end">
              <RadarChart profile={picture} data={chart}/>
            </Grid>
            <Grid gridArea="gallery">
              <SubTitle marginTop="0px">Gallery</SubTitle>
              <ImageGallery 
                onItemClick={handleClick}
                data={galleryImages} 
                headerMode={false} 
                editMode={false}/>
            </Grid>
          </Grid>
        </InnerContainer>
        {showCarousel && (
          <Layer full background={'none'} animation="fadeIn">
            <Box fill background={{ color: '#000000', opacity: 'strong' }} align="center" justify="center">
              <Carousel controls="selectors" initialChild={curCarouselIndex}>
                {galleryImages.map((g, i) => (
                  <ImageGalleryItem id={i} src={g} color={g} value={i}/>
                ))}
              </Carousel>
            </Box>
            <Close onClick={() => setShowCarousel(false)}  color='white' style={{ position: 'absolute', right: '30px', top: '30px' }}/>
          </Layer>
        )}
      </PageWrapper>
    </>
  )
}

const setValueByIndex = (i: number) => i === 0 ? 50 : i === 1 ? 30 : i === 2 ? 20 : 10
