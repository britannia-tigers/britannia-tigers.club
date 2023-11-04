import { Box, Button, Card, CardBody, CardFooter, CardHeader } from "grommet";
import { useNaviStore } from "../stores/NaviStore";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Close } from "./Close";


interface IGlobalDialog {
  animDuration?: number
  footer?: ReactNode
}

export function GlobalDialog({ animDuration = 350, children, footer }: PropsWithChildren<IGlobalDialog>) {

  const { setDialog, dialog: { content } } = useNaviStore()
  const [visible, setVisible] = useState(!!content)

  useEffect(() => setVisible(!!content), [content])



  return visible && (
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
            <Close onClick={() => setDialog(undefined)}/>
        </CardHeader>
        <CardBody
        pad={isMobile ? {
          horizontal: '30px',
          vertical: '0'
        } : {
          horizontal: '100px',
          vertical: '0'
        }} >
          { children }
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
            { footer }
        </CardFooter>
      </Card>
    </Box>

  )

}