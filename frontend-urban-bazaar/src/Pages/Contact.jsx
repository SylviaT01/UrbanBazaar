import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import shelf from "../assets/shelf.jpg";
import emailIcon from "../assets/emailIcon.svg";
import phoneIcon from "../assets/phoneIcon.svg";
import locationIcon from "../assets/locationIcon.svg";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .required("Phone number is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      resetForm();
      setIsSubmitted(true);
      setNotification(
        "Your message has been submitted successfully. Our team will get back to you shortly!"
      );

      // Delay navigation to allow time for the notification to show
      setTimeout(() => {
        navigate("/");
      }, 3500);
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-screen-lg bg-contactBlue shadow-md rounded-md overflow-hidden mb-8">
        <div className="md:flex">
          {/* Contact Form */}
          <div className="w-full md:w-1/2 p-8 bg-[#DAEFFA]">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              We'd love to hear from you!
            </h1>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Get in Touch
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Enter your name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Enter your email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {/* Phone Number Component */}
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Enter your phone number
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Your phone number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Enter your message
                    </label>
                    <Field
                      id="message"
                      name="message"
                      as="textarea"
                      placeholder="Your message"
                      rows="4"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-300 hover:bg-blue-400 text-Black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {/* Success message */}
            {isSubmitted && (
              <p className="text-green-600 mt-4">Submitted successfully ✅</p>
            )}
          </div>
          {/* Contact Information */}

          <div
            className="w-full md:w-1/2 p-8 bg-gray-50 rounded opacity-70"
            style={{
              backgroundImage: `url(${shelf})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div />

            <div className="flex flex-col gap-10">
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  RETURN ADDRESS FOR ONLINE ORDERS
                </h3>

                <p className="flex items-centre gap-2">
                  <img src={locationIcon} alt="locationIcon" />
                  Bilha Towers Ground Floor, Shop Number 45KE
                </p>

                <p className="flex items-centre gap-2">
                  <img src={locationIcon} alt="locationIcon" />
                  Postal Address P.O. Box 1852-00621, Village Market Nairobi,
                  Kenya
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Phone Number
                </h3>
                <p className="text-blue-600 underline underline-offset-2 flex flex-row gap-2">
                  <img src={phoneIcon} alt="phoneIcon" />
                  +254 712 345 678
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Email Address
                </h3>

                <p className="text-blue-600 underline underline-offset-2 flex items-center gap-2">
                  <img src={emailIcon} alt="emailIcon" />
                  urbanbazaar583@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center bg-green-500 text-white p-4 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Contact;
