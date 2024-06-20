import { ChangeEvent, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
} from '@dnd-kit/sortable';
import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryDataType, ImageGalleryProps } from "./ImageGallery.interface";
import { Distribution, Grid } from "grommet";
import { Dropzone } from "../Dropzone";

export function ImageGallery({ data, headerMode, editMode, onChange, onUpload }: PropsWithChildren<ImageGalleryProps>) {

  const [items, setItems] = useState<ImageGalleryDataType[]>([]);

  useEffect(() => {
    if(!data) return;
    setItems(data.map((d, i) => ({
      id: d,
      src: d,
      value: headerMode ? setValueByIndex(i) : 20
    })))
  }, [data]);

  useEffect(() => {
    onChange && onChange(items.map(i => i.src))
  }, [items])


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dragEndHandler = useCallback((event:DragEndEvent) =>  {
    const {active, over} = event;
    
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over?.id);
        const tmpItems = arrayMove(items, oldIndex, newIndex);
        return tmpItems.map((t, i) => ({
          ...t, 
          i,
          value: headerMode ? setValueByIndex(i) : 20
        }))
      });
    }
  }, [items]);

  const dropHandler = useCallback(async (e: any) => {
    if(!onUpload) return
    try {
      await onUpload(e.target.files)
    } catch(e) {
      throw e;
    }
  }, [onUpload]);

  return (
    <>
      {editMode && (
        <Grid pad={{ vertical: 'medium', horizontal: 'none' }}>
          <Dropzone onChange={dropHandler} name="image_upload" />
        </Grid>
      )}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={dragEndHandler}
      >
        <SortableContext 
          disabled={!editMode}
          items={items}
          strategy={rectSwappingStrategy}
        >
          <Grid
            columns={{
              count: 3,
              size: 'auto',
            }}
            gap="medium"
          >
            {items?.map(i => <ImageGalleryItem key={i.id} id={i.id} src={i.src} value={i.value}/>)}
          </Grid>
        </SortableContext>
      </DndContext>
    </>
  )
}


const setValueByIndex = (i: number) => i === 0 ? 50 : i === 1 ? 30 : i === 2 ? 20 : 10

