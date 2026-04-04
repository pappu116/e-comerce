// // src/app/admin/products/page.tsx
// 'use client';
// import { useState } from 'react';
// import { Plus } from 'lucide-react';
// import DataTable from '../components/DataTable';
// import ProductModal from '../components/ProductModal';

// export default function ProductsPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<any>(null);

//   // Sample Products Data
//   const [products, setProducts] = useState([
//     {
//       id: "P-1001",
//       name: "Sony WH-1000XM5 Wireless Headphones",
//       category: "Electronics",
//       price: "৳29,900",
//       stock: 45,
//       status: "In Stock",
//       image: "🎧",
//       description: "Industry-leading noise canceling wireless headphones"
//     },
//     {
//       id: "P-1002",
//       name: "MacBook Air M3 (16GB/512GB)",
//       category: "Laptops",
//       price: "৳1,45,000",
//       stock: 12,
//       status: "Low Stock",
//       image: "💻",
//       description: "Supercharged by M3 chip"
//     },
//     {
//       id: "P-1003",
//       name: "iPhone 16 Pro Max 256GB",
//       category: "Smartphones",
//       price: "৳1,25,000",
//       stock: 28,
//       status: "In Stock",
//       image: "📱"
//     },
//     {
//       id: "P-1004",
//       name: "Samsung Galaxy Watch 7",
//       category: "Wearables",
//       price: "৳18,500",
//       stock: 67,
//       status: "In Stock",
//       image: "⌚"
//     },
//     {
//       id: "P-1005",
//       name: "Dell XPS 13 Laptop",
//       category: "Laptops",
//       price: "৳98,000",
//       stock: 8,
//       status: "Low Stock",
//       image: "💻"
//     },
//     {
//       id: "P-1006",
//       name: "Sony 55 inch 4K Smart TV",
//       category: "Television",
//       price: "৳85,000",
//       stock: 15,
//       status: "In Stock",
//       image: "📺"
//     },
//   ]);

//   // Filter products
//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const columns = [
//     { 
//       key: "image", 
//       label: "", 
//       render: (image: string) => <div className="text-4xl">{image}</div>
//     },
//     { key: "id", label: "Product ID" },
//     { key: "name", label: "Product Name" },
//     { key: "category", label: "Category" },
//     { 
//       key: "price", 
//       label: "Price",
//       render: (price: string) => (
//         <span className="font-semibold text-gray-900 dark:text-white">{price}</span>
//       )
//     },
//     { 
//       key: "stock", 
//       label: "Stock",
//       render: (stock: number) => (
//         <span className={`font-medium ${stock < 15 ? 'text-orange-600' : 'text-emerald-600'}`}>
//           {stock} pcs
//         </span>
//       )
//     },
//     { 
//       key: "status", 
//       label: "Status",
//       render: (status: string) => {
//         const isLow = status === "Low Stock";
//         return (
//           <span className={`px-4 py-1.5 text-xs font-medium rounded-full 
//             ${isLow 
//               ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' 
//               : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
//             }`}>
//             {status}
//           </span>
//         );
//       }
//     },
//   ];

//   const handleAddNew = () => {
//     setEditingProduct(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (product: any) => {
//     setEditingProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (product: any) => {
//     if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
//       setProducts(prev => prev.filter(p => p.id !== product.id));
//       alert(`Product deleted: ${product.name}`);
//     }
//   };

//   const handleSaveProduct = (productData: any) => {
//     if (editingProduct) {
//       // Update existing product
//       setProducts(prev => 
//         prev.map(p => p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p)
//       );
//       alert(`Product updated successfully: ${productData.name}`);
//     } else {
//       // Add new product
//       const newProduct = {
//         ...productData,
//         id: `P-${Date.now().toString().slice(-4)}`
//       };
//       setProducts(prev => [...prev, newProduct]);
//       alert(`New product added successfully: ${productData.name}`);
//     }
//   };

//   return (
//     <div className="space-y-8 max-w-[1400px] mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your store products</p>
//         </div>

//         <button 
//           onClick={handleAddNew}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition-all active:scale-95 shadow-sm"
//         >
//           <Plus size={20} />
//           Add New Product
//         </button>
//       </div>

//       {/* Search & Filter */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             placeholder="Search by Product ID or Product Name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-blue-500 pl-12 py-3.5 rounded-2xl text-sm focus:outline-none"
//           />
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</div>
//         </div>

//         <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-blue-500">
//           <option value="">All Categories</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Laptops">Laptops</option>
//           <option value="Smartphones">Smartphones</option>
//           <option value="Wearables">Wearables</option>
//           <option value="Television">Television</option>
//         </select>
//       </div>

