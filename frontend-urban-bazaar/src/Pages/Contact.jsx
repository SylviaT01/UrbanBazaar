import React, {  useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { UserContext } from "./context/userContext";
import { useNavigate } from "react-router-dom";
import shelf from '../assets/shelf.jpg';

//import email from "../assets/email.svg"
//import Footer from "./footer";

const Contact = () => {
  //const { currentUser, authToken } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  //console.log(currentUser);

  const initialValues = {
   //name: currentUser.name,
   //email: currentUser.email,
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
      const response = await fetch("https://medimart-1.onrender.com/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${authToken}`,
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
      navigate("/home");
      alert("Submitted successfully");
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
              We'd love to here from you!
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
                      className="bg-submitBlue hover:bg-submitBlue text-Black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
          
          <div className="w-full md:w-1/2 p-8 bg-gray-50 rounded opacity-70"style={{
            backgroundImage: `url(${shelf})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            
            }}><div/>
        
            <div className="flex flex-col gap-10">
              <div>
                <h3 className="font-bold text-lg text-gray-800">RETURN ADDRESS FOR ONLINE ORDERS</h3>


                <p>
                <span class="icon-[fluent--location-16-filled]"  style={{width: '20px', height: '20px' ,color: '#7DC8EF' }}></span> Bilha Towers Ground Floor, Shop Number 45KE
                </p>


                <p >
                <span class="icon-[fluent--location-16-filled]"  style={{width: '28px', height: '28px' ,color: '#7DC8EF' }}></span>Postal Address P.O. Box 1852-00621, Village Market Nairobi, Kenya
                </p>


              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                 Phone Number
                </h3>
                <p className="text-blue-600 underline underline-offset-2">
                <span class="icon-[fluent--call-add-20-filled]"  style={{ width: '28px', height: '28px',color: '#7DC8EF' }}></span>+254 712 345 678
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Email Address
                </h3>
                
                <p className="text-blue-600 underline underline-offset-2">
                <span class="icon-[marketeq--email-open]"style={{ width: '28px', height: '28px'}}></span> urbanbazaar@gmail.com
                </p> 
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Contact;
