import { useCallback, useContext, useEffect, useMemo } from 'react'
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

export function Profile() {

  const { isLoading, isAuthenticated, user, logout } = useAuth0()
  const { pathname } = useLocation();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const { name, picture, email, phone_number } = useMemo(() => ({
    ...user
  }), [user])

  const windowSize = useContext(ResponsiveContext);


  useEffect(() => {
    console.log('ff: ', acceptedFiles)
  }, [acceptedFiles])

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
          columns={windowSize === 'small' ? ['flex'] : [['1/2', '1/2'], ['1/2', '1/2']]}
          rows={windowSize === 'small' ? ['auto', 'auto'] : ['flex', 'flex']}
          gap={{
            row: windowSize === 'small' ? 'large' : 'medium',
            column: windowSize === 'small' ? 'none' : 'medium'
          }}
          areas={windowSize === 'small' ? [
            { name: 'picture', start: [0, 0], end: [0, 0] },
            { name: 'events', start: [0, 1], end: [0, 1] }
          ] : [
            { name: 'picture', start: [0, 0], end: [0, 0] },
            { name: 'events', start: [1, 0], end: [1, 0] },
            { name: 'sessions', start: [0, 1], end: [0, 1] },
            { name: 'blank', start: [1, 1], end: [1, 1] }
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
          <Box gridArea='sessions'></Box>
          <Box gridArea='blank'></Box>
        </Grid>

      </InnerContainer>
    </WhitePage>
  )
}