//       {/* Products Table */}
//       <DataTable 
//         title={`All Products (${filteredProducts.length})`}
//         data={filteredProducts}
//         columns={columns}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />

//       {/* Summary */}
//       <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
//         Showing {filteredProducts.length} of {products.length} products
//       </div>

//       {/* Product Modal */}
//       <ProductModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         product={editingProduct}
//         onSave={handleSaveProduct}
//       />
//     </div>
//   );
// }

'use client';
import { useState, useEffect, useCallback } from 'react'; // useCallback যোগ করা হয়েছে
import { Plus, Search, Loader2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import ProductModal from '../components/ProductModal';
import { productService, getImageUrl } from '@/app/lib/api';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null); // Type added
  const [products, setProducts] = useState<any[]>([]); // Type added
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch Products Logic (useCallback দিয়ে অপ্টিমাইজ করা হয়েছে)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productService.getAll();
      // Backend response logic handle
      if (response && response.success) {
        setProducts(response.products);
      } else {
        setProducts(Array.isArray(response) ? response : []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 2. Filter Logic (Safe mapping check added)
  const filteredProducts = products.filter(product =>
    (product?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product?._id?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 3. Table Columns Definition
  const columns = [
    { 
      key: "images", 
      label: "Image", 
      render: (images: string[]) => (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border dark:border-white/10 shadow-sm">
          <img 
            src={getImageUrl(images?.[0])} 
            alt="product" 
            className="w-full h-full object-cover" 
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'; }} // Image error handling
          />
        </div>
      )
    },
    { 
      key: "_id", 
      label: "ID", 
      render: (id: string) => <span className="text-[10px] font-mono text-gray-400">#{id?.slice(-6).toUpperCase()}</span> 
    },
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    { 
      key: "price", 
      label: "Price",
      render: (price: number) => <span className="font-bold text-gray-900 dark:text-white">৳{Number(price).toLocaleString()}</span>
    },
    { 
      key: "stock", 
      label: "Stock",
      render: (stock: number) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${stock < 10 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {stock} in stock
        </span>
      )
    },
  ];

  // 4. Save/Update Logic
  const handleSaveProduct = async (formData: FormData) => {
    try {
      setIsSaving(true);
      let res;
      
      if (editingProduct) {
        res = await productService.update(editingProduct._id, formData);
      } else {
        res = await productService.create(formData);
      }

      if (res.success) {
        alert(`✅ Product ${editingProduct ? "updated" : "added"} successfully!`);
        setIsModalOpen(false);
        setEditingProduct(null);
        fetchProducts(); // Refresh list
      }
    } catch (error: any) {
      console.error("Save Error:", error);
      const msg = error.response?.data?.message || error.message || "Failed to save product";
      alert("❌ " + msg);
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Delete Logic
  const handleDelete = async (product: any) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        const res = await productService.delete(product._id);
        if(res.success) {
          setProducts(prev => prev.filter(p => p._id !== product._id));
        }
      } catch (error) {
        alert("Could not delete product!");
      }
    }
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto p-4 md:p-8 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border dark:border-gray-800 shadow-sm">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Products</h1>
          <p className="text-gray-500 font-medium mt-1 uppercase text-xs tracking-widest">Inventory Management System</p>
        </div>

        <button 
          onClick={() => { 
            setEditingProduct(null); // নতুন প্রোডাক্টের জন্য এডিটিং স্টেট ক্লিয়ার
            setIsModalOpen(true); 
          }}
          disabled={loading || isSaving}
          className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          {isSaving ? <Loader2 className="animate-spin" size={22} /> : <Plus size={22} strokeWidth={3} />}
          Add Product
        </button>
      </div>

      {/* Search & Utility */}
      <div className="relative group">
        <input
          type="text"
          placeholder="Search by product name or unique ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 focus:border-blue-500 pl-14 py-5 rounded-[2rem] text-sm focus:outline-none transition-all shadow-sm group-hover:border-gray-200 dark:group-hover:border-gray-700"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
      </div>

      {/* Main Table Content */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border dark:border-gray-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
            <p className="font-bold uppercase tracking-widest text-xs">Syncing Database...</p>
          </div>
        ) : (
          <DataTable 
            title={`Store Inventory (${filteredProducts.length})`}
            data={filteredProducts}
            columns={columns}
            onEdit={(p: any) => { 
              setEditingProduct(p); 
              setIsModalOpen(true); 
            }}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Product Entry Modal */}
      {isModalOpen && (
        <ProductModal 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
          onSave={handleSaveProduct}
          isLoading={isSaving} 
        />
      )}
    </div>
  );
}