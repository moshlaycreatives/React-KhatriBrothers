import React from 'react'
import Page from '../../components/page/page'
import FAQHeroSection from './FAQHeroSection'
import FAQCard from './FAQCard'

const FAQMain = () => {
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