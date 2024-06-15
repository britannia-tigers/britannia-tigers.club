import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
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
import { Distribution } from "grommet";

export function ImageGallery({ data, headerMode, editMode }: PropsWithChildren<ImageGalleryProps>) {

  const [items, setItems] = useState<ImageGalleryDataType[]>([]);

  useEffect(() => {
    if(!data) return;
    setItems(data.map((d, i) => ({
      id: d,
      src: d,
      value: headerMode ? setValueByIndex(i) : 10
    })))
  }, [data]);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event:DragEndEvent) =>  {
    const {active, over} = event;
    
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over?.id);
        const tmpItems = arrayMove(items, oldIndex, newIndex);
        return tmpItems.map((t, i) => ({
          ...t, 
          i,
          value: headerMode ? setValueByIndex(i) : 10
        }))
      });
    }
  }, [items]);

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={rectSwappingStrategy}
      >
        <Distribution values={items} gap={headerMode ? 'none' : 'small'}>
          {i => <ImageGalleryItem key={i.id} id={i.id} src={i.src} value={i.value}/>}
        </Distribution>
      </SortableContext>
    </DndContext>
  )
}


const setValueByIndex = (i: number) => i === 0 ? 50 : i === 1 ? 30 : i === 2 ? 20 : 10

