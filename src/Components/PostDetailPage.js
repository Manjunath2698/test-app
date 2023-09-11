import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PostDetailsPage = () =>{

const url_string = window.location.href;
const url = new URL(url_string);
const urlKey = url.searchParams.get("key");
const urlid = atob(urlKey);

const [newsDetails,setNewsDetails] = useState(null);
useEffect(() => {

    fetchDetailsApi("http://hn.algolia.com/api/v1/items/"+urlid);
    
  }, [urlid])

const fetchDetailsApi = async (url)=>{
    const response = await fetch(url)
    const fetchdata = await response.json();
    console.log(fetchdata);
    setNewsDetails(fetchdata);
  }


return(
  <Box sx={{ width: '100%',      minHeight: "600px",  maxWidth: "1240px", padding: "100px",backgroundColor: "rgb(25, 118, 210)",color: "white"}}>
      { newsDetails && <Typography variant="h2" gutterBottom>
        {newsDetails ? newsDetails.title : "Title : Not found"}
      </Typography>}

     { newsDetails && <Typography variant="h4" gutterBottom>
      Points : {newsDetails ? newsDetails.points : "Not found"}
      </Typography>}

      {newsDetails  && <Typography variant="h4" gutterBottom>
      List of all comments : 
      {}
      </Typography>}

      <Typography variant="h5" gutterBottom>
     
        <ul>
          {newsDetails && newsDetails.children && newsDetails.children.map((item,index)=>{
                  return(item.text && <div key={item.id}><li >{ item.text.replaceAll("<p>","").replaceAll("</p>","")}
                  </li>
                  {item && item.children.map((nitem,nindex)=>{

                            return(nitem.text && <div key={nitem.id}><li >{  nitem.text.replaceAll("<p>","").replaceAll("</p>","")}</li>
                            {nitem && nitem.children.map((kitem,nindex)=>{

                                return(kitem.text && <div key={kitem.id}><li >{  kitem.text.replaceAll("<p>","").replaceAll("</p>","")}</li>


                                </div>);
                                })}
                                                            
                            </div>);
                            })}</div>
                  );         
                  
          }) }
</ul>
</Typography>
{!newsDetails &&<Typography variant="h4" gutterBottom>
Loading Data, Please wait...
      </Typography>}
    </Box>
)
}

export default PostDetailsPage;