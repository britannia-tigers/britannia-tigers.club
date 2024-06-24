import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Close } from 'grommet-icons' 
import { useAuth0 } from "@auth0/auth0-react"
import { Avatar, Box, Button, Form, FormExtendedEvent, Grid, ResponsiveContext, Text } from 'grommet'
import { ResizedSection } from '../components/ResizedSection'
import { WhitePage } from '../components/WhitePage'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { InnerContainer, InnerTitle } from '../components/InnerContainer'
import { BrowserView } from 'react-device-detect'
import { TextInput } from '../components/TextInput'
import { Paragraph, SubTitle } from '../components/Titles'
import { useDropzone } from 'react-dropzone';
import { PositionTypeEnum, updateUserPic } from '../api/users'
import { useAuthToken } from '../hooks/auth'
import { ImageGallery } from '../components/ImageGallery'
import { TextArea } from '../components/TextArea'
import { ChangeSelfFormData, useSelfStore } from '../stores/selfStore'
import { MultiDropdown } from '../components/MultiDropdown'

export function Profile() {

  const { isLoading, isAuthenticated, user, logout } = useAuth0()

  const token = useAuthToken();
  const {self, roles, fetch, setPicture, changeSelf, uploadImages} = useSelfStore();
  const { pathname } = useLocation();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const { name, email, phone_number, images, description, stats, b64UserId } = useMemo(() => {
    
    const { name, email, phone_number, user_metadata, user_id } = self || {};
    const { images, videos, description, stats } = user_metadata || {};

    const b64UserId = user_id ? btoa(user_id) : ''

    return {
      name, email, phone_number, b64UserId,
      images, videos, 
      description, stats
    }
  }, [self])

  useEffect(() => {token && fetch(token)}, [token]);

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

  const submitHandler = useCallback(async (e:FormExtendedEvent<Omit<ChangeSelfFormData, 'user_metadata'>>) => {
    if(!token) return;

    await changeSelf(token, {
      name: e.value.name,
      description: e.value.description,
      position: e.value.position
    })

  }, [token])

  const galleryChangeHandler = useCallback((e?: string[]) => {
    // TODO: gallery change handler
    console.log(e);
  }, [token])

  const galleryUploadHandler = useCallback(async (e: FileList) => {
    if(!token) return
    try {
      await uploadImages(token, e)
    } catch(e) {
      throw e;
    }
  }, [token])

  return !isLoading && (
    <WhitePage backTo={-1}>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <InnerContainer>
      <BrowserView>
        <InnerTitle bottomPadding="small" >Profile</InnerTitle>
      </BrowserView>
      <Form
        onSubmit={submitHandler}
      >
        <Grid
          pad={windowSize === 'small' ? { horizontal: 'large', top: 'none', bottom: 'large' } : { horizontal: 'none', bottom: 'none' }}
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
                src={self.picture} 
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
            <Link to={`/team/${b64UserId}`} target='blank'><Text size='small'>LINK TO PROFILE</Text></Link>
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
            <MultiDropdown
              name="position"
              label="Position"
              options={Object.keys(PositionTypeEnum)}
              defaultValue={stats?.position}
            />
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
                label="SAVE INFO" />
              <Button 
                primary
                color='dark-1'
                size='small' 
                onClick={logoutHandler} 
                label='LOGOUT'/>   
            </Box>
          </Box>
        </Grid>
      </Form>
      <Grid 
        pad={windowSize === 'small' ? { top: 'xlarge', bottom: 'xlarge', horizontal: 'large' } : {top: 'xlarge', bottom: 'large'}}
        responsive
      >
        <SubTitle marginBottom='0px'>
          Images
        </SubTitle>
        <ImageGallery 
          onUpload={galleryUploadHandler}
          onChange={galleryChangeHandler}
          data={images} 
          headerMode={false} 
          editMode={true} />
      </Grid>

      </InnerContainer>
    </WhitePage>
  )
}
