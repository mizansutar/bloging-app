import React from 'react';
import BannerPage from '../Banner/banner';
import Categ from './catgori';
import { Grid } from '@mui/material';
import Post from "./Post_show"
const HomePage = () => {
  return (
    <>
      <BannerPage />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12} >
          <Categ />
        </Grid>
        <Grid item lg={10} sm={10} xs={12}>
          {/* Add other components or content here */}
         <div style={{display:'flex'}}><Post/> </div>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;