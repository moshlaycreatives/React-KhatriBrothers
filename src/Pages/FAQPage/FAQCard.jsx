import { Box, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

const FAQCard = () => {
    const theme = useTheme()

    const faqs = [
        {
            title:'What types of music courses do you offer?',
            desc:'At Khatri Brothers Academy, we offer courses in Hindustani Classical Music, including Beginner Hindustani Vocals for Kids and Advanced Hindustani Vocals classes.'
        },
        {
            title:'How do I enroll in a course?',
            desc:'You can enroll by filling out our online registration form on our website or contacting us directly via phone or email.'
        },
        {
            title:'What are the prerequisites for the courses?',
            desc:'For our Beginner Hindustani Vocals course, no prior experience is required. The Advanced Hindustani Vocals class is designed for students with some background in vocal music.'
        },
        {
            title:'What is the duration of each course?',
            desc:'The duration of each course varies. The Beginner course typically lasts 12 weeks, while the Advanced class duration depends on the student’s progress and goals.'
        },{
            title:'What are the class timings?',
            desc:'Class timings are flexible and can be scheduled based on availability. Please contact us to discuss your preferred time slots.'
        },
        {
            title:'What is the fee structure for the courses?',
            desc:'Fees vary depending on the course and duration. Please visit our website or contact us for detailed pricing information.'
        },
        {
            title:'Are there any performance opportunities for students?',
            desc:'Yes, we provide opportunities for students to perform in events and recitals organized by the academy, allowing them to showcase their skills.'
        },{
            title:'What qualifications do your instructors have?',
            desc:'Our instructors, Anmol Khatri and Shivam Khatri, are experienced musicians and creative directors with extensive backgrounds in Hindustani classical music. They are dedicated to providing high-quality instruction.'
        },{
            title:'Can I get a trial class before enrolling?',
            desc:'Yes, we offer trial classes for prospective students to experience our teaching style and see if the course is a good fit for them.'
        },{
            title:'Do you offer online classes?',
            desc:'Currently, our classes are offered in person at our academy. We are exploring options for online classes and will provide updates as they become available.'
        },

        {
            title:'How can I contact you for more information?',
            desc:'You can contact us via email at [email@example.com] or phone at [Phone Number]. For more details, please visit our website or follow us on social media.'
        },
        {
            title:'What safety measures are in place for in-person classes?',
            desc:'We follow all necessary health and safety guidelines to ensure a safe learning environment. This includes sanitation protocols and social distancing measures.'
        },{
            title:'Can I get a refund if I need to cancel my enrollment?',
            desc:'Refund policies vary depending on the timing of the cancellation. Please refer to our refund policy on our website or contact us for more specific information.'
        },{
            title:'Are there any additional materials I need for the courses?',
            desc:'Students may need to bring their notebooks and a recording device for practice. Specific requirements will be communicated upon enrollment.'
        },{
            title:'How do I provide feedback or suggestions?',
            desc:'We welcome feedback and suggestions from our students. Please reach out to us via email or through our feedback form available on our website.'
        },
    ]
  return (
    <>

<Box sx={{padding:'2rem 10%'}}>

<Grid container spacing={5}>


{faqs.map((val, ind)=>(

    <Grid item lg={6} md={6} sm={12} xs={12} key={ind}>

<Box sx={{border:'2px solid #911953', padding:'1rem 2rem', minHeight:'20vh'}}>

<Typography sx={{color:theme.palette.primary.main, fontWeight:'600', fontSize:'1.2rem'}}>
{val.title}
</Typography>

<Typography>

{val.desc}
</Typography>



</Box>

</Grid>
))}



</Grid>



</Box>



    </>
  )
}

export default FAQCard