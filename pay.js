 // JavaScript to handle showing and hiding of payment options
 document.querySelectorAll('input[name="payment-method"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        var value = event.target.value;
        document.getElementById("bank-options").style.display = (value === "bank-transfer") ? "block" : "none";
        document.getElementById("e-wallet-options").style.display = (value === "e-wallet") ? "block" : "none";
    });
});

// JavaScript to handle loading of order data and form submission
document.addEventListener('DOMContentLoaded', () => {
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    
    if (!orderData) {
        alert('No order data found. Please complete the checkout process first.');
        window.location.href = 'hcww.html';
        return;
    }
  
    document.getElementById('customer-name').textContent = orderData.name;
    document.getElementById('customer-address').textContent = orderData.address;
    document.getElementById('customer-phone').textContent = orderData.phone;
    document.getElementById('order-total').textContent = orderData.total;
  
    const orderItemsList = document.getElementById('order-items');
    orderData.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.product} - Quantity: ${item.quantity}`;
        orderItemsList.appendChild(listItem);
    });
  
    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect payment method
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const paymentData = { method: paymentMethod };

        // Collect bank or e-wallet data based on the selected payment method
        if (paymentMethod === 'bank-transfer') {
            const bank = document.querySelector('input[name="bank"]:checked').value;
            paymentData.bank = bank;
        } else if (paymentMethod === 'e-wallet') {
            const eWallet = document.querySelector('input[name="e-wallet"]:checked').value;
            paymentData.eWallet = eWallet;
        }

        console.log('Payment Data:', paymentData);
        alert(`Order confirmed! Payment method: ${paymentMethod}`);

        localStorage.removeItem('orderData');
        window.location.href = 'hcww.html';
    });
});