import React, { useEffect } from 'react'
import Page from '../../components/page/page'
import BlogHeroSection from './BlogsHeroSection'
import BlogCard from './BlogCard'

const BlogsPageMain = () => {


  useEffect(()=>{
    window.scrollTo(0,0)
      },[])


  return (
    <>
        <Page title='Our Blogs'>


<BlogHeroSection/>

<BlogCard/>
        </Page>
    </>
  )
}

export default BlogsPageMain