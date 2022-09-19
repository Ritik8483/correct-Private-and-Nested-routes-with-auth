import { Formik, Form } from "formik";
import React, { useEffect } from "react";
import InputField from "../../reuseable/InputField";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useLoginUsersMutation } from "../../rtkQueries/AuthApi";
import { toast } from "react-toastify";
import { Audio, ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { localStoreCredentials } from "../../slices/AuthSlice";

const initialValues = {
  email: "",
  password: "",
};

export interface LoginTypes {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerCreds = useSelector((state: any) => state.AuthSlice.name);
  const localRegisterCreds = localStorage?.getItem("user");
  console.log("registerCreds", registerCreds);

  const [
    loginUsers,
    {
      data: loginData,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      error: loginError,
      isError: loginIsError,
    },
  ] = useLoginUsersMutation();
  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(5).required("Password in required"),
  });
  const submitForm = async (values: LoginTypes) => {
    // e.currentTarget.disabled=true;
    console.log("values", values);
    try {
      await loginUsers(values);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (loginIsSuccess) {
      toast.success("User logged in successfully!");
      navigate("dashboard");
      dispatch(
        localStoreCredentials({
          name: loginData.result.name,
          token: loginData.token,
        })
      );
    }
  }, [loginIsSuccess]);

  useEffect(() => {
    if (loginIsError) {
      toast.error((loginError as any).data.message);
    }
  }, [loginIsError]);
  console.log("loginData", loginData, localRegisterCreds);

  // const handleClick=(e:any)=>{
  //   e.currentTarget.disabled=true;

  // }

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <h3>Login</h3>
        <p>
          {registerCreds
            ? `Hi ${registerCreds}! please enter you email and password`
            : "Please enter your email and password to continue."}{" "}
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={submitForm}
          validationSchema={validation}
        >
          {({
            handleSubmit,
            isSubmitting,
            handleChange,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <InputField
                name="email"
                type="text"
                placeholder="Enter your email address"
                label="Email Address"
                value={values.email}
                onChange={handleChange}
                errors={errors.email}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
                controlId="val01"
              />
              <InputField
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                errors={errors.password}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
                controlId="val02"
              />
              <div className="d-flex justify-content-center align-items-center ">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Login...' : 'Login'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-4 d-flex">
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("signup")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
