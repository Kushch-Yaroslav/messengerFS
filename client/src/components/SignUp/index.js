import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { registerUserAction } from "../../actions/actionCreators";

const SignUp = (props) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    birthday: new Date(),
    email: "",
    password: "",
  };

  const submitHandler = (values, actions) => {
    props.sendRequest(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {(props) => (
        <Form>
          <Field name="firstName" placeholder="Type your name" />
          <Field name="lastName" placeholder="Type your lastName" />
          <Field name="birthday" type="date" placeholder="Type your pass" />
          <Field name="email" placeholder="Type your email" />
          <Field name="password" placeholder="Type your pass" />
          <button type="submit">Send!</button>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ error }) => ({ error });

const mapDispatchToProps = {
  sendRequest: registerUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
