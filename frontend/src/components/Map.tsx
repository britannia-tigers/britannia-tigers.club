import React from 'react';
import mapMaker from '../../public/map_marker.svg';
import GoogleMapReact from 'google-map-react';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API as string;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID as string;
const DEFAULT_MAP_ZOOM = 15;


interface MarkerProps {
  lat: number
  lng: number
}

export interface MapProps {
  lnglat: number[]
  zoom?: number
}

export function Map({ 
  lnglat, 
  zoom = DEFAULT_MAP_ZOOM
}: MapProps) {

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
      defaultCenter={{ lat: lnglat[1], lng: lnglat[0] }}
      defaultZoom={zoom}
      options={{
        fullscreenControl: false,
        zoomControl: false,
        mapId: GOOGLE_MAP_ID,
        scrollwheel: false
      }}
      >
      <MapMarker
        lat={lnglat[1]}
        lng={lnglat[0]} />
    </GoogleMapReact>
)
}


export function MapMarker({  }:MarkerProps) {
  return (
    <img 
      style={{marginLeft: '-13px', marginTop: '-13px'}}
      src={mapMaker} />
  )
}