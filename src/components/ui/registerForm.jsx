import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api/";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioFiels";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    mail: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

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
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите свою профессию"
      }
    },
    licence: {
      isRequired: {
        message:
          "Необходимо принять условия пользования и согласиться на обработку персональных данных"
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
      <SelectField
        name="profession"
        onChange={handleChange}
        label="Профессия"
        value={data.profession}
        options={professions}
        defaultOption="Выбрать..."
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "мужчина", value: "male" },
          { name: "женщина", value: "female" },
          { name: "другое", value: "other" }
        ]}
        onChange={handleChange}
        name="sex"
        value={data.sex}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        onChange={handleChange}
        options={qualities}
        name="qualities"
        label="Выберите ваши качества"
        defaultValue={data.qualities}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Принимаю <a>условия пользования</a> и даю согласие на обработку
        персональных данных в соответствии с <a>политикой конфиденциальности</a>
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

export default RegisterForm;
