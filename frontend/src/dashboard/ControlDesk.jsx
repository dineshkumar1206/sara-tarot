import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Plus, Pencil, Trash2, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { API_BASE_URL } from '../config';

// Component Imports
import AdminNavbar from './AdminNavbar'; // Adjust the import path based on your folder structure

const CRYSTAL_CATEGORIES = ['Rashi', 'Dhanyog', 'Bracelet', 'Karungali', 'Rudraksh', 'Yantra', 'Pyrite'];
const SERVICE_CATEGORIES = [
  'Tarot Private Consultation',
  'Spiritual Healing',
  'Murugar Cards',
  'Tarot Card Reading',
  'Spiritual Counseling',
  'Kali Pooja'
];
const ALL_CATEGORIES = [...CRYSTAL_CATEGORIES, ...SERVICE_CATEGORIES];
const CRYSTAL_AND_KALI_CATEGORIES = [...CRYSTAL_CATEGORIES, 'Kali Pooja'];
const SERVICE_ONLY_CATEGORIES = SERVICE_CATEGORIES.filter(cat => cat !== 'Kali Pooja');

export default function ControlDesk() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Auth state from Redux
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user) || {};

  // Active Category Sidebar Tab Selection
  const [activeCategory, setActiveCategory] = useState('Tarot Private Consultation');

  // Products state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Modal / Form state
  const [showModal, setShowModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    type: 'Blessed & Energized',
    category: '',
    desc: '',
    image: '',
    inclusions: ''
  });

  // Verify auth
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [token, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch crystals from the database.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  const openAddModal = () => {
    const isCrystalOrKali = CRYSTAL_AND_KALI_CATEGORIES.includes(activeCategory);
    setFormData({
      id: null,
      name: '',
      price: '',
      type: isCrystalOrKali ? 'Blessed & Energized' : 'Duration: 40 minutes',
      category: activeCategory,
      desc: '',
      image: '',
      inclusions: ''
    });
    setImageFile(null);
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    const isCrystalOrKali = CRYSTAL_AND_KALI_CATEGORIES.includes(product.category || activeCategory);
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type || (isCrystalOrKali ? 'Blessed & Energized' : 'Duration: 40 minutes'),
      category: product.category || activeCategory,
      desc: product.desc || '',
      image: product.image || '',
      inclusions: Array.isArray(product.inclusions) ? product.inclusions.join('\n') : ''
    });
    setImageFile(null);
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this crystal?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setFormLoading(true);

    const isCrystalOrKali = CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category);
    const inclusionsArray = isCrystalOrKali
      ? formData.inclusions
          .split('\n')
          .map(item => item.trim())
          .filter(item => item.length > 0)
      : [];

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('price', formData.price);
    fd.append('type', formData.type);
    fd.append('category', formData.category);
    fd.append('desc', formData.desc);
    fd.append('inclusions', JSON.stringify(inclusionsArray));

    if (isCrystalOrKali) {
      if (imageFile) {
        fd.append('image', imageFile);
      } else {
        fd.append('image', formData.image);
      }
    } else {
      fd.append('image', '');
    }

    try {
      if (formData.id) {
        const res = await axios.put(`${API_BASE_URL}/api/products/${formData.id}`, fd, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.map(p => p.id === formData.id ? res.data : p));
        setFormSuccess('Crystal updated successfully!');
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/products`, fd, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts([...products, res.data]);
        setFormSuccess('New crystal added successfully!');
      }

      setTimeout(() => {
        setShowModal(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError('Failed to save product details.');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) => product.category && product.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#090514] text-[#F4F0EA] flex flex-col font-sans">
      
      {/* ─── IMPORTED NAVBAR PANEL ─── */}
      <AdminNavbar 
        user={user}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        handleSignOut={handleSignOut}
      />

      {/* ─── MAIN PANEL ─── */}
      <main className="flex-grow p-6 md:p-8 max-w-[1400px] mx-auto w-full overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-[#D9B56A]/10 pb-6">
          <div>
            <h2 className="font-['Cinzel'] text-3xl font-normal text-[#D9B56A] tracking-wide">
              {activeCategory} Collection
            </h2>
            <p className="text-[13px] text-[#B7AFC7] mt-1">
              Manage listings published under the {activeCategory} category.
            </p>
          </div>
          
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#D9B56A] text-[#0A0713] px-5 py-3 rounded-lg text-[13px] font-semibold uppercase tracking-[0.5px] hover:bg-[#F4F0EA] transition-colors duration-200 cursor-pointer shadow-[0_4px_15px_rgba(217,181,106,0.15)]"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#D9B56A] mb-4" size={40} />
            <p className="text-[#B7AFC7] text-sm font-sans">Loading listings...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3 mb-6 font-sans">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Grid of Listings */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-[#D9B56A]/20 rounded-xl font-sans">
                <p className="text-[#B7AFC7] text-[15px]">No products found in the {activeCategory} category.</p>
                <button
                  onClick={openAddModal}
                  className="text-[#D9B56A] underline mt-2 text-sm font-semibold hover:text-white"
                >
                  Create first product for {activeCategory}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="bg-[#130f24] border border-[#D9B56A]/15 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#D9B56A]/40"
                  >
                    {/* Card Image */}
                    <div className="w-full h-[160px] aspect-video overflow-hidden relative bg-[#0A0713] flex items-center justify-center">
                      {CRYSTAL_AND_KALI_CATEGORIES.includes(product.category) ? (
                        product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = '/saraa-logo.jpeg';
                            }}
                          />
                        ) : (
                          <img 
                            src="/saraa-logo.jpeg" 
                            alt={product.name} 
                            className="w-full h-full object-cover opacity-60" 
                          />
                        )
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1c1635] to-[#0A0713] flex flex-col items-center justify-center p-4">
                          <span className="text-[10px] text-[#D9B56A] uppercase font-bold tracking-[0.2em] mb-1">
                            {product.category}
                          </span>
                          <span className="text-[12px] text-[#B7AFC7] text-center font-medium font-sans">
                            {product.type}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#130f24] to-transparent" />
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-grow flex flex-col justify-between font-sans">
                      <div>
                        <span className="text-[9px] text-[#D9B56A] uppercase font-bold tracking-widest">
                          {product.type || 'Blessed & Energized'}
                        </span>
                        <h4 className="text-[17px] text-white font-medium mt-1 mb-2 leading-tight">
                          {product.name}
                        </h4>
                        <p className="text-[12px] text-[#B7AFC7] line-clamp-3 leading-relaxed mb-4">
                          {product.desc}
                        </p>
                      </div>

                      <div>
                        <div className="text-[20px] font-bold text-[#D9B56A] mb-4">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>

                        {/* Actions Row */}
                        <div className="flex gap-3 border-t border-[#D9B56A]/10 pt-4">
                          <button
                            onClick={() => openEditModal(product)}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-transparent text-[#D9B56A] hover:text-white border border-[#D9B56A]/30 hover:border-[#D9B56A]/60 py-2 rounded-lg text-[12px] font-semibold uppercase tracking-[0.5px] transition-colors duration-200 cursor-pointer"
                          >
                            <Pencil size={13} />
                            <span>Edit</span>
                          </button>
                          
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 py-2 rounded-lg text-[12px] font-semibold uppercase tracking-[0.5px] transition-colors duration-200 cursor-pointer"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* ─── ADD/EDIT FORM MODAL ─── */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0A0713]/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          
          <div 
            className="bg-[#130f24] border border-[#D9B56A]/30 rounded-2xl w-full max-w-[540px] max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-light cursor-pointer"
            >
              &times;
            </button>

            {/* Modal Header */}
            <h3 className="font-['Cinzel'] text-2xl font-normal text-[#D9B56A] tracking-wide mb-6">
              {formData.id 
                ? (CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? 'Edit Product' : 'Edit Service / Offer') 
                : (CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? 'Add Product' : 'Add Service / Offer')}
            </h3>

            {formError && (
              <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mb-4 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-lg flex items-center gap-2">
                <CheckCircle size={15} />
                <span>{formSuccess}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm font-sans">
              
              {/* Product/Service Name */}
              <div>
                <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] mb-1 font-medium">
                  {CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? 'Product Name *' : 'Service Title / Name *'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? 'e.g. Dhanyog Crystal' : 'e.g. Relationship Healing Session'}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0A0713]/60 border border-[#D9B56A]/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-[#0A0713]/90 transition-all duration-200"
                />
              </div>

              {/* Grid 2-col (Price & Type) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] mb-1 font-medium">
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 1800"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A0713]/60 border border-[#D9B56A]/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-[#0A0713]/90 transition-all duration-200"
                  />
                </div>

                {/* Type / Duration */}
                <div>
                  <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] mb-1 font-medium">
                    {CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? 'Product Type' : 'Duration / Session Type *'}
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required={!CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category)}
                    placeholder={CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? 'e.g. Blessed & Energized' : 'e.g. Duration: 40 minutes'}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A0713]/60 border border-[#D9B56A]/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-[#0A0713]/90 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Category selector */}
              <div>
                <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] mb-1 font-medium">
                  {CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? 'Product Category' : 'Service Category'}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0A0713]/60 border border-[#D9B56A]/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-[#0A0713]/90 transition-all duration-200"
                >
                  {(CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? CRYSTAL_AND_KALI_CATEGORIES : SERVICE_ONLY_CATEGORIES).map(cat => (
                    <option key={cat} value={cat} className="bg-[#130f24] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload Area */}
              {CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) && (
                <div>
                  <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] mb-1 font-medium">
                    Product Image
                  </label>
                  
                  <div style={{
                    border: '2px dashed rgba(217, 181, 106, 0.3)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(10, 7, 19, 0.4)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(217, 181, 106, 0.6)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(217, 181, 106, 0.3)'}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0] || null)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                    
                    {imageFile ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={URL.createObjectURL(imageFile)} 
                          alt="Selected Preview" 
                          style={{ maxHeight: '120px', borderRadius: '4px', marginBottom: '0.5rem' }} 
                        />
                        <span className="text-xs text-[#D9B56A] font-semibold truncate max-w-[250px]">
                          {imageFile.name}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1">Click or drag to change image</span>
                      </div>
                    ) : formData.image ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={formData.image} 
                          alt="Current Product Preview" 
                          style={{ maxHeight: '120px', borderRadius: '4px', marginBottom: '0.5rem' }} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/saraa-logo.jpeg';
                          }}
                        />
                        <span className="text-xs text-[#B7AFC7] truncate max-w-[250px]">
                          Current Image
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1">Click or drag to replace image</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-4">
                        <Plus className="text-[#D9B56A] mb-2" size={24} />
                        <span className="text-xs text-[#B7AFC7] font-medium">Click or drag image file here</span>
                        <span className="text-[10px] text-gray-500 mt-1">Supports PNG, JPG, JPEG, GIF</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] mb-1 font-medium">
                  Description
                </label>
                <textarea
                  name="desc"
                  rows="3"
                  value={formData.desc}
                  onChange={handleInputChange}
                  placeholder={CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) ? 'Provide crystal healing benefits...' : 'Provide service details and session coverage...'}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0A0713]/60 border border-[#D9B56A]/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-[#0A0713]/90 transition-all duration-200 resize-none"
                />
              </div>

              {/* Inclusions */}
              {CRYSTAL_AND_KALI_CATEGORIES.includes(formData.category) && (
                <div>
                  <label className="block text-[11px] text-[#B7AFC7] uppercase tracking-[1px] mb-1 font-medium">
                    Product Inclusions (One item per line)
                  </label>
                  <textarea
                    name="inclusions"
                    rows="3"
                    value={formData.inclusions}
                    onChange={handleInputChange}
                    placeholder="e.g.&#10;Spiritually cleansed and energized&#10;Couriered with sacred prasadham"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A0713]/60 border border-[#D9B56A]/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#D9B56A]/50 focus:bg-[#0A0713]/90 transition-all duration-200 resize-none"
                  />
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t border-[#D9B56A]/10 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-transparent hover:bg-white/5 border border-gray-600 hover:border-gray-400 py-3 rounded-lg font-semibold uppercase tracking-[0.5px] text-[12px] text-white transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-[#D9B56A] text-[#0A0713] hover:bg-[#F4F0EA] py-3 rounded-lg font-semibold uppercase tracking-[0.5px] text-[12px] transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Product</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}