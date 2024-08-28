import React, { useEffect } from 'react'
import Page from '../../components/page/page'
import AdvanceCourseHeroSection from '../AdvanceCoursePage/AdvanceCourseHeroSection'
import AdvanceCoursePriceHeroSection from './AdvanceCoursePriceHeroSection'
import { Box, Button, Grid, Typography } from '@mui/material'

const AdvanceCoursePriceMain = () => {


  useEffect(()=>{
window.scrollTo(0,0)
  },[])



  return (
    <>

<Page title='Course Details'>




<AdvanceCoursePriceHeroSection/>


</Page>

    </>
  )
}

export default AdvanceCoursePriceMain