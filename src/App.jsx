import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import ContextProvider from "./Context/Context";

import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Forms from "./pages/Forms";
import Main from "./pages/Main";
import Home from "./Components/Home";
import Departments from "./Components/Departments";
import SingleDepartment from "./Components/SingleDepartment";
import SingleRoom from "./Components/SingleRoom";
import PDFViewer from "./pages/reportPDF";
import QRPdf from "./pages/QRPdf"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<SignIn />} />
        <Route path="details" element={<Forms />} />
        <Route path="pdf" element={<PDFViewer />} />

        <Route path="" element={<Main />}>
          <Route path="me" element={<Home />} />

          <Route path="departments" element={<Departments />} />
          <Route path="departments/:id" element={<SingleDepartment />} />
          <Route path="departments/:id/:id" element={<SingleRoom />} />
          <Route path="departments/:id/:id/qr" element={<QRPdf />} />
        </Route>
      </>
    )
  );

  return (
    <ContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ContextProvider>
  );
}

export default App;
