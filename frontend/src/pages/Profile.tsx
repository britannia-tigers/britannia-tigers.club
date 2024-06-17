import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Close } from 'grommet-icons' 
import { useAuth0 } from "@auth0/auth0-react"
import { Avatar, Box, Button, Grid, ResponsiveContext } from 'grommet'
import { ResizedSection } from '../components/ResizedSection'
import { WhitePage } from '../components/WhitePage'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { InnerContainer, InnerTitle } from '../components/InnerContainer'
import { BrowserView } from 'react-device-detect'
import { TextInput } from '../components/TextInput'
import { Paragraph, SubTitle } from '../components/Titles'
import { useDropzone } from 'react-dropzone';
import { updateUserPic } from '../api/users'
import { useAuthToken } from '../hooks/auth'
import { useSelf } from '../hooks/user'
import { ImageGallery } from '../components/ImageGallery'
import { TextArea } from '../components/TextArea'

export function Profile() {

  const { isLoading, isAuthenticated, user, logout } = useAuth0()

  const token = useAuthToken();
  const self = useSelf();
  const [picture, setPicture] = useState<string>();
  const { pathname } = useLocation();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const { name, email, phone_number, images, description, stats } = useMemo(() => {
    
    const { name, email, phone_number, user_metadata } = self || {};
    const { images, videos, description, stats } = user_metadata || {};

    return {
      name, email, phone_number, images, videos, description, stats
    }
  }, [self])

  useEffect(() => setPicture(user?.picture), [user?.picture]);

  const windowSize = useContext(ResponsiveContext);


  useEffect(() => {
    (async () => {
      if(token && acceptedFiles.length) {
        const res = await updateUserPic(token, acceptedFiles[0]);
        setPicture(res?.picture);
      }
    })()
  }, [token, acceptedFiles])

  const logoutHandler = useCallback(() => {
    logout({
      logoutParams: {
        returnTo: `${window.location.origin}/logout`
      }
    })
  }, [pathname])

  return !isLoading && (
    <WhitePage backTo={-1}>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <InnerContainer>
      <BrowserView>
        <InnerTitle bottomPadding="small" >Profile</InnerTitle>
      </BrowserView>
      <Grid
          pad={windowSize === 'small' ? { horizontal: 'large', vertical: 'none' } : 'none'}
          responsive
          columns={windowSize === 'small' ? ['flex'] : ['1/2', '1/2']}
          rows={windowSize === 'small' ? ['auto', 'auto', 'auto', 'auto'] : ['flex', 'auto', 'auto']}
          gap={{
            // row: windowSize === 'small' ? 'large' : 'medium',
            column: windowSize === 'small' ? 'none' : 'medium'
          }}
          areas={windowSize === 'small' ? [
            { name: 'picture', start: [0, 0], end: [0, 0] },
            { name: 'events', start: [0, 1], end: [0, 1] },
            { name: 'about',  start: [0, 2], end: [0, 2] },
            { name: 'cta', start: [0, 3], end: [0, 3]}
          ] : [
            { name: 'picture', start: [0, 0], end: [0, 0] },
            { name: 'events', start: [1, 0], end: [1, 0] },
            { name: 'about',  start: [0, 1], end: [1, 1] },
            { name: 'cta',  start: [0, 2], end: [1, 2] }
            // { name: 'sessions', start: [0, 1], end: [0, 1] },
            // { name: 'blank', start: [1, 1], end: [1, 1] }
          ]}
          >
          <Box 
            pad={{ top: 'xlarge' }} 
            gridArea="picture" 
            align='center' 
            justify='start'>
            <Box 
              {...getRootProps({className: 'dropzone'})}
              align='center'
              justify='start'
            >
              <input {...getInputProps()} />
              <Avatar 
                size="150px"
                src={picture} 
                background="light-1" 
              />
              <Paragraph underline marginTop='12px'>Edit</Paragraph>
            </Box>
          </Box>
          <Box gridArea="events">
            <Box>
              <SubTitle marginBottom='small'>
                Member
              </SubTitle>
            </Box>
            <TextInput
              name="name"
              label="Name"
              value={name}
            /> 
            <TextInput
              name="email"
              label="Email"
              disabled
              value={email}
             /> 
            <TextInput
              name="phoneNumber"
              label="Mobile"
              value={phone_number}
            />

            {/* <FormField 
              name="name" 
              htmlFor="text-input-id" 
              label="Name">
              <TextInput 
                defaultValue={name}
                id="text-input-id" 
                name="name" />
            </FormField>
            <FormField 
              name="email" 
              htmlFor="text-input-id" 
              label="Email">
              <TextInput 
                defaultValue={email}
                id="text-input-id" 
                name="email" />
            </FormField> */}
          </Box>
          <Box gridArea="about">
            <TextArea 
              aria-label="description"
              name="description"
              label="Description"
              value={description}
              placeholder="Your description here..." />
          </Box>
          <Box gridArea="cta">
            <Box 
              pad={{top: 'large'}}
              direction="row" 
              gap="small">
              <Button 
                size='small' 
                type="submit" 
                primary 
                label="UPDATE" />
              <Button 
                primary
                color='dark-1'
                size='small' 
                onClick={logoutHandler} 
                label='LOGOUT'/>   
            </Box>
          </Box>
          {/* <Box gridArea='sessions'></Box>
          <Box gridArea='blank'></Box> */}
      </Grid>
      <Grid pad={{top: 'xlarge', bottom: 'large'}}>
        <SubTitle marginBottom='36px'>
          Images
        </SubTitle>
        <ImageGallery data={images} headerMode={false} editMode={true} />
      </Grid>

      </InnerContainer>
    </WhitePage>
  )
}
