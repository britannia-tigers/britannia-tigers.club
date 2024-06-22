import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react"
import { SVG } from '@svgdotjs/svg.js'

export interface RadarChartData {
  label: string
  value: number
}

export interface RadarChartProps {
  diameter?: number
  padding?: number
  pointSize?: number
  step?: number
  min?: number
  max?: number
  data?: RadarChartData[]
}

export function RadarChart({
  diameter = 200,
  padding = 20,
  pointSize = 8,
  step = 1,
  max = 5,
  data = [
    {
      label: 'stamina',
      value: 1
    },
    {
      label: 'agility',
      value: 4
    },
    {
      label: 'flexibility',
      value: 4
    },
    {
      label: 'plusmimus',
      value: 3
    },
    {
      label: 'plusmimus',
      value: 5
    }
  ]
}:PropsWithChildren<RadarChartProps>) {

  const ref= useRef<HTMLDivElement>(null)
  const svgContainer = useMemo(() => SVG().width(diameter + padding*2).height(diameter + padding*2), []);

  const { elements } = useMemo(() => {
    if(!svgContainer || !data?.length) return {}
    let elements = [];
    const radius = diameter / 2
    const count = Math.ceil(max/step)

    for(let i = 1; i < count+1; i++) {
      const offset = -radius*i/count + radius + padding
      elements.push(SVG().circle(diameter*i/count).fill('#666666').move(offset, offset).opacity(0.5))
    }
  
    const len = data.length
    const pi = 3.1415

    const {polyStr, polyPos, axisPos} = useMemo(() => {

      const pos = data.map((d, i) => {
        const offset = radius + padding
        const hyp = d.value/max * radius

        const x = hyp * Math.sin(i/len * 2 * pi) + offset
        const y = - hyp * Math.cos(i/len * 2 * pi) + offset
        
        return [x, y]
      })

      const axisPos = data.map((d, i) => {
        const offset = radius + padding
        const x = radius * Math.sin(i/len * 2 * pi) + offset
        const y = - radius * Math.cos(i/len * 2 * pi) + offset
        return [x, y]
      })

      return {
        axisPos,
        polyPos: pos,
        polyStr: pos.map(p => `${p[0]},${p[1]}`).join(' ')
      }

    },[data])

    elements.push(SVG().polygon(polyStr).fill('#ffe600').opacity(0.3))
    polyPos.forEach(([x, y]) => elements.push(SVG().circle(pointSize).fill('#ffe600').move(x - pointSize/2, y - pointSize/2).opacity(0.5)))
    axisPos.forEach(([x, y], i) => 
      elements.push(
        SVG()
          .text(data[i].label.toUpperCase())
          .move(x - pointSize/2, y - pointSize/2)
          .font({
            anchor: 'middle',
            family: 'din-2014',
            size: 10
          })
          .fill('#ffffff')
          .opacity(0.5)
      )
    )

    return {
      elements
    }
  }, [data, svgContainer, ref])

  useEffect(() => {
    console.log('lala', elements)
    if(!elements?.length || !ref?.current) return
    elements.map(c => svgContainer.add(c))
    
    svgContainer.addTo(ref.current);

    return () => {
      svgContainer.clear()
    }
  }, [elements, svgContainer])



  return (
    <div style={{ width: diameter + padding*2, height: diameter + padding*2 }}ref={ref}/>
  )
}