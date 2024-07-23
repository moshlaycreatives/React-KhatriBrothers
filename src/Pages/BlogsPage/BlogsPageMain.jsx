import React from 'react'
import Page from '../../components/page/page'
import BlogHeroSection from './BlogsHeroSection'
import BlogCard from './BlogCard'

const BlogsPageMain = () => {
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