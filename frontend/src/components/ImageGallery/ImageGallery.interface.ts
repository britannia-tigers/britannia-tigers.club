import { UniqueIdentifier } from "@dnd-kit/core"

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
  onChange: (e?: string[]) => void
  onUpload: (f: FileList) => Promise<void>
}

export interface ImageGalleryItemProps extends ImageGalleryDataType {
  width?: number | string
  height?: number | string
}

