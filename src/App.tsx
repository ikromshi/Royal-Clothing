import Spinner from "./components/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";
import {  lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; 
import { GlobalStyle } from "./global.styles";
import { useDispatch } from "react-redux";

const Authentication = lazy(() => import("./routes/authentication/authentication.component"));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const CheckOut = lazy(() => import("./routes/check-out/check-out.component"));
const Home = lazy(() => import("./routes/home/home.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [])

  return ( 
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
        <Routes>
          <Route path="/" element={<Navigation />} >
            <Route index element={<Home />} /> {/**Set the index to true to show Home on the default page without navigating to it */}
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<CheckOut />} />
          </Route>
        </Routes>
    </Suspense>
  );
};

export default App;