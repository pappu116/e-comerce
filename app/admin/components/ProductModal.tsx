// src/app/admin/components/ProductModal.tsx
'use client';
import { useState, useEffect } from 'react';
import { X, Upload, Save, Trash2 } from 'lucide-react';

interface Product {
  id?: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  description?: string;
  image?: string;           // এখন Base64 string হবে
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (product: Product) => void;
}

export default function ProductModal({ isOpen, onClose, product, onSave }: ProductModalProps) {
  
  const [formData, setFormData] = useState<Product>({
    name: '',
    category: '',
    price: '',
    stock: 0,
    status: 'In Stock',
    description: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  // Edit mode-এ ডেটা লোড
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        stock: product.stock || 0,
        status: product.status || 'In Stock',
        description: product.description || '',
        image: product.image || ''
      });
      setImagePreview(product.image || '');
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: 0,
        status: 'In Stock',
        description: '',
        image: ''
      });
      setImagePreview('');
    }
  }, [product]);

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File type check
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file (JPG, PNG, WebP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setImagePreview(base64String);
      setFormData(prev => ({ ...prev, image: base64String }));
    };
    reader.readAsDataURL(file);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop an image file");
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price) {
      alert("Please fill all required fields");
      return;
    }
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) || 0 : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b dark:border-gray-700 px-8 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {product ? 'Update product details' : 'Fill in the product information'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
          >
            <X size={26} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-7 overflow-auto max-h-[calc(95vh-85px)]">
          
          {/* ====================== Image Upload Section ====================== */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Product Image
            </label>

            {imagePreview ? (
              // Preview with Remove Button
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img 
                  src={imagePreview} 
                  alt="Product Preview" 
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ) : (
              // Upload Area
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('image-upload')?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
              >
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Drop image here or click to upload</p>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG, WebP • Max 5MB</p>
              </div>
            )}

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Rest of the Form */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 focus:outline-none"
              placeholder="Sony WH-1000XM5 Wireless Headphones"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category <span className="text-red-500">*</span></label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required 
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Laptops">Laptops</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Wearables">Wearables</option>
                <option value="Television">Television</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price (৳) <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500"
                placeholder="29900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 resize-y"
              placeholder="Detailed product description..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-8 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Save size={20} />
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}