import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Sing from "../pages/Sing";
import Singup from "../pages/Singup";
import Herosingup from "../pages/Herosingup";


    const  router = createBrowserRouter([
        {
          path: "/",
          element: <MainLayout></MainLayout>,
          children: [
            {
                path: "/",
                element: <Home></Home>,  
            },

            {
                path: "/singin",
                element:<Sing></Sing>,  
            },
            {
                path: "/singup",
                element:<Singup></Singup>,  
            },
            {
                path: "/herosingup",
                element:<Herosingup></Herosingup>,  
            },

          ]
        },
      ]);


export default router;