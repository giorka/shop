import Contacts from "../pages/Contacts/Contacts";
import Delivery from "../pages/Delivery/Delivery";
import Payment from "../pages/Payment/Payment";
import YourBrand from "../pages/YourBrand/YourBrand";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Cart from "../pages/Cart/Cart";
import Catalog from "../pages/Catalog/Catalog";
import CatalogIdPage from "../pages/CatalogIdPage/CatalogIdPage";

export const routes = [
    {path: "/login", component: <Login/>},
    {path: "/contacts", component: <Contacts/>}, 
    {path: "/delivery", component: <Delivery/>}, 
    {path: "/payment", component: <Payment/>}, 
    {path: "/brand", component: <YourBrand/>}, 
    {path: "/error", component: <Error/>}, 
    {path: "/cart", component: <Cart/>},
    {path: "/catalog", component: <Catalog/>},
    {path: "/catalog/:id", component: <CatalogIdPage/>},
]