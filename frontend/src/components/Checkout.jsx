import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configure merchant payment details
const WHATSAPP_PHONE = '919999999999'; // WhatsApp number with country code (e.g., 91 for India, no spaces or +)
const MERCHANT_UPI_ID = '50100234981123@hdfcbank'; // HDFC current account UPI ID
const MERCHANT_NAME = 'SARAA TAROT SERVICES';

export default function Checkout({ cartItems = [], setCartItems }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('qr'); // Only 'qr' is active per request
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Store order details snapshot before clearing cart on payment success
  const [lastOrderDetails, setLastOrderDetails] = useState({ items: [], total: 0 });

  const itemsTotalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = itemsTotalAmount;

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Generate the dynamic UPI URL and QR Code image link
  const upiLink = `upi://pay?pa=${MERCHANT_UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${grandTotal}&cu=INR`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  const handlePay = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    
    // Save snapshot of order before clearing cart
    setLastOrderDetails({
      items: cartItems.map(item => `${item.name} (Qty: ${item.quantity})`),
      total: grandTotal
    });
    
    // Simulate payment gateway loading
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCartItems([]); // Clear cart upon successful payment
    }, 2000);
  };

  if (isSuccess) {
    const orderItemsText = lastOrderDetails.items.join(', ');
    const messageText = `Hi Saraa Tarot, I have placed an order for: ${orderItemsText}. Total Amount: ₹${lastOrderDetails.total.toLocaleString('en-IN')}. Please confirm my booking.`;
    const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(messageText)}`;

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
            boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ fontSize: '4.5rem', color: '#dfba6b', marginBottom: '1rem' }}>✓</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '400', color: '#dfba6b', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Booking Received
          </h2>
          <p style={{ color: 'rgba(243, 240, 234, 0.85)', fontSize: '15px', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Your booking request has been registered. Please send the payment confirmation screenshot on WhatsApp or message to activate your ritual sankalpam.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#25D366',
                color: '#fff',
                border: 'none',
                padding: '1.1rem 2rem',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textDecoration: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'opacity 0.2s',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.414 9.866-9.843.002-2.63-1.023-5.101-2.886-6.968C16.383 1.928 13.911.906 11.282.906c-5.442 0-9.873 4.414-9.877 9.846 0 1.635.489 3.223 1.411 4.61l-.995 3.635 3.731-.977zm11.367-5.463c-.305-.153-1.802-.889-2.08-.99-.278-.101-.48-.153-.68.153-.2.305-.778 1.01-.954 1.21-.176.2-.353.228-.658.076-.305-.153-1.286-.474-2.45-1.512-.906-.809-1.517-1.809-1.695-2.114-.177-.305-.019-.47.133-.621.137-.136.305-.356.458-.533.152-.178.203-.305.305-.508.102-.203.051-.381-.025-.533-.076-.153-.68-1.639-.933-2.247-.246-.593-.497-.513-.68-.522-.176-.008-.378-.01-.58-.01-.202 0-.531.076-.809.381-.278.305-1.062 1.037-1.062 2.531 0 1.493 1.088 2.935 1.238 3.138.15.203 2.14 3.267 5.185 4.578.725.312 1.29.499 1.732.64.73.232 1.393.197 1.917.12.584-.087 1.802-.736 2.057-1.448.255-.713.255-1.323.179-1.448-.076-.125-.278-.203-.584-.356z"/>
              </svg>
              Confirm on WhatsApp
            </a>
            
            <button 
              onClick={() => navigate('/')}
              style={{
                backgroundColor: 'transparent',
                color: '#dfba6b',
                border: '1px solid rgba(223, 186, 107, 0.4)',
                padding: '1rem',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                borderRadius: '4px',
                width: '100%',
                boxSizing: 'border-box',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(223, 186, 107, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Back to Services
            </button>
          </div>
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
      <style>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Navigation link */}
        <button 
          onClick={() => navigate('/')}
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

        <div className="checkout-grid">
          
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

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <button 
                type="button"
                onClick={() => setPaymentMethod('qr')}
                style={{
                  flex: '1 1 100px',
                  padding: '0.8rem 0.5rem',
                  backgroundColor: 'rgba(223, 186, 107, 0.15)',
                  color: '#dfba6b',
                  border: '1px solid #dfba6b',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontWeight: '600',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                QR Code
              </button>
            </div>

            <form onSubmit={handlePay}>
              {/* QR Code Screen */}
              {paymentMethod === 'qr' && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <p style={{ fontSize: '13px', color: '#a09ba2', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Scan QR code with your UPI App to make payment
                  </p>
                  <div 
                    style={{ 
                      width: '200px', 
                      height: '200px', 
                      margin: '0 auto 1.5rem auto', 
                      backgroundColor: '#fff', 
                      borderRadius: '8px',
                      padding: '12px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    {cartItems.length > 0 ? (
                      <img 
                        src={qrImageUrl} 
                        alt="Payment QR Code" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <div style={{ color: '#0f0c1b', fontSize: '12px', fontWeight: '600' }}>No active balance</div>
                    )}
                  </div>
                  <div style={{ color: '#dfba6b', fontWeight: '600', fontSize: '15px' }}>
                    Pay to: {MERCHANT_NAME}
                  </div>
                  <p style={{ fontSize: '11px', color: 'rgba(243, 240, 234, 0.5)', marginTop: '8px' }}>
                    Your payment will settle directly into our linked bank account.
                  </p>
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
                {isProcessing 
                  ? 'Processing...' 
                  : `I Have Paid ₹${grandTotal.toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Updated Order Summary without Increment/Decrement controls */}
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

            {/* Cart Items Interactive List */}
            <div style={{ maxHeight: '320px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '4px' }}>
              {cartItems.length === 0 ? (
                <p style={{ color: '#a09ba2', fontSize: '14px', textAlign: 'center', padding: '2rem 0' }}>No items in checkout.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img 
                        src={item.image || "/placeholder-item.jpg"} 
                        alt={item.name} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(223, 186, 107, 0.1)' }} 
                      />
                      
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '500', color: '#f3f0ea' }}>{item.name}</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#dfba6b', fontWeight: '600' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Left alone with explicit trash target handler invocation */}
                    <button 
                      type="button" 
                      onClick={() => removeItem(item.id)}
                      style={{ background: 'none', border: 'none', color: '#ef5353', cursor: 'pointer', fontSize: '16px', padding: '4px', display: 'flex', alignItems: 'center' }}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Bill Details */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(223, 186, 107, 0.15)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
                  <span style={{ color: '#a09ba2' }}>Items Total</span>
                  <span style={{ color: '#f3f0ea' }}>₹{itemsTotalAmount.toLocaleString('en-IN')}</span>
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


//asdjasdc afc