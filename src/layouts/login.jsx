import React, { useState, useEffect } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
  const [data, setData] = useState({ mail: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    mail: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isMail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Проль должен содержать минимум 1 заглавную букву"
      },
      isContainNumber: {
        message: "Проль должен содержать минимум 1 цифру"
      },
      minLength: {
        message: "Проль должен содержать минимум 8 знаков",
        value: 8
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-5 shadow">
          <h3 className="mb-3">Войти</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              name="mail"
              type="text"
              label="Электронная почта"
              value={data.mail}
              onChange={handleChange}
              error={errors.mail}
            />

            <TextField
              name="password"
              type="password"
              label="Пароль"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
