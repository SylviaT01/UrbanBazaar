import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqsData = [
  {
    question: "How do I create an account?",
    answer: "To create an account, click on the 'Login' button on the top-right corner of the page and then select 'Sign up'. You will be redirected to the login page."
  },
  {
    question: "How do I reset my password?",
    answer: "If you’ve forgotten your password, go to the 'Login' page and click on 'Forgot Password.' Enter your registered email address, and you will receive instructions to reset your password."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We currently accept only Pesapal for payments."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with a tracking number and a link to track your shipment. You can also check your order status in your account under 'Order History.'"
  },
  {
    question: "Can I return or exchange an item?",
    answer: "Yes, you can return or exchange items within 30 days of receipt. Please visit our 'Delivery & Returns' page for detailed instructions on how to initiate a return or exchange."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can contact our customer support team through the 'Get in Touch' page on our website. We are available via email at urbanbazaar583@gmail.com or by phone at +254712345678."
  },
  {
    question: "How do I update my account information?",
    answer: "To update your account information, log in to your account, click on My Account icon at the top right of your screen and go to 'Update Profile' From there, you can update your personal details, shipping address, and payment methods."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we offer shipping within the country. International shipping is not available at this time, but we are working on expanding our shipping options in the future."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container px-4 py-8 max-w-sm mx-auto md:max-w-none gap-4 mb-8 w-full">
      <h1 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqsData.map((faq, index) => (
          <div key={index} className="bg-white border border-gray-300 rounded-md shadow-sm">
            <button
              className="w-full px-4 py-2 text-left flex items-center justify-between bg-gray-100 border-b border-gray-300 rounded-t-md focus:outline-none"
              onClick={() => toggleAnswer(index)}
            >
              <span className="font-semibold text-gray-700">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
