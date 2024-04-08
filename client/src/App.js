import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import history from "./browserHistory";
import Dashboard from "./pages/Dashboard";
import { connect } from "react-redux";

function App(props) {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messenger" element={<Dashboard />} />
      </Routes>
    </HistoryRouter>
  );
}

const mapStateToProps = ({ notification }) => ({ notification });

export default connect(mapStateToProps)(App);

/*
TODO:

1. LogOut button (кнопка розлогіну): почистити store (initialState) + очистка localStorage
2. Додати до чату нового мембера - участника
3. Зробити в компоненті Чат шапку з назвою чату і кількістю мемберів
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


  useEffect(() => {
    toast(props.notification, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, [props.notification]);



*/
