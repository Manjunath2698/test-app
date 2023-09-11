import HomePage from "./Components/HomePage";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import PostDetailsPage from "./Components/PostDetailPage";

function App() {
  return (
   
    <BrowserRouter>
        <Routes>
          <Route path="/home" element={ <HomePage/>}/>
          <Route  path="/postdetails" element={ <PostDetailsPage/>}/>
        </Routes>
        </BrowserRouter>
  );
}

export default App;
