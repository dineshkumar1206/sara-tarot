import React, { useState } from 'react';

export default function Checkout({ cartItems = [], setCartItems, setCurrentView }) {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'qr'
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const itemsTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const handlingCharge = cartItems.length > 0 ? 4 : 0;
  const deliveryFee = cartItems.length > 0 ? 29 : 0;
  const grandTotal = itemsTotalAmount + handlingCharge + deliveryFee;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway loading
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCartItems([]); // Clear cart upon successful payment
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div 
        style={{
          backgroundColor: '#0f0c1b',
          minHeight: '85vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#f3f0ea',
          fontFamily: "'Inter', sans-serif",
          padding: '2rem'
        }}
      >
        <div 
          style={{
            backgroundColor: '#130f24',
            border: '1px solid rgba(223, 186, 107, 0.3)',
            borderRadius: '8px',
            padding: '3rem 2rem',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 15px 30px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ fontSize: '4rem', color: '#dfba6b', marginBottom: '1.5rem' }}>✓</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '400', color: '#dfba6b', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Pooja Booked Successfully
          </h2>
          <p style={{ color: 'rgba(243, 240, 234, 0.7)', fontSize: '15px', lineHeight: '1.6', marginBottom: '2rem' }}>
            Thank you for booking with Saraa Tarot. Your sacred ritual has been scheduled. An email confirmation has been sent with further instructions regarding Sankalpam collection and Prasadham shipment.
          </p>
          <button 
            onClick={() => setCurrentView({ page: 'list', serviceId: null })}
            style={{
              backgroundColor: '#dfba6b',
              color: '#0f0c1b',
              border: 'none',
              padding: '0.9rem 2rem',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{
        backgroundColor: '#0f0c1b',
        minHeight: '90vh',
        color: '#f3f0ea',
        fontFamily: "'Inter', sans-serif",
        padding: '3rem 2rem'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Navigation link */}
        <button 
          onClick={() => setCurrentView({ page: 'list', serviceId: null })}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#dfba6b',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '2rem',
            padding: 0
          }}
        >
          ➔ Back to Services
        </button>

        <h1 style={{ color: '#dfba6b', fontSize: '2.2rem', fontWeight: '300', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '2.5rem' }}>
          Secure Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start', flexWrap: 'wrap' }}>
          
          {/* LEFT COLUMN: Payment Methods */}
          <div 
            style={{
              backgroundColor: '#130f24',
              border: '1px solid rgba(223, 186, 107, 0.15)',
              borderRadius: '6px',
              padding: '2.5rem',
              boxSizing: 'border-box'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '1.5rem', color: '#dfba6b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Select Payment Method
            </h3>

            {/* Selector Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button 
                onClick={() => setPaymentMethod('upi')}
                style={{
                  flex: 1,
                  padding: '1rem 0.5rem',
                  backgroundColor: paymentMethod === 'upi' ? 'rgba(223, 186, 107, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  color: paymentMethod === 'upi' ? '#dfba6b' : '#a09ba2',
                  border: paymentMethod === 'upi' ? '1px solid #dfba6b' : '1px solid rgba(223, 186, 107, 0.15)',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                UPI ID
              </button>
              <button 
                onClick={() => setPaymentMethod('qr')}
                style={{
                  flex: 1,
                  padding: '1rem 0.5rem',
                  backgroundColor: paymentMethod === 'qr' ? 'rgba(223, 186, 107, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  color: paymentMethod === 'qr' ? '#dfba6b' : '#a09ba2',
                  border: paymentMethod === 'qr' ? '1px solid #dfba6b' : '1px solid rgba(223, 186, 107, 0.15)',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Scan QR Code
              </button>
              <button 
                onClick={() => setPaymentMethod('card')}
                style={{
                  flex: 1,
                  padding: '1rem 0.5rem',
                  backgroundColor: paymentMethod === 'card' ? 'rgba(223, 186, 107, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  color: paymentMethod === 'card' ? '#dfba6b' : '#a09ba2',
                  border: paymentMethod === 'card' ? '1px solid #dfba6b' : '1px solid rgba(223, 186, 107, 0.15)',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Debit / Credit Card
              </button>
            </div>

            <form onSubmit={handlePay}>
              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#a09ba2', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Enter Virtual Payment Address (VPA) / UPI ID
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. username@upi" 
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1rem',
                      backgroundColor: '#0c0917',
                      border: '1px solid rgba(223, 186, 107, 0.25)',
                      borderRadius: '4px',
                      color: '#f3f0ea',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      marginBottom: '2rem'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: 'rgba(243, 240, 234, 0.5)', lineHeight: '1.5', marginTop: '-1rem', marginBottom: '2rem' }}>
                    We support Google Pay, PhonePe, Paytm, BHIM UPI, and all major bank UPI apps.
                  </p>
                </div>
              )}

              {/* QR Code Screen */}
              {paymentMethod === 'qr' && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <p style={{ fontSize: '13px', color: '#a09ba2', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Scan QR code with your UPI App to make payment
                  </p>
                  <div 
                    style={{ 
                      width: '180px', 
                      height: '180px', 
                      margin: '0 auto 1.5rem auto', 
                      backgroundColor: '#fff', 
                      borderRadius: '4px',
                      padding: '10px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {/* Simulated elegant QR code visual */}
                    <img 
                      src="/qr-code-placeholder.png" 
                      alt="Payment QR Code" 
                      onError={(e) => {
                        // Fallback SVG QR placeholder if file is missing
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `
                          <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="#000" strokeWidth="2.5">
                            <rect x="5" y="5" width="25" height="25" />
                            <rect x="12" y="12" width="11" height="11" fill="#000" />
                            <rect x="70" y="5" width="25" height="25" />
                            <rect x="77" y="12" width="11" height="11" fill="#000" />
                            <rect x="5" y="70" width="25" height="25" />
                            <rect x="12" y="77" width="11" height="11" fill="#000" />
                            <path d="M40 10h10v10H40zm10 20h10v10H50zm10-10h10v10H60zm-20 20h10v10H40zm20 10h10v10H60zM40 70h10v10H40zm10 10h10v10H50zm30-20h10v10H80zm0 20h10v10H80z" fill="#000" />
                          </svg>
                        `;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ color: '#dfba6b', fontWeight: '600', fontSize: '15px' }}>
                    Pay to: saraatarot@upi
                  </div>
                </div>
              )}

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#a09ba2', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Cardholder Name
                    </label>
                    <input 
                      type="text" 
                      required={paymentMethod === 'card'}
                      placeholder="Full Name as on Card" 
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#0c0917',
                        border: '1px solid rgba(223, 186, 107, 0.25)',
                        borderRadius: '4px',
                        color: '#f3f0ea',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#a09ba2', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Card Number
                    </label>
                    <input 
                      type="text" 
                      maxLength="19"
                      required={paymentMethod === 'card'}
                      placeholder="0000 0000 0000 0000" 
                      value={cardDetails.number}
                      onChange={(e) => {
                        // format card input
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setCardDetails({ ...cardDetails, number: val });
                      }}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        backgroundColor: '#0c0917',
                        border: '1px solid rgba(223, 186, 107, 0.25)',
                        borderRadius: '4px',
                        color: '#f3f0ea',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#a09ba2', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Expiry Date
                      </label>
                      <input 
                        type="text" 
                        maxLength="5"
                        required={paymentMethod === 'card'}
                        placeholder="MM/YY" 
                        value={cardDetails.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 2) {
                            val = val.substring(0, 2) + '/' + val.substring(2, 4);
                          }
                          setCardDetails({ ...cardDetails, expiry: val });
                        }}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          backgroundColor: '#0c0917',
                          border: '1px solid rgba(223, 186, 107, 0.25)',
                          borderRadius: '4px',
                          color: '#f3f0ea',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#a09ba2', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        CVV / CVC
                      </label>
                      <input 
                        type="password" 
                        maxLength="4"
                        required={paymentMethod === 'card'}
                        placeholder="•••" 
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          backgroundColor: '#0c0917',
                          border: '1px solid rgba(223, 186, 107, 0.25)',
                          borderRadius: '4px',
                          color: '#f3f0ea',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Pay Action Button */}
              <button 
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                style={{
                  width: '100%',
                  backgroundColor: '#dfba6b',
                  color: '#0f0c1b',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '1.1rem',
                  fontSize: '15px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: isProcessing || cartItems.length === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: isProcessing || cartItems.length === 0 ? 0.6 : 1,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing && cartItems.length > 0) e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  if (!isProcessing && cartItems.length > 0) e.currentTarget.style.opacity = '1';
                }}
              >
                {isProcessing ? 'Processing Transaction...' : `Pay ₹${grandTotal.toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div 
            style={{
              backgroundColor: '#130f24',
              border: '1px solid rgba(223, 186, 107, 0.15)',
              borderRadius: '6px',
              padding: '2.5rem',
              boxSizing: 'border-box'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '1.5rem', color: '#dfba6b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Order Summary
            </h3>

            {/* Cart Items List */}
            <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <p style={{ color: '#a09ba2', fontSize: '14px' }}>No items in checkout.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(223, 186, 107, 0.1)' }} 
                      />
                      <div>
                        <h4 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '500', color: '#f3f0ea' }}>{item.name}</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#a09ba2' }}>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#dfba6b' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Bill Details */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(223, 186, 107, 0.15)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span style={{ color: '#a09ba2' }}>Items Total</span>
                  <span>₹{itemsTotalAmount.toLocaleString('en-IN')}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span style={{ color: '#a09ba2' }}>Handling Charge</span>
                  <span>₹{handlingCharge}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '1.25rem' }}>
                  <span style={{ color: '#a09ba2' }}>Booking/Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    borderTop: '1px dashed rgba(223, 186, 107, 0.2)', 
                    paddingTop: '1rem', 
                    color: '#dfba6b' 
                  }}
                >
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
