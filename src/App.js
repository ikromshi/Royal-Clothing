import { onAuthStateChangedListener, createUserDocFromAuth, getCurrentUser } from "./utils/firebase/firebase.utils";
import Authentication from "./routes/authentication/authentication.component";
import Navigation from "./routes/navigation/navigation.component";
import CheckOut from "./routes/check-out/check-out.component";
import { Routes, Route } from "react-router-dom"; 
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import { useDispatch } from "react-redux";
import {  useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then(user => console.log(user));
  }, [])

  return ( 
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} /> {/**Set the index to true to show Home on the default page without navigating to it */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;