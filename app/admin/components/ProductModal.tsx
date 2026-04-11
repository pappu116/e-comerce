// 'use client';
// import { useState, useEffect } from 'react';
// import { X, Upload, Save, Trash2 } from 'lucide-react';

// interface Product {
//   id?: string;
//   name: string;
//   category: string;
//   price: string;
//   stock: number;
//   status: string;
//   description?: string;
//   image?: string; 
// }

// interface ProductModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   product?: Product | null;
//   onSave: (formData: FormData) => void; // FormData type update kora hoyeche
// }

// export default function ProductModal({ isOpen, onClose, product, onSave }: ProductModalProps) {
  
//   const [formData, setFormData] = useState<Product>({
//     name: '',
//     category: '',
//     price: '',
//     stock: 0,
//     status: 'In Stock',
//     description: '',
//     image: ''
//   });

//   const [imagePreview, setImagePreview] = useState<string>('');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null); // Notoon state real file-er jonno

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         id: product.id,
//         name: product.name || '',
//         category: product.category || '',
//         price: product.price || '',
//         stock: product.stock || 0,
//         status: product.status || 'In Stock',
//         description: product.description || '',
//         image: product.image || ''
//       });
//       setImagePreview(product.image || '');
//     } else {
//       resetForm();
//     }
//   }, [product]);

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       category: '',
//       price: '',
//       stock: 0,
//       status: 'In Stock',
//       description: '',
//       image: ''
//     });
//     setImagePreview('');
//     setSelectedFile(null);
//   };

//   // Image processing logic
//   const processFile = (file: File) => {
//     if (!file.type.startsWith('image/')) {
//       alert("Please upload an image file (JPG, PNG, WebP)");
//       return;
//     }
//     setSelectedFile(file); // Backend-e pathanor jonno
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setImagePreview(event.target?.result as string); // UI-te dekhanor jonno
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) processFile(file);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) processFile(file);
//   };

//   const removeImage = () => {
//     setImagePreview('');
//     setSelectedFile(null);
//     setFormData(prev => ({ ...prev, image: '' }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name || !formData.category || !formData.price) {
//       alert("Please fill all required fields");
//       return;
//     }

//     // 🔥 FormData create kora hochche jate Binary file pathano jay
//     const submissionData = new FormData();
//     submissionData.append('name', formData.name);
//     submissionData.append('category', formData.category);
//     submissionData.append('price', formData.price);
//     submissionData.append('stock', formData.stock.toString());
//     submissionData.append('status', formData.status);
//     submissionData.append('description', formData.description || '');
    
//     // Backend 'images' field expect korche (router list-e dekhlam)
//     if (selectedFile) {
//       submissionData.append('images', selectedFile); 
//     }

//     onSave(submissionData); // Akhane object na, FormData pathachchi
//     onClose();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'stock' ? parseInt(value) || 0 : value
//     }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//       <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl border dark:border-gray-800">
        
//         {/* Header */}
//         <div className="flex items-center justify-between border-b dark:border-gray-800 px-8 py-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//               {product ? 'Edit Product' : 'Add New Product'}
//             </h2>
//             <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mt-1">
//               Inventory Management
//             </p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[calc(95vh-100px)] custom-scrollbar">
          
//           {/* Image Upload Area */}
//           <div className="space-y-3">
//             <label className="text-xs font-black uppercase tracking-widest text-gray-400">Product Visual</label>
//             {imagePreview ? (
//               <div className="relative rounded-[2rem] overflow-hidden group">
//                 <img src={imagePreview} alt="Preview" className="w-full h-60 object-cover border dark:border-gray-800" />
//                 <button
//                   type="button"
//                   onClick={removeImage}
//                   className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-2xl hover:scale-110 transition-transform shadow-lg"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             ) : (
//               <div 
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={handleDrop}
//                 onClick={() => document.getElementById('image-upload')?.click()}
//                 className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem] p-10 text-center hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer group"
//               >
//                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                   <Upload className="text-blue-600" size={28} />
//                 </div>
//                 <p className="font-bold text-gray-700 dark:text-gray-300">Click or Drag to Upload Image</p>
//                 <p className="text-xs text-gray-400 mt-1 uppercase font-semibold">JPG, PNG or WebP up to 5MB</p>
//               </div>
//             )}
//             <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-4">
//             <div>
//               <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 rounded-2xl focus:ring-2 ring-blue-500/20 focus:outline-none font-medium"
//                 placeholder="Ex: Apple MacBook Pro M3"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</label>
//                 <select 
//                   name="category" 
//                   value={formData.category} 
//                   onChange={handleChange} 
//                   required 
//                   className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 rounded-2xl focus:outline-none appearance-none"
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Electronics">Electronics</option>
//                   <option value="Laptops">Laptops</option>
//                   <option value="Smartphones">Smartphones</option>
//                   <option value="Accessories">Accessories</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Price (৳)</label>
//                 <input
//                   type="text"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 rounded-2xl focus:outline-none font-bold"
//                   placeholder="0.00"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Stock</label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 rounded-2xl focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Status</label>
//                 <select 
//                   name="status" 
//                   value={formData.status} 
//                   onChange={handleChange}
//                   className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 rounded-2xl focus:outline-none"
//                 >
//                   <option value="In Stock">In Stock</option>
//                   <option value="Low Stock">Low Stock</option>
//                   <option value="Out of Stock">Out of Stock</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 rounded-2xl focus:outline-none resize-none"
//                 placeholder="Brief details about the product..."
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 py-4 border dark:border-gray-700 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
//             >
//               <Save size={18} />
//               {product ? 'Update' : 'Save'} Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




'use client';
import { useState, useEffect } from 'react';
import { X, Upload, Save, Trash2 } from 'lucide-react';

interface Product {
  id?: string;
  name: string;
  category: string;
  price: string;           // Selling Price
  costPrice?: string;      // Buying / Cost Price
  stock: number;
  status: string;
  description?: string;
  image?: string;          // পুরনো single image path (fallback)
  images?: string[];       // backend থেকে আসা array
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (formData: FormData) => void;
}

// Helper function to get full image URL
const getImageUrl = (path: string | undefined): string => {
  if (!path) return '';
  // যদি ইতিমধ্যে full URL থাকে তাহলে সেটাই রিটার্ন করবে
  if (path.startsWith('http')) return path;
  // অন্যথায় backend base URL + path (তোমার backend URL অনুসারে পরিবর্তন করো)
  return `http://localhost:5000/${path.replace(/^\//, '')}`;   // ← এখানে তোমার backend URL দাও
};

export default function ProductModal({ isOpen, onClose, product, onSave }: ProductModalProps) {
  
  const [formData, setFormData] = useState<Product>({
    name: '',
    category: '',
    price: '',
    costPrice: '',
    stock: 0,
    status: 'In Stock',
    description: '',
    image: '',
    images: []
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (product) {
        // images array থেকে প্রথম ইমেজ নেওয়া
        const existingImage = product.images && product.images.length > 0 
          ? product.images[0] 
          : product.image;

        setFormData({
          id: product.id,
          name: product.name || '',
          category: product.category || '',
          price: product.price || '',
          costPrice: product.costPrice || '',
          stock: product.stock || 0,
          status: product.status || 'In Stock',
          description: product.description || '',
          image: existingImage || '',
          images: product.images || []
        });

        // প্রিভিউতে ইমেজ দেখানো
        if (existingImage) {
          setImagePreview(getImageUrl(existingImage));
        } else {
          setImagePreview('');
        }
        setSelectedFile(null);
      } else {
        resetForm();
      }
    }
  }, [product, isOpen]);

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      costPrice: '',
      stock: 0,
      status: 'Published',
      description: '',
      image: '',
      images: []
    });
    setImagePreview('');
    setSelectedFile(null);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file only");
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const removeImage = () => {
    setImagePreview('');
    setSelectedFile(null);
    setFormData(prev => ({ ...prev, image: '', images: [] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price) {
      alert("Please fill all required fields");
      return;
    }

    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('category', formData.category);
    submissionData.append('price', formData.price);
    submissionData.append('costPrice', formData.costPrice || '0');
    submissionData.append('stock', formData.stock.toString());
    submissionData.append('status', formData.status);
    submissionData.append('description', formData.description || '');

    // Image Logic
    if (selectedFile) {
      submissionData.append('images', selectedFile);   // নতুন ছবি
    } else if (formData.image) {
      submissionData.append('image', formData.image);  // পুরনো ছবি রাখা
    }

    onSave(submissionData);
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
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl border dark:border-gray-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b dark:border-gray-800 px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[calc(95vh-100px)]">
          
          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Product Image</label>
            
            {imagePreview ? (
              <div className="relative rounded-[2rem] overflow-hidden group">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-60 object-cover border dark:border-gray-800"
                  onError={() => setImagePreview('')}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-2xl hover:scale-110 transition-transform"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ) : (
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById('image-upload')?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[2rem] p-12 text-center hover:border-blue-500 cursor-pointer"
              >
                <Upload className="mx-auto mb-4 text-blue-600" size={40} />
                <p className="font-bold text-gray-700 dark:text-gray-300">Click or Drag Image Here</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP • Max 5MB</p>
              </div>
            )}
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-2xl">
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Selling Price (৳)</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} required className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-2xl" />
              </div>
            </div>

            {/* Cost Price (Buying Price) */}
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Cost Price / Buying Price (৳)</label>
              <input 
                type="text" 
                name="costPrice" 
                value={formData.costPrice || ''} 
                onChange={handleChange} 
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-2xl" 
                placeholder="0.00" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-2xl" />
              </div>
              <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-2xl focus:outline-none"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-2xl resize-none" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-4 border dark:border-gray-700 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-800">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 flex items-center justify-center gap-2">
              <Save size={18} />
              {product ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}