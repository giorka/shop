import Contacts from "../pages/Contacts/Contacts";
import Delivery from "../pages/Delivery/Delivery";
import Payment from "../pages/Payment/Payment";
import YourBrand from "../pages/YourBrand/YourBrand";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Cart from "../pages/Cart/Cart";
import Catalog from "../pages/Catalog/Catalog";
import CatalogIdPage from "../pages/CatalogIdPage/CatalogIdPage";
import Main from "../pages/Main/Main";
import Profile from "../pages/Profile/Profile";
import About from "../pages/About/About";

export const routes = [
    {path: "/contacts", component: <Contacts/>}, 
    {path: "/delivery", component: <Delivery/>}, 
    {path: "/payment", component: <Payment/>}, 
    {path: "/brand", component: <YourBrand/>}, 
    {path: "/cart", component: <Cart/>},
    {path: "/catalog", component: <Catalog/>},
    {path: "/catalog/:id", component: <CatalogIdPage/>},
    {path: "/profile", component: <Profile/>},
    {path: "/login", component: <Login/>},
    {path: "/error", component: <Error/>},
    {path: "/about", component: <About/>},
    {path: "/", component: <Main/>}
]
