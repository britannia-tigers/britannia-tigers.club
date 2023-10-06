import mapMaker from '../../public/map_marker.svg';


interface MarkerProps {
  lat: number
  lng: number
}

export function MapMarker({  }:MarkerProps) {
  return (
    <img 
      style={{marginLeft: '-13px', marginTop: '-13px'}}
      src={mapMaker} />
  )
}