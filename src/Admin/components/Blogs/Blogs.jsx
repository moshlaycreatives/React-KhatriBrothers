import React, { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, CardActionArea, Divider, Grid, IconButton, InputBase, useTheme } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Add, DeleteForeverOutlined, Edit } from '@mui/icons-material';
import AddBlog from './components/AddBlog';
import AddBlogContent from './components/AddBlogContent';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditBlog from './components/EditBlog';
import { useDispatch } from 'react-redux';
import { deleteBlog, deleteCTA, getAdminBlogs, getAllCTA, getBlogs, } from '../../../../store/actions/blogsActions';
import { useNavigate, useParams } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import { Helmet } from 'react-helmet';
import AddCTA from './components/AddCTA';
import EditCTA from './components/EditCTA';


const Blogs = () => {
  const { slug } = useParams();

  const theme = useTheme()
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const [open, setOpen] = React.useState(false)
  const [openContent, setopenContent] = useState(false)

  const [openEdit, SetopenEdit] = useState(false)
  const [editData, setEditData] = useState('')
  const [blogs, setBlogs] = useState([])
  const [blogId, SetBlogId] = useState('')
  const dispatch = useDispatch()
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openCTO, setopenCTO] = useState(false)
  const [openEditCTA, setOpenEditCTA] = useState(false)



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

  };
  useEffect(() => {
    // Filter blogs based on search query
    const filtered = blogs.filter(blog => {
      const combinedFields = `${blog.title.toLowerCase()} ${blog.description.toLowerCase()}`;
      return combinedFields.includes(searchQuery.toLowerCase());
    });
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);


  const getAllBlogs = async () => {
    dispatch(getAdminBlogs()).then((res) => {
      const sortedBlogs = res.data.payload.sort((a, b) => b.id - a.id);
      setBlogs(sortedBlogs)


    }).catch((err) => {
      console.error(err);
    });
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpenContent = (id) => {
    SetBlogId(id)
    setopenContent(true)
    // console.log(id, 'this is id for 1st')
  }

  const handleOpenCTO = (id) => {
    SetBlogId(id)
    setopenCTO(true)
    console.log(id, 'this is id for specific blog')
  }

  const [editCTA, setEditCTA]= useState([])



  // const handleEditCTA = (id) => {
  //   SetCTAId(id)
  //   setEditCTA(true)
  //   console.log(id, 'this is id for specific blog')
  // }
  const handleEditCTA = (cta) => {
    setEditCTA(cta)
    setOpenEditCTA(true)
    console.log('Editing CTA:', cta);
  };







  const [allCTA, setAllCTA] = useState([])

  const getAllCTAs =()=>{
    dispatch(getAllCTA())
    .then((res) => {
      const data = res.data.payload
      console.log(data, 'Admin blog data')
      setAllCTA(data);
    })
    .catch((err) => {
      console.error(err);
    });


  }
  useEffect(() => {
    getAllCTAs();
  }, []);

  console.log(allCTA, 'cttaaaaaaa')

  const handleDeleteCTA = (id) => {



        confirmAlert({
          title: 'Delete?',
          message: `Are you sure to delete ?`,
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                dispatch(deleteCTA(id)).then((res) => {

                  alert(res.data.message)
                  getAllBlogs()
                }).catch((err) => {
                  alert(res.err.message)

                  console.error(err);
                });

              }
            },
            {
              label: 'No',
            }

          ]
        })
      }

  const handleCloseContent = () => {
    setopenContent(false)
    SetBlogId('')
  }
  const handleOpenEdit = (data) => {
    SetopenEdit(true)
    setEditData(data)
  }
  const handleCloseEdit = () => {
    SetopenEdit(false)
    setEditData('')
  }
  const handleCloseCTO = () => {
    setopenCTO(false)

  }
  const handleCloseEditCTA = () => {
    setOpenEditCTA(false)

  }
  useEffect(() => {
    getAllBlogs()

  }, [])


  const handleDelete = (val) => {
    confirmAlert({
      title: 'Delete?',
      message: `Are you sure to delete ?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(deleteBlog(val.id)).then((res) => {
              alert(res.data.message)
              getAllBlogs()
            }).catch((err) => {
              console.error(err);
            });

          }
        },
        {
          label: 'No',
        }

      ]
    })


  }
  const navigate = useNavigate()

  const handleEditContent = (data) => {
    navigate('/editContent', { state: data });
  };


  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };
  return (
    <div>
      <Helmet>
        <meta name="robots" content="noindex, nofollow"></meta>
      </Helmet>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant='h2' fontWeight="bold" mb={3} >
              All Blogs
            </Typography>
          </Box>
          <Box>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: theme.palette.primary.main, borderRadius: '50px', color: 'white' }}>
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ mr: 1, width: '200px', padding: '10px 20px', color: 'white' }}
              />
              <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon sx={{ color: 'white' }} />
              </IconButton>
            </div>
          </Box>

        </Box>

        <Button
          onClick={handleOpen}
          variant='outlined'
          endIcon={
            <Add />
          }
        >
          Add Blog
        </Button>
      </Box>
      <Grid container spacing={3}>
        {
          filteredBlogs.map((val, ind) => {
            return (
              <Grid key={ind} item xs={12} lg={12}>
                <Card sx={{ background: '#efefef' }}>
                  <CardActionArea disableRipple>
                    <CardContent>
                      <Typography gutterBottom variant="h3" fontWeight="bold">
                        {val.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary"
                        dangerouslySetInnerHTML={{ __html: val.description }}
                      />
                      <div>
                        {/* {console.log(val.img)} */}
                        <img src={`${import.meta.env.VITE_REACT_APP_URL}${val.img}`} alt={val.img_alt_text} style={{ maxWidth: '100%', marginBottom: '8px', height: '50vh' }} />
                        <br />
                        <Typography variant="caption">{val.img_title}</Typography>

                      </div>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button variant='contained' sx={{ mr: 2 }}
                          onClick={() => handleOpenContent(val.id)}
                        >
                          Add Content
                        </Button>
                        <Button sx={{ my: 1 }}
                          onClick={() => handleEditContent(val)}
                          endIcon={
                            <KeyboardDoubleArrowRightIcon />
                          }
                        >
                          Read More
                        </Button>
                      </Box>
                      <Divider sx={{ mb: 3 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={`${apiUrl}/${val.authors.length > 0 ? val.authors[0].img : ''}`} />
                          <Box sx={{ ml: 1 }}>
                            <Typography fontWeight="bold">{val.authors.length > 0 ? val.authors[0].name : 'No Author Found'}</Typography>
                            <Typography sx={{ fontSize: '12px' }}>{val.authors.length > 0 ? val.authors[0].position : ''}</Typography>
                          </Box>
                        </Box>
                        <Box>


                        <Button variant='outlined' endIcon={<Edit />}
                            onClick={() => handleOpenCTO(val.id)}
                         sx={{backgroundColor:'#fa7a36', color:'white'}}

                          >

                            Add CTA
                          </Button>






<Button
  variant='outlined'

  endIcon={<Edit />}
  onClick={() => {
    const cta = allCTA.find(cta => cta.blog_id === val.id);
    if (cta) {

      handleDeleteCTA(cta.id);
    } else {
      alert('CTA not found for this blog: ' + val.id);

    }
  }}

  sx={{backgroundColor:'red', color:'white', marginLeft:'1rem'}}
>
  Delete CTA
</Button>




<Button variant='outlined' sx={{ml:2}} endIcon={<Edit />}
                            // onClick={() => handleOpenEdit(val)}

                            onClick={() => {
    const cta = allCTA.find(cta => cta.blog_id === val.id); // Find the CTA with matching blog_id
    if (cta) {
      handleEditCTA(cta); // If CTA found, delete it
    } else {
      // console.error('CTA not found for blog:', val.id);
      window.alert('CTA not found for blog: ' + val.id);
    }
  }}


                          >

                            Edit CTA
                          </Button>


                          <Button variant='outlined' sx={{ml:2}} endIcon={<Edit />}
                            onClick={() => handleOpenEdit(val)}
                          >

                            Edit Blog
                          </Button>
                          <Button
                            onClick={() => handleDelete(val)}
                            variant='contained' color='secondary' sx={{ ml: 2 }} endIcon={
                              <DeleteForeverOutlined />
                            }>
                            Delete Blog
                          </Button>

                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

            )
          })
        }



      </Grid>

      <AddBlog
        open={open}
        close={handleClose}
        createSuccess={getAllBlogs}
      />

      <AddBlogContent
        open={openContent}
        close={handleCloseContent}
        id={blogId}
      />


      <EditBlog
        open={openEdit}
        close={handleCloseEdit}
        createSuccess={getAllBlogs}
        data={editData}
      />

      <AddCTA
        open={openCTO}
        close={handleCloseCTO}
        createSuccess={getAllBlogs}
id={blogId}

      />

      <EditCTA
open={openEditCTA}
close={handleCloseEditCTA}
data={editCTA}

      />


    </div>
  )
}

export default Blogs
