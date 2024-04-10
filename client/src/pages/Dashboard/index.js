import React, { useEffect } from "react";
import DialogList from "../../components/DialogList";
import Chat from "../../components/Chat";
import MessageArea from "../../components/MessageArea";
import styles from "./Dashboard.module.css";
import history from "../../browserHistory";
import { connect } from "react-redux";
import { getUserDataAction } from "../../actions/actionCreators";

import MiddleHeader from "../../components/middleHeader";
const Dashboard = (props) => {
  useEffect(() => {
    if (!props.user) {
      if (localStorage.getItem("refreshToken")) {
        props.getUserData();
      } else {
        history.push("/");
      }
    }
  }, [props.user]);

  return (
    <main className={styles.main}>
      <DialogList />
      <section className={styles.container}>
        {props.currentChat && (
          <div className={styles.formUp}>
            <MiddleHeader />
          </div>
        )}

        <Chat />
        {props.currentChat && <MessageArea />}
      </section>
    </main>
  );
};

const mapStateToProps = ({ user, currentChat }) => ({ user, currentChat });

const mapDispatchToProps = {
  getUserData: getUserDataAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
