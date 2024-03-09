import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/WooCommerceComponent.module.css';

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
    <div className={styles.container}>
      {responseData.success ? (
        <div>
          <h1 className={styles.title}>Products</h1>
          <ul>
            {responseData.products.map(product => (
              <li key={product.id} className={styles.product}>
                <div>
                  <p>ID: {product.id}</p>
                  <p>Description: {product.description}</p>
                  <p>Price: {product.price}</p>
                
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{responseData.error || 'Loading...'}</p>
      )}
    </div>
  );
};

export default WooCommerceComponent;
