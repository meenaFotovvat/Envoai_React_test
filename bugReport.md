Bug Report: 
1.	Counter behavior: 

    Bug Location: React component that uses a useEffect hook to update the counter state.
        useEffect(() => {
        setCounter(counter + 1)
        }, [counter])

    Expected Behavior: The counter should increase by 1 every second without triggering an infinite re-render or “update depth exceeded” error.

    Actual Behavior: The app throws this error:
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
    This occurs because useEffect depends on counter, and calling setCounter inside it causes a re-render — which re-triggers the effect infinitely.

    Fix Applied: Replaced the recursive state update with a persistent setInterval that runs independently of re-renders:
        useEffect(() => {
        const interval = setInterval(() => {
        setCounter(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
        }, []);

2.	Item removal:

    Bug Location: 
    const removeItem = id => {
    setItems(items.filter(item => item.id === id));
    };

    Expected Behavior: It should remove selected item by id.

    Actual Behavior: It remove other items and selected item should be last.

    Fix Applied: remove selected item by id.
    const removeItem = id => {
    setItems(items.filter(item => item.id !== id));
    };

3.  Item quantity updates: 

    Bug Location: { quantity: newQuantity } create a new object that haven't "id":

    const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => (item.id === id ? { quantity: newQuantity } : item)));
    };
    
    Expected Behavior: when click on quantity input only one item have changed.  

    Actual Behavior: All quantity inputs have been changed. console error: 
    Each child in a list should have a unique "key" prop.

    Fix Applied: use spreed operator that contain all items { ...item, quantity: newQuantity }
    const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    };

4. Discount application: 

    Bug Location: this calculation is wrong
    const applyDiscount = total => {
    return total + total * discount;
    };

    Expected Behavior: Must subtract the discount from the final price.

    Actual Behavior: total + total * discount

    Fix Applied:
    const applyDiscount = total => {
    return total - (total * discount / 100);
    };

5. Shopping cart total calculation: 

    Bug Location:
    total += items[i].price = items[i].quantity;

    Expected Behavior: 
    total += items[i].price * items[i].quantity;

    Actual Behavior: It is at the first "items[i].price = items[i].quantity" and we have only quantity and then sum all of them.
    total += items[i].price = items[i].quantity;

    Fix Applied: 
    total += items[i].price * items[i].quantity;

6. Login/Logout functionality:

    Bug Location:
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

    Expected Behavior: when you login need to see:
    <div>
        <p>✅ Welcome, {username}!</p>
        <button onClick={handleLogout}>Logout</button>
    </div>

    Actual Behavior: cant login

    Fix Applied: In this way when you login and logout states changed in the right way.
    const handleLogin = () => {
    if (username.length < 3) {
      alert('Username must be at least 3 characters');
      return;
    }
    setIsLoggedIn(true);
    };

    const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    };

