import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react"
import { SVG } from '@svgdotjs/svg.js'
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { Avatar, Image } from "grommet";

export type RadarChartData = { [name:string]: number }

export interface RadarChartProps {
  diameter?: number
  padding?: number
  pointSize?: number
  step?: number
  min?: number
  max?: number
  data?: RadarChartData
  profile?: string
}

const TOLERANCE = 5

export function RadarChart({
  diameter = 200,
  padding = 60,
  pointSize = 8,
  step = 1,
  max = 5,
  profile,
  data = {
    'stamina': 0,
    'agility': 0,
    'vertical': 0,
    'strength':0,
    'grit':0,
    'strategy':0
  }
}:PropsWithChildren<RadarChartProps>) {

  const ref= useRef<HTMLDivElement>(null)
  const svgContainer = useMemo(() => SVG().width(diameter + padding*2).height(diameter + padding*2), []);

  console.log('data: ', data)

  const { elements, imgSize, imgPos } = useMemo(() => {
    if(!svgContainer || !data) return {}
    let elements = [];
    const radius = diameter / 2
    const count = Math.ceil(max/step)

    for(let i = 1; i < count+1; i++) {
      const offset = -radius*i/count + radius + padding
      elements.push(SVG().circle(diameter*i/count).fill('#666666').move(offset, offset).opacity(0.5))
    }
  
    const dataKeys = Object.keys(data)

    const len = dataKeys.length
    const pi = 3.1415

    const offset = radius + padding

    const polyPos = dataKeys.map((d, i) => {
      const hyp = data[d]/max * radius

      const x = hyp * Math.sin(i/len * 2 * pi) + offset
      const y = - hyp * Math.cos(i/len * 2 * pi) + offset
      
      return [x, y]
    })

    const axisPos = dataKeys.map((d, i) => {
      const x = radius * Math.sin(i/len * 2 * pi) + offset
      const y = - radius * Math.cos(i/len * 2 * pi) + offset
      return [x, y]
    })

    const polyStr = polyPos.map(p => `${p[0]},${p[1]}`).join(' ')
    


    elements.push(SVG().polygon(polyStr).fill('#ffe600').opacity(0.3))
    polyPos.forEach(([x, y]) => elements.push(SVG().circle(pointSize).fill('#ffe600').move(x - pointSize/2, y - pointSize/2).opacity(0.5)))
    axisPos.forEach(([x, y], i) => {
      const offset = radius + padding
      const posX = x - pointSize/2
      const posY = y - pointSize/2

      const anchor = Math.abs(posX-offset) < TOLERANCE ? 'middle' : posX > offset ? 'start' : 'end'
      const dx = Math.abs(posX-offset) < TOLERANCE ? 0 : posX > offset ?  7 : -2
      const dy =  Math.abs(posY-offset) < TOLERANCE ? 0 : posY > offset ? 10 : -20
      elements.push(
        SVG()
          .text(dataKeys[i].toUpperCase())
          .move(posX, posY)
          .font({
            anchor,
            family: 'din-2014',
            size: 10
          })
          .dx(dx)
          .dy(dy)
          .fill('#ffffff')
          .opacity(0.5)
      )
    })

    const imgSize = diameter * step / max;

    return {
      elements,
      imgSize,
      imgPos: [radius + padding - imgSize/2, radius + padding - imgSize/2]
    }
  }, [data, svgContainer, ref, profile])

  console.log(imgSize)

  useEffect(() => {
    if(!elements?.length || !ref?.current) return
    elements.map(c => svgContainer.add(c))
    
    svgContainer.addTo(ref.current);

    return () => {
      svgContainer.clear()
    }
  }, [elements, svgContainer])


  return (
    <div style={{ position: 'relative', width: diameter + padding*2, height: diameter + padding*2 }} ref={ref}>
      <Avatar src={profile} size={`${imgSize}px`} style={{ position: 'absolute', left: imgPos?.[0], top: imgPos?.[1], opacity: 0.8, border: '2px solid white' }}/>
    </div>
  )
}