import { useMemo } from "react";
import { useParams } from "react-router-dom"
import { useUser } from "../../hooks/user";
import { PageWrapper } from "../../components/PageWrapper";
import { Helmet } from "react-helmet";
import { InnerContainer, InnerTitle } from "../../components/InnerContainer";
import { BrowserView } from "react-device-detect";
import { ResizedSection } from "../../components/ResizedSection";
import { Distribution, Grid } from "grommet";
import { ProfileGalleryItem } from "./ProfileGalleryItem";
import { Paragraph, SmallParagraph, SmallSubTitle, SubTitle } from "../../components/Titles";
import { ImageGallery } from "../../components/ImageGallery";


export function PublicProfile() {

  const { id } = useParams();
  const userId = useMemo(() => id && atob(id), [id]);
  const user = useUser(userId);


  const { heroImages, galleryImages, description } = useMemo(() => {
    const { user_metadata } = user || {};
    const { description, images } = user_metadata || {};

    const allImages = images?.map((t, i) => ({
      i,
      src: t,
      value: setValueByIndex(i)
    })) || [];

    const heroImages = allImages.slice(0, 4)
    const galleryImages = images?.slice(5) || [];

    return {
      heroImages,
      galleryImages,
      description
    }
  }, [user])

  return(
    <>
      <Helmet>
        <title>Team :: {user?.name}</title>
      </Helmet>
      <PageWrapper backTo="/team" bgColor="black">
          <Distribution style={{ height: 420 }} values={heroImages} gap='none'>
            {i => <ProfileGalleryItem src={i.src}/>}
          </Distribution>

        <InnerContainer paddingTop='small'>
          <Grid>
            <Grid>
              <SubTitle style={{ textTransform: 'uppercase' }}  marginBottom="0px">{user?.name}</SubTitle>
              <Paragraph marginTop="2px">{user?.user_metadata.stats.position?.join(', ')}</Paragraph>
              <Paragraph marginTop="36px">{description}</Paragraph>
            </Grid>
            <Grid>

            </Grid>
            <Grid pad={{ vertical: '48px' }}>
            <SubTitle>Gallery</SubTitle>
              <ImageGallery data={galleryImages} headerMode={false} editMode={false}/>
            </Grid>
          </Grid>
        </InnerContainer>
      </PageWrapper>
    </>
  )
}

const setValueByIndex = (i: number) => i === 0 ? 50 : i === 1 ? 30 : i === 2 ? 20 : 10
