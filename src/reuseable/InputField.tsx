import React from "react";
import { Form } from "react-bootstrap";

const InputField = ({ ...rest }: any) => {
  const {
    name,
    type,
    placeholder,
    label,
    value,
    onChange,
    isValid,
    errors,
    isInvalid,
    controlId,
  } = rest;

  return (
    <div>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          isValid={isValid}
          placeholder={placeholder}
          isInvalid={isInvalid}
        />
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default InputField;
