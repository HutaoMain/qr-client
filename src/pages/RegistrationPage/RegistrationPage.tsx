import React, { useState } from "react";
import "./RegistrationPage.css";
import { registrationInterface } from "../../types/Types";
import axios from "axios";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const [registrationInfo, setRegistrationInfo] =
    useState<registrationInterface>({
      id: "",
      lastName: "",
      firstName: "",
      middleName: "",
      idNumber: "",
      course: "",
      yearLevel: "",
      email: "",
      password: "",
    });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setRegistrationInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        registrationInfo
      );
      toast("Successful Registration!", {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(registrationInfo);

  return (
    <div className="registration-container">
      <section className="registration-header">
        <h1>Register</h1>
        {/* <h3>Create your Account</h3> */}
      </section>
      <div className="registration-title">
        <h1>Please enter your details</h1>
      </div>
      <div className="registration-form">
        <form>
          <div className="registration-input-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={registrationInfo.lastName}
              onChange={onChangeHandler}
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={registrationInfo.firstName}
              onChange={onChangeHandler}
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="middleName">Middle name</label>
            <input
              type="text"
              name="middleName"
              placeholder="Enter your middle name"
              value={registrationInfo.middleName}
              onChange={onChangeHandler}
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="idNumber">ID Number</label>
            <input
              type="text"
              name="idNumber"
              placeholder="Enter your ID Number"
              value={registrationInfo.idNumber}
              onChange={onChangeHandler}
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="courses">Courses</label>
            <input
              type="text"
              name="course"
              placeholder="Enter your course"
              value={registrationInfo.course}
              onChange={onChangeHandler}
            />
            {/* <select id="courses" name="courses">
              <option value="">Select a course</option>
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="IS">Information Systems</option>
              <option value="SE">Software Engineering</option>
            </select> */}
          </div>
          <div className="registration-input-group">
            <label htmlFor="yearLevel">Year level</label>
            <select
              name="yearLevel"
              value={registrationInfo.yearLevel}
              onChange={onChangeHandler}
            >
              <option value="">Select a year level</option>
              <option value="1">First year</option>
              <option value="2">Second year</option>
              <option value="3">Third year</option>
              <option value="4">Fourth year</option>
              <option value="4">Fifth year</option>
            </select>
          </div>
          <div className="registration-input-group">
            <label htmlFor="password">Email</label>
            <input
              type="emal"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={registrationInfo.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="registration-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password name"
              value={registrationInfo.password}
              onChange={onChangeHandler}
            />
          </div>
          <div className="registration-button-group">
            <button type="submit" onClick={handleSubmit}>
              Register
            </button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
