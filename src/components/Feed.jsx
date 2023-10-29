import { useState, useEffect} from 'react'
import { Box, Stack, Typography} from '@mui/material';
import { SideBar, Videos } from './';

import { fetchFromApi} from '../utils/fetchFromApi';

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
      fetchFromApi(`search?part=snippet&q=${selectedCategory}`).then((data) => setVideos(data.items));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row"}}}> 
      <Box sx={{ height: {sx: 'autp', md: '92vh'}, 
                  borderRight: '1px solid #3d3d3d', px: { sx: 0, md: 2}}}>
      <SideBar 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff'}}>
        Copyright 2023 YouTube 2.0 HZ
      </Typography>                
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2}}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white'}}>
          {selectedCategory}
          <span style={{color: '#F31503', marginLeft: '15px'}}>videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>

    </Stack>
  )
}

export default Feed