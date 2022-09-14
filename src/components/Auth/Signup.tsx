import React, { useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../../reuseable/InputField";
import { Button } from "react-bootstrap";
import { useRegisterUserMutation } from "../../rtkQueries/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { localStoreCredentials } from "../../slices/AuthSlice";

export interface SignupType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignupType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { data, isSuccess, isLoading, error, isError }] =
    useRegisterUserMutation();
  const validation = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirm password"),
  });
  const submitDetails = async (values: SignupType) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password must be same!");
    } else if (values) {
      try {
        await registerUser(values);
      } catch (error: any) {
        console.log("error", error);
      }
    }
    console.log("SignupTypeValues", values);
  };
  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully!");
      dispatch(
        localStoreCredentials({ name: data.result.name, token: data.token })
      );
      navigate("dashboard");
    }
  }, [isSuccess]);

  console.log("registerData", data);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100 w-100 min-vh-100">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <>
          <div className="d-flex my-4 flex-column justify-content-center align-items-center min-vh-100">
            <h3>Register</h3>
            <p>Please register your credentials to continue. </p>
            <Formik
              initialValues={initialValues}
              onSubmit={submitDetails}
              validationSchema={validation}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <InputField
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    errors={errors.firstName}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                    controlId="val03"
                  />
                  <InputField
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    errors={errors.lastName}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                    controlId="val04"
                  />
                  <InputField
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    errors={errors.email}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                    controlId="val05"
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
                    controlId="val06"
                  />
                  <InputField
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    errors={errors.confirmPassword}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={!!errors.confirmPassword}
                    controlId="val07"
                  />
                  <div className="d-flex justify-content-center align-items-center ">
                    <Button type="submit">Register</Button>
                  </div>
                  <div className="mt-4 d-flex">
                    <p>
                     Already have an account?{" "}
                      <span
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer", color: "blue" }}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
