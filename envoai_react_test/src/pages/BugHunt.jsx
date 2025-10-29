import { useState, useEffect } from 'react';
import './BugHunt.css';

function BugHunt() {
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 20, quantity: 2 },
    { id: 3, name: 'Item 3', price: 15, quantity: 1 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const interval = setInterval(() => {
    setCounter(prev => prev + 1);
  }, 1000);

  return () => clearInterval(interval);
}, []);

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
    }
    return total;
  };

  const applyDiscount = total => {
    return total - (total * discount / 100);
  };

  const handleLogin = () => {
    if (username.length < 3) {
      alert('Username must be at least 3 characters');
      return;
    }
    setIsLoggedIn(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(true);
    setUsername('');
  };

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeItem = id => {
    setItems(items.filter(item => item.id !== id));
  };


  const total = calculateTotal();
  const finalTotal = applyDiscount(total);



  return (
    <div className="page-container">
      <h2 className="page-title">Challenge 2: Bug Hunt</h2>

      <div className="instructions">
        <h3>Your Task:</h3>
        <ul>
          <li>
            This page contains <strong>6 logical bugs</strong> that need to be fixed
          </li>
          <li>The bugs are in the component logic, not in styling</li>
          <li>Test all features to identify what&apos;s not working correctly:</li>
          <ul>
            <li>Counter behavior</li>
            <li>Shopping cart total calculation</li>
            <li>Discount application</li>
            <li>Login/Logout functionality</li>
            <li>Item quantity updates</li>
            <li>Item removal</li>
          </ul>
          <li>Document each bug you find and how you fixed it</li>
        </ul>
      </div>

      <div className="bug-hunt-content">
        {/* Counter Section */}
        <div className="section">
          <h3>Counter Feature</h3>
          <p>Counter: {counter}</p>
          <p className="hint">⚠️ Check the browser console and watch the counter behavior</p>
        </div>

        {/* Login Section */}
        <div className="section">
          <h3>User Login</h3>
          {isLoggedIn ? (
            <div>
              <p>✅ Welcome, {username}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <p>❌ Please log in</p>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
          <p className="hint">Try logging in with a username (3+ chars)</p>
        </div>

        {/* Shopping Cart Section */}
        <div className="section">
          <h3>Shopping Cart</h3>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      min="0"
                      style={{ width: '60px' }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeItem(item.id)} className="remove-btn">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="discount-input">
              <label>Discount (%):</label>
              <input
                type="number"
                value={discount}
                onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                style={{ width: '80px' }}
              />
            </div>

            <div className="total-row final">
              <span>Final Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <p className="hint">Try: updating quantities, removing items, and applying a discount</p>
        </div>
      </div>

      <div className="bug-documentation">
        <h3>📝 Bug Report Template</h3>
        <p>Document your findings:</p>
        <ol>
          <li>
            <strong>Bug Location:</strong> Where is the bug?
          </li>
          <li>
            <strong>Expected Behavior:</strong> What should happen?
          </li>
          <li>
            <strong>Actual Behavior:</strong> What actually happens?
          </li>
          <li>
            <strong>Fix Applied:</strong> How did you fix it?
          </li>
        </ol>
      </div>
    </div>
  );
}

export default BugHunt;
