import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { loginUserAction } from "../../actions/actionCreators";

const SignIn = (props) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const submitHandler = (values, actions) => {
    props.sendRequest(values);
  };

  const renderError = () => {
    if (props.needAuthentication) {
      return <div className="error-auth">Пожалуйста, авторизуйтесь снова</div>;
    }

    if (props.error && props.error.response) {
      switch (props.error.response.status) {
        case 400:
          return <div className="error-401">Неверный логин или пароль</div>;
        case 404:
          return <div className="error-404">Ресурс не найден</div>;
        // другие случаи...
        default:
          return <div className="error-generic">Произошла ошибка</div>;
      }
    }
    return null;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {(formikProps) => (
        <Form>
          <Field name="email" placeholder="Type your email" />
          <Field name="password" placeholder="Type your pass" />
          {props.error && renderError()}
          <button type="submit">Send!</button>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ error, needAuthentication }) => ({
  error,
  needAuthentication,
});

const mapDispatchToProps = {
  sendRequest: loginUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
