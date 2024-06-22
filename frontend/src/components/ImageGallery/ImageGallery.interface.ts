import { UniqueIdentifier } from "@dnd-kit/core"
import { EventHandler, MouseEventHandler, SyntheticEvent } from "react"

export interface ImageGalleryDataType {
  id: UniqueIdentifier
  src: string
  value: number
  color?: string
}

export interface ImageGalleryProps {
  data?: string[]
  editMode: boolean
  headerMode: boolean
  onChange?: (e?: string[]) => void
  onUpload?: (f: FileList) => Promise<void>
  onItemClick?: (e: { src: string, index: number }) => void
}

export interface ImageGalleryItemProps extends ImageGalleryDataType {
  width?: number | string
  height?: number | string
  onClick?: MouseEventHandler<HTMLImageElement>
}


