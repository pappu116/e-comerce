// src/app/admin/components/OrderDetailsModal.tsx
'use client';
import { X, Package, Truck, CreditCard, User, Calendar } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: string;
  status: string;
  payment: string;
  date: string;
  items: number;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400';
      case 'Shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400';
      case 'Processing': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-semibold">Order Details</h2>
            <p className="text-blue-600 font-mono mt-1">{order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl">
            <X size={26} />
          </button>
        </div>

        <div className="p-8 space-y-8 overflow-auto max-h-[calc(95vh-100px)]">
          
          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Order Status</span>
            <span className={`px-5 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center">
                <User size={28} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{order.customer}</h3>
                <p className="text-gray-500">{order.email}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Package size={20} /> Order Items
            </h3>
            <div className="border dark:border-gray-700 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{order.product}</p>
                  <p className="text-sm text-gray-500">Quantity: {order.items}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{order.amount}</p>
              </div>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={22} className="text-green-600" />
                <h4 className="font-semibold">Payment Information</h4>
              </div>
              <p><span className="text-gray-500">Method:</span> Credit Card</p>
              <p><span className="text-gray-500">Status:</span> <span className="text-green-600 font-medium">{order.payment}</span></p>
              <p><span className="text-gray-500">Date:</span> {order.date}</p>
            </div>

            <div className="border dark:border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck size={22} className="text-blue-600" />
                <h4 className="font-semibold">Shipping Information</h4>
              </div>
              <p><span className="text-gray-500">Address:</span> Dhaka, Bangladesh</p>
              <p><span className="text-gray-500">Estimated Delivery:</span> 3-5 days</p>
              <p><span className="text-gray-500">Tracking:</span> TRK-{order.id.slice(4)}</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="border-t dark:border-gray-700 p-6 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 border border-gray-300 dark:border-gray-700 rounded-2xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Close
          </button>
          {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
            <button className="flex-1 py-3.5 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700">
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}