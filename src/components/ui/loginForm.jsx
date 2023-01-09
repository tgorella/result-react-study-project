import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
// import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({ mail: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
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

  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      .matches(
        /^(?=.*[A-Z])/,
        "Проль должен содержать минимум 1 заглавную букву"
      )
      .matches(/(?=.*[0-9])/, "Проль должен содержать минимум 1 цифру")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Пароль должен содержать один из спец. символов !@#$%^&* "
      )
      .matches(/(?=.{8,})/, "Проль должен содержать минимум 8 знаков"),
    mail: yup
      .string()
      .required("Электронная почта обязательна для заполнения")
      .email("Email введен некорректно")
  });
  // const validatorConfig = {
  //   mail: {
  //     isRequired: {
  //       message: "Электронная почта обязательна для заполнения"
  //     },
  //     isMail: {
  //       message: "Email введен некорректно"
  //     }
  //   },
  //   password: {
  //     isRequired: {
  //       message: "Пароль обязателен для заполнения"
  //     },
  //     isCapitalSymbol: {
  //       message: "Проль должен содержать минимум 1 заглавную букву"
  //     },
  //     isContainNumber: {
  //       message: "Проль должен содержать минимум 1 цифру"
  //     },
  //     minLength: {
  //       message: "Проль должен содержать минимум 8 знаков",
  //       value: 8
  //     }
  //   }
  // };

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  return (
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
