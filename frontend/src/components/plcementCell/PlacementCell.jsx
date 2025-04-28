import React from 'react'
import '../tabs/ProfileTab.css'
import { useApp } from '../../context/AppContext'
import OnlineAvaillable from './OnlineAvaillable';
import PlacementJobsList from './ByPlacementCell';

const PlacementCell = () => {
  const {placementOption , setPlacementOption} = useApp();

  return (
      placementOption? <PlacementJobsList/> : <OnlineAvaillable/>
   
  )
}

export default PlacementCell
