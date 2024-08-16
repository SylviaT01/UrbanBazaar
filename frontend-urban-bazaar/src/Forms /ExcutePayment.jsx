import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ExecutePayment() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("paymentId");
    const payerId = queryParams.get("PayerID");

    const executePayment = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/execute-payment?paymentId=${paymentId}&PayerID=${payerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) throw new Error("Payment execution failed");

        // Redirect or show success message
        navigate("/order-complete");
      } catch (error) {
        console.error("Error executing payment:", error);
        // Handle error
      }
    };

    if (paymentId && payerId) {
      executePayment();
    }
  }, [location.search, navigate]);

  return <div>Processing your payment...</div>;
}

export default ExecutePayment;
