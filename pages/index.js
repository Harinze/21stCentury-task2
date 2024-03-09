import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WooCommerceComponent = () => {
  const [responseData, setResponseData] = useState({
    success: false,
    products: [],
    error: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/get-products');
        setResponseData(response.data);
      } catch (error) {
        setResponseData(prevState => ({
          ...prevState,
          error: error.message
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {responseData.success ? (
        <div>
          <h1>Products</h1>
          <ul>
            {responseData.products.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{responseData.error || 'Loading...'}</p>
      )}
    </div>
  );
};


