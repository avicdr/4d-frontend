import React from 'react'
import Grid from '../../ReusableComp/Unlisted/Grid'

const UnlistedLive = ({setColors}) => {
  return (
    <Grid Heading="Live Unlisted" setClrs={setColors} model={"live"}/>
  )
}

export default UnlistedLive