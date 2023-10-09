import { Box, Button, Card, CardBody, CardFooter, CardHeader, Form , FormField, TextInput as TIn} from "grommet";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Paragraph, SubTitle } from "./Titles";
import { useNaviStore } from "../stores/NaviStore";
import { AnimationType } from "grommet/utils";
import { Close } from "./Close";
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { isMobile } from "react-device-detect";


export interface ContactFormDataProps {
  name: string
  email: string
  phone?: string
  message: string
}

interface ContactFormProps {
  title: string
  animDuration?: number
  onSubmit?: (data:Partial<ContactFormDataProps>) => void
}


/**
 * Contact form
 * @param param0 
 * @returns 
 */
export function ContactForm({ title, animDuration = 350, onSubmit }: PropsWithChildren<ContactFormProps>) {

  const { setFormVisible, form: { isVisible } } = useNaviStore()
  const [formData, setFormData] = useState({})

  const inputHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const submitHandler = () => onSubmit && onSubmit(formData)


  return isVisible && (
    <Box 
      background={{
        color: 'black',
        opacity: 0.9
      }}
      style={{ 
        position: 'fixed', 
        left: 0, top: 0, 
        zIndex: 999 
      }} 
      fill align="center" 
      animation={{
        type: 'fadeIn',
        duration: animDuration
      }}
      justify="center" >
      <Card 
        border={{
          color: 'white',
          size: 'small',
        
        }}
        elevation='none'
        round={{
          size: '2px'
        }}
        background='white'
        pad='0px' 
        gap="small"
        width={{
          width: '560px',
          max: '100%' 
        }} 
        overflow='auto'
        height={{
          height: isMobile ? '100vh' : '80%',
          min: isMobile ? 'auto' : '720px',
          max: '100%'
        }}>
          <CardHeader 
            pad={{
              left: '0px',
              right: '30px',
              top: '30px',
              bottom: '0px'
            }}
            direction="column-reverse" align="end">
              <Close onClick={() => setFormVisible(false)}/>
          </CardHeader>
          <Form 
            onSubmit={submitHandler} 
            style={{ margin: '12px 0px' }} >
              <CardBody
                pad={isMobile ? {
                  horizontal: '30px',
                  vertical: '0'
                } : {
                  horizontal: '100px',
                  vertical: '0'
                }} >
                  <SubTitle marginBottom="12px">{title}</SubTitle>
                  <Paragraph size="small" margin='0px'>Pleae fill in the required fields (*)</Paragraph>
                    <TextInput 
                      required
                      validate={[{ 
                        regexp: /^[a-z]/i,
                        message: 'Name can only contain alphabets'
                      }]}
                      name='name'
                      onChange={inputHandler}
                      label="Name *"
                      placeholder='Full name' />
                    <TextInput 
                      required
                      validate={{ 
                        regexp: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
                        message: 'Email is invalid'
                      }}
                      name='email'
                      onChange={inputHandler}
                      label="Email *"
                      placeholder='Email address' />
                    <TextInput
                      name='phone'
                      validate={{
                        message: 'Phone number is invalid'
                      }}
                      onChange={inputHandler}
                      label="Phone"
                      placeholder='Contact number' />
                    <TextArea 
                      required
                      name='message'
                      onChange={inputHandler}
                      label="Message *"
                      placeholder="You message"/>
                </CardBody>
            <CardFooter
              pad={isMobile ? {
                horizontal: '30px',
                top: '30px',
                bottom: '30px'
              } : {
                horizontal: '100px',
                top: '30px',
                bottom: '30px'
              }} >
                <Button size='small' primary label='SEND' type="submit"/>
            </CardFooter>
          </Form>
      </Card>
    </Box>
  )
}