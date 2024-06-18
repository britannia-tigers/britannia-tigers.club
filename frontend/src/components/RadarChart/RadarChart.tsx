import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react"
import { SVG } from '@svgdotjs/svg.js'

export interface RadarChartData {

}

export interface RadarChartProps {
  diameter?: number
  step?: number
  min?: number
  max?: number
}

export function RadarChart({
  diameter = 200,
  step = 1,
  max = 5
}:PropsWithChildren<RadarChartProps>) {

  const [data, setData] = useState<RadarChartData[]>([''] as RadarChartData[])
  const ref= useRef<HTMLDivElement>(null)
  const svgContainer = useMemo(() => SVG(), [data]);

  const { circles } = useMemo(() => {
    console.log('baba', svgContainer, data, ref)
    if(!svgContainer || !data?.length) return {}
    let circles = [];
    const radius = diameter / 2
    const count = Math.ceil(max/step)

    for(let i = 1; i < count+1; i++) {
      const offset = -radius*i/count + radius
      circles.push(SVG().circle(diameter*i/count).fill('#666666').move(offset, offset).opacity(0.5))
    }

    return {
      circles
    }
  }, [data, svgContainer, ref])

  useEffect(() => {
    console.log('lala', circles)
    if(!circles?.length || !ref?.current) return
    circles.map(c => svgContainer.add(c))
    
    svgContainer.addTo(ref.current);

    return () => {
      svgContainer.clear()
    }
  }, [circles, svgContainer])



  return (
    <div style={{ width: diameter, height: diameter }}ref={ref}/>
  )
}