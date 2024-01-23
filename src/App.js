import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterAndLogin from "./RegisterAndLogin";
import ForgotPassword from "./ForgotPassword";
import FirebaseFirestore from "./FirebaseFirestore";
import "./App.css"

function App(){
    return(
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="/" element={<RegisterAndLogin/>} />
                    <Route path="/firebase" element={<FirebaseFirestore/>} />
                    <Route path="/reset" element={<ForgotPassword/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App;
