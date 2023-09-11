import { Button, TextField } from "@mui/material"
import styled from "styled-components";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";

const HomePage = () =>{

    const SearchWrapper = styled.div`
    margin-top: 53px;
    display: flex;
    justify-content: center;
    gap: 16px;
`;

const [searchData,setSearchData] = useState(null);
const [errTxt,setErrTxt] = useState("");
const [text,setText] = useState(null);

useEffect(() => {

  fetchSearchQueryApi("https://hn.algolia.com/api/v1/search?query="+text);
  
}, [text])

const fetchData = () =>{
    let searchdatavalue = document.getElementById("outlined-basic").value.trim();
     console.log(searchdatavalue);
   
    if(searchdatavalue === ""){
      document.getElementById("outlined-basic").focus();
      setErrTxt("Please enter keyword to search");
      return false;
    }else{
      setErrTxt("");
      setText(searchdatavalue);
    }
   
}

const fetchSearchQueryApi = async (url)=>{
  const response = await fetch(url)
  const fetchdata = await response.json();
  setSearchData(fetchdata.hits);
}

const openUrl = (url) =>{
  window.open(url,"_blank");
}

    return(
        <>
        <h1 style={{textAlign:"center",fontSize: "60px",color:"#1976d2"}}>Welcome to Hacker News</h1>
        <SearchWrapper>
        <div><TextField id="outlined-basic" label="Enter a text to search" variant="outlined" size="small" />
        <div style={{color:"red"}}>{errTxt}</div></div>
        <Button variant="contained" onClick={fetchData}>Search</Button>
        </SearchWrapper>
       {searchData && text && <h4 style={{textAlign:"center"}}>Please find the result for <span style={{color:"#f67a02"}}>"{text}"</span></h4>}
        <div style={{ padding: "100px",paddingTop:"40px"}}>
        {searchData && text && searchData.map((item,index) =>{
          return(
          <List key = {item.objectID} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} style={{display:"contents"}}>
          <ListItem alignItems="flex-start" onClick={()=>openUrl("/postdetails?key="+btoa(item.objectID)+"")} style={{ cursor:"pointer",border: "1.5px solid #1976d2",borderRadius: "10px",marginBottom: "15px"}}>
          <ListItemAvatar>
            <Avatar alt={item.title} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={item.title}
            secondary={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                   ~  {item.author}
                </Typography>
                <br></br>
                <a href={item.url} target="_blank"> URL link</a>
                <Button variant="outlined" style={{float:"right",color:"#f67a02"}} onClick={()=>openUrl("/postdetails?key="+btoa(item.objectID)+"")}>View Details</Button>
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        </List>
          )
        })}
        
        </div>
        
        </>
    )
}
export default HomePage;