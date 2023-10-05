import { useCallback, useMemo } from 'react'
import { Close } from 'grommet-icons' 
import { useAuth0 } from "@auth0/auth0-react"
import { Box, Button, Form, FormField, TextInput } from 'grommet'
import { ResizedSection } from '../components/ResizedSection'
import { WhitePage } from '../components/WhitePage'
import { useLocation } from 'react-router-dom'

export function Profile() {

  const { user, logout } = useAuth0()
  const { pathname } = useLocation();

  const { name, picture, email } = useMemo(() => ({
    ...user
  }), [user])

  console.log('Profile: ', user)

  const logoutHandler = useCallback(() => {
    logout({
      logoutParams: {
        returnTo: `${window.location.origin}/logout`
      }
    })
  }, [pathname])

  return (
    <WhitePage backTo='/'>
          <Form
            // value={value}
            // onChange={nextValue => setValue(nextValue)}
            // onReset={() => setValue({})}
            // onSubmit={({ value }) => {}}
          >
            <FormField 
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
            </FormField>
            <Box direction="row" gap="medium">
              <Button size='small' type="submit" primary label="Submit" />
              <Button size='small' type="reset" label="Reset" />
            </Box>
          </Form>
        <div>
        </div>
        <Button 
          primary
          color='dark-1'
          size='small' 
          onClick={logoutHandler} 
          label='logout'/>      
    </WhitePage>
  )
}
