import { PropsWithChildren, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { WhitePage } from "./WhitePage"
import { Previous } from "grommet-icons"
import { User } from "./User";
import { useNaviStore } from "../stores/NaviStore";

interface PageWrapperProps {
  backTo?: string
  bgColor?: string
}

export function PageWrapper({ 
  children, backTo,
  bgColor = 'white'
}: PropsWithChildren<PageWrapperProps>) {

  const navigate = useNavigate()
  const { setBgDark, setTextColor } = useNaviStore();
  useEffect(() => {
    setBgDark(bgColor === 'white' ? false : true)
    setTextColor(bgColor === 'white' ? '#000000' : '#ffffff')
  }, []);
  
  return (
    <WhitePage bgColor={bgColor} textColor={bgColor === 'white' ? '#000000' : '#ffffff'}>
      {children}
      <User />
      <Previous 
        onClick={() => backTo ? navigate(backTo) : navigate(-1)}
        style={{
          cursor: 'pointer',
          position: 'fixed',
          left: '20px',
          top: '30px',
          stroke: bgColor === 'white' ? '#000000' : '#ffffff'
        }}/>
    </WhitePage>
  )
}