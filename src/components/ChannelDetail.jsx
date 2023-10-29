import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Videos, ChannelCard } from './'
import { fetchFromApi } from "../utils/fetchFromApi";
import { Box } from "@mui/material";

const ChannelDetail = () => {
    const [ channelDetail, setChannelDetail] = useState(null)
    const [ videos, setVideos] = useState([])

    const { id } = useParams();

    useEffect(() => {
      fetchFromApi(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

      fetchFromApi(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
    }, [id]);

    return(
      <Box minHeight="95vh">
        <Box>
          <div style={{
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(206,3,184,1) 35%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
            height: '300px'
          }}/>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <ChannelCard channelDetail={channelDetail} marginTop="-93px"/>
          </Box>
          <Box display="flex" p="2">
            <Box sx={{ mr: { sm: '100px'}}} /> 
              <Videos videos={videos} />
          </Box>
        </Box>
      </Box>
    )
  
}

export default ChannelDetail