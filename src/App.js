import ViewSubscribers from './Components/ViewSubscribers';
import Subscribe from './Components/Subscribe';
import LoginPage from './Components/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
   <>
     <BrowserRouter>
     <Routes>
       <Route path="/" element={<LoginPage/>} />
       <Route path="/view/subscribers" element={<ViewSubscribers/>} />
       <Route path="/subscribe" element={<Subscribe/>} />
     </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
