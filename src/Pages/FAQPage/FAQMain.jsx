import React, { useEffect } from 'react'
import Page from '../../components/page/page'
import FAQHeroSection from './FAQHeroSection'
import FAQCard from './FAQCard'

const FAQMain = () => {
  useEffect(()=>{
window.scrollTo(0,0)
  },[])
  return (
    <>
        <Page title='FAQs'>

<FAQHeroSection/>

<br/>
<br/>

<FAQCard/>



        </Page>
    </>
  )
}

export default FAQMain