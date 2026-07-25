/* ============================================
   RESTAURANT MANAGEMENT SYSTEM - DATA LAYER
   ============================================ */

var RMS = {};

// ===== SAMPLE DATA =====
RMS.sampleData = {
    users: [
        { id: 'USR001', name: 'Admin User', email: 'admin@restaurant.com', password: 'admin123', role: 'Manager', phone: '+1 234 567 890', avatar: '' },
        { id: 'USR002', name: 'John Staff', email: 'staff@restaurant.com', password: 'staff123', role: 'Cashier', phone: '+1 234 567 891', avatar: '' }
    ],

    customers: [
        { id: 'CUS001', name: 'Ahmed Khan', phone: '+1 234 567 001', email: 'ahmed@email.com', address: '123 Main St, New York', photo: '', orders: 12, totalSpent: 1560, loyaltyPoints: 150, createdAt: '2025-01-15' },
        { id: 'CUS002', name: 'Sarah Ali', phone: '+1 234 567 002', email: 'sarah@email.com', address: '456 Oak Ave, Los Angeles', photo: '', orders: 8, totalSpent: 890, loyaltyPoints: 80, createdAt: '2025-02-20' },
        { id: 'CUS003', name: 'Mike Johnson', phone: '+1 234 567 003', email: 'mike@email.com', address: '789 Pine Rd, Chicago', photo: '', orders: 5, totalSpent: 430, loyaltyPoints: 40, createdAt: '2025-03-10' },
        { id: 'CUS004', name: 'Emma Wilson', phone: '+1 234 567 004', email: 'emma@email.com', address: '321 Elm St, Houston', photo: '', orders: 20, totalSpent: 2450, loyaltyPoints: 200, createdAt: '2025-01-05' },
        { id: 'CUS005', name: 'David Brown', phone: '+1 234 567 005', email: 'david@email.com', address: '654 Maple Dr, Phoenix', photo: '', orders: 3, totalSpent: 210, loyaltyPoints: 20, createdAt: '2025-04-01' }
    ],

    staff: [
        { id: 'STF001', name: 'John Staff', phone: '+1 234 567 100', email: 'john@restaurant.com', role: 'Waiter', shift: 'Morning', salary: 2500, attendance: 95, photo: '', employeeId: 'EMP001', joinDate: '2024-06-01', performance: 4.5 },
        { id: 'STF002', name: 'Maria Garcia', phone: '+1 234 567 101', email: 'maria@restaurant.com', role: 'Chef', shift: 'Evening', salary: 4000, attendance: 98, photo: '', employeeId: 'EMP002', joinDate: '2023-09-15', performance: 4.8 },
        { id: 'STF003', name: 'Robert Chen', phone: '+1 234 567 102', email: 'robert@restaurant.com', role: 'Cashier', shift: 'Morning', salary: 2200, attendance: 92, photo: '', employeeId: 'EMP003', joinDate: '2024-01-10', performance: 4.2 },
        { id: 'STF004', name: 'Lisa Wang', phone: '+1 234 567 103', email: 'lisa@restaurant.com', role: 'Manager', shift: 'Full Day', salary: 5000, attendance: 99, photo: '', employeeId: 'EMP004', joinDate: '2023-01-20', performance: 4.9 },
        { id: 'STF005', name: 'James Patel', phone: '+1 234 567 104', email: 'james@restaurant.com', role: 'Receptionist', shift: 'Evening', salary: 2100, attendance: 90, photo: '', employeeId: 'EMP005', joinDate: '2024-03-05', performance: 4.0 }
    ],

    categories: [
        { id: 'CAT001', name: 'Fast Food', image: '', description: 'Quick and delicious fast food items', itemCount: 5 },
        { id: 'CAT002', name: 'Chinese', image: '', description: 'Authentic Chinese cuisine', itemCount: 4 },
        { id: 'CAT003', name: 'Pizza', image: '', description: 'Freshly baked pizzas', itemCount: 3 },
        { id: 'CAT004', name: 'BBQ', image: '', description: 'Smoky BBQ specialties', itemCount: 3 },
        { id: 'CAT005', name: 'Biryani', image: '', description: 'Fragrant rice dishes', itemCount: 3 },
        { id: 'CAT006', name: 'Beverages', image: '', description: 'Refreshing drinks', itemCount: 5 },
        { id: 'CAT007', name: 'Dessert', image: '', description: 'Sweet treats', itemCount: 3 }
    ],

    menuItems: [
        { id: 'MEN001', name: 'Chicken Burger', category: 'CAT001', price: 8.99, discount: 0, image: '', description: 'Grilled chicken patty with fresh lettuce and mayo', prepTime: '15 min', ingredients: 'Chicken, Bun, Lettuce, Mayo, Cheese', available: true, featured: true },
        { id: 'MEN002', name: 'French Fries', category: 'CAT001', price: 4.99, discount: 0, image: '', description: 'Crispy golden french fries', prepTime: '10 min', ingredients: 'Potatoes, Oil, Salt', available: true, featured: false },
        { id: 'MEN003', name: 'Margherita Pizza', category: 'CAT003', price: 12.99, discount: 10, image: '', description: 'Classic margherita with fresh mozzarella', prepTime: '20 min', ingredients: 'Dough, Mozzarella, Tomato Sauce, Basil', available: true, featured: true },
        { id: 'MEN004', name: 'Chicken Fried Rice', category: 'CAT002', price: 10.99, discount: 0, image: '', description: 'Wok-fried rice with chicken and vegetables', prepTime: '15 min', ingredients: 'Rice, Chicken, Vegetables, Soy Sauce', available: true, featured: false },
        { id: 'MEN005', name: 'BBQ Ribs', category: 'CAT004', price: 18.99, discount: 0, image: '', description: 'Slow-cooked BBQ ribs with special sauce', prepTime: '30 min', ingredients: 'Pork Ribs, BBQ Sauce, Spices', available: true, featured: true },
        { id: 'MEN006', name: 'Chicken Biryani', category: 'CAT005', price: 11.99, discount: 5, image: '', description: 'Fragrant basmati rice with spiced chicken', prepTime: '25 min', ingredients: 'Basmati Rice, Chicken, Spices, Yogurt', available: true, featured: true },
        { id: 'MEN007', name: 'Coca Cola', category: 'CAT006', price: 1.99, discount: 0, image: '', description: 'Refreshing carbonated drink', prepTime: '2 min', ingredients: '', available: true, featured: false },
        { id: 'MEN008', name: 'Chocolate Brownie', category: 'CAT007', price: 5.99, discount: 0, image: '', description: 'Warm chocolate brownie with ice cream', prepTime: '10 min', ingredients: 'Chocolate, Flour, Eggs, Ice Cream', available: true, featured: false },
        { id: 'MEN009', name: 'Spring Rolls', category: 'CAT002', price: 6.99, discount: 0, image: '', description: 'Crispy vegetable spring rolls', prepTime: '12 min', ingredients: 'Spring Roll Wraps, Vegetables', available: true, featured: false },
        { id: 'MEN010', name: 'Beef Burger', category: 'CAT001', price: 10.99, discount: 0, image: '', description: 'Juicy beef patty with all toppings', prepTime: '18 min', ingredients: 'Beef Patty, Bun, Lettuce, Tomato, Onion', available: true, featured: true },
        { id: 'MEN011', name: 'Pepperoni Pizza', category: 'CAT003', price: 14.99, discount: 0, image: '', description: 'Loaded with pepperoni and cheese', prepTime: '22 min', ingredients: 'Dough, Pepperoni, Mozzarella, Sauce', available: true, featured: false },
        { id: 'MEN012', name: 'Lemon Mint Drink', category: 'CAT006', price: 3.49, discount: 0, image: '', description: 'Fresh lemon and mint cooler', prepTime: '5 min', ingredients: 'Lemon, Mint, Sugar, Water', available: true, featured: false }
    ],

    tables: [
        { id: 'TBL001', number: 1, capacity: 2, status: 'available', type: 'Standard', location: 'Indoor' },
        { id: 'TBL002', number: 2, capacity: 4, status: 'occupied', type: 'Standard', location: 'Indoor' },
        { id: 'TBL003', number: 3, capacity: 6, status: 'reserved', type: 'Family', location: 'Indoor' },
        { id: 'TBL004', number: 4, capacity: 2, status: 'available', type: 'Window', location: 'Window' },
        { id: 'TBL005', number: 5, capacity: 8, status: 'available', type: 'VIP', location: 'VIP Room' },
        { id: 'TBL006', number: 6, capacity: 4, status: 'occupied', type: 'Standard', location: 'Outdoor' },
        { id: 'TBL007', number: 7, capacity: 4, status: 'available', type: 'Standard', location: 'Indoor' },
        { id: 'TBL008', number: 8, capacity: 2, status: 'available', type: 'Window', location: 'Window' }
    ],

    orders: [
        {
            id: 'ORD001', customer: 'CUS001', table: 'TBL002', items: [
                { menuId: 'MEN001', name: 'Chicken Burger', quantity: 2, price: 8.99 },
                { menuId: 'MEN002', name: 'French Fries', quantity: 1, price: 4.99 }
            ], subtotal: 22.97, discount: 0, tax: 2.87, serviceCharge: 2.30, total: 28.14,
            status: 'completed', paymentStatus: 'paid', paymentMethod: 'Cash',
            notes: 'No onions on burgers', createdAt: '2025-07-24 10:30',
            completedAt: '2025-07-24 11:00'
        },
        {
            id: 'ORD002', customer: 'CUS002', table: 'TBL006', items: [
                { menuId: 'MEN003', name: 'Margherita Pizza', quantity: 1, price: 12.99 },
                { menuId: 'MEN007', name: 'Coca Cola', quantity: 2, price: 1.99 }
            ], subtotal: 16.97, discount: 0, tax: 2.12, serviceCharge: 1.70, total: 20.79,
            status: 'preparing', paymentStatus: 'pending', paymentMethod: 'Credit Card',
            notes: '', createdAt: '2025-07-25 10:00', completedAt: ''
        },
        {
            id: 'ORD003', customer: 'CUS003', table: 'TBL001', items: [
                { menuId: 'MEN006', name: 'Chicken Biryani', quantity: 1, price: 11.99 }
            ], subtotal: 11.99, discount: 5, tax: 1.05, serviceCharge: 1.20, total: 13.24,
            status: 'pending', paymentStatus: 'pending', paymentMethod: 'Cash',
            notes: 'Extra spicy', createdAt: '2025-07-25 10:45', completedAt: ''
        },
        {
            id: 'ORD004', customer: 'CUS004', table: 'TBL005', items: [
                { menuId: 'MEN005', name: 'BBQ Ribs', quantity: 2, price: 18.99 },
                { menuId: 'MEN008', name: 'Chocolate Brownie', quantity: 1, price: 5.99 }
            ], subtotal: 43.97, discount: 10, tax: 4.40, serviceCharge: 4.40, total: 52.77,
            status: 'served', paymentStatus: 'paid', paymentMethod: 'Visa',
            notes: 'Birthday celebration', createdAt: '2025-07-25 09:15', completedAt: ''
        }
    ],

    reservations: [
        { id: 'RES001', customerName: 'Alice Green', phone: '+1 234 567 200', email: 'alice@email.com', date: '2025-07-26', time: '19:00', guests: 4, tableId: 'TBL003', status: 'confirmed', notes: 'Anniversary dinner', createdAt: '2025-07-20' },
        { id: 'RES002', customerName: 'Tom Harris', phone: '+1 234 567 201', email: 'tom@email.com', date: '2025-07-27', time: '20:00', guests: 6, tableId: 'TBL005', status: 'pending', notes: '', createdAt: '2025-07-22' },
        { id: 'RES003', customerName: 'Nina Lopez', phone: '+1 234 567 202', email: 'nina@email.com', date: '2025-07-25', time: '13:00', guests: 2, tableId: 'TBL004', status: 'confirmed', notes: 'Window seat preferred', createdAt: '2025-07-21' }
    ],

    inventory: [
        { id: 'INV001', name: 'Chicken Breast', quantity: 25, unit: 'kg', minStock: 10, price: 5.50, supplierId: 'SUP001', expiryDate: '2025-08-15', purchaseDate: '2025-07-20' },
        { id: 'INV002', name: 'Basmati Rice', quantity: 50, unit: 'kg', minStock: 15, price: 2.00, supplierId: 'SUP002', expiryDate: '2025-12-31', purchaseDate: '2025-07-15' },
        { id: 'INV003', name: 'Tomato Sauce', quantity: 8, unit: 'liters', minStock: 10, price: 3.00, supplierId: 'SUP001', expiryDate: '2025-09-30', purchaseDate: '2025-07-10' }
    ],

    suppliers: [
        { id: 'SUP001', name: 'Fresh Foods Co.', contact: 'Mark Wilson', phone: '+1 234 567 300', email: 'mark@freshfoods.com', address: '100 Supply St, Chicago', products: 'Chicken, Vegetables, Sauces' },
        { id: 'SUP002', name: 'Grain Masters', contact: 'Lisa Brown', phone: '+1 234 567 301', email: 'lisa@grainmasters.com', address: '200 Grain Ave, Chicago', products: 'Rice, Flour, Spices' }
    ],

    payments: [
        { id: 'PAY001', orderId: 'ORD001', amount: 28.14, method: 'Cash', status: 'completed', transactionId: 'TXN001', date: '2025-07-24 11:00' },
        { id: 'PAY002', orderId: 'ORD004', amount: 52.77, method: 'Visa', status: 'completed', transactionId: 'TXN002', date: '2025-07-25 09:45' }
    ],

    activities: [
        { id: 'ACT001', text: 'New order #ORD003 placed by Ahmed Khan', time: '10:45 AM', type: 'order' },
        { id: 'ACT002', text: 'Payment received for order #ORD004 ($52.77)', time: '09:45 AM', type: 'payment' },
        { id: 'ACT003', text: 'Table #5 reserved for Tom Harris', time: '09:30 AM', type: 'reservation' },
        { id: 'ACT004', text: 'New staff member joined: James Patel', time: '09:00 AM', type: 'staff' },
        { id: 'ACT005', text: 'Low stock alert: Tomato Sauce (8 liters)', time: '08:30 AM', type: 'inventory' }
    ],

    settings: {
        restaurantName: 'Gourmet Restaurant',
        logo: '',
        address: '123 Gourmet Street, New York, NY 10001',
        phone: '+1 234 567 890',
        email: 'info@gourmetrestaurant.com',
        currency: 'PKR',
        currencySymbol: '₨',
        taxRate: 12.5,
        serviceCharge: 10,
        openingTime: '08:00',
        closingTime: '23:00',
        theme: 'light'
    },

    currentUser: { id: 'USR001', name: 'Admin User', email: 'admin@restaurant.com', role: 'Manager', phone: '+1 234 567 890', avatar: '' }
};

// ===== LOCALSTORAGE MANAGER =====
RMS.Storage = {
    get(key) {
        try {
            const data = localStorage.getItem('rms_' + key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Storage get error:', e);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem('rms_' + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem('rms_' + key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    init() {
        if (!this.get('initialized')) {
            // Seed all data
            this.set('users', RMS.sampleData.users);
            this.set('customers', RMS.sampleData.customers);
            this.set('staff', RMS.sampleData.staff);
            this.set('categories', RMS.sampleData.categories);
            this.set('menuItems', RMS.sampleData.menuItems);
            this.set('tables', RMS.sampleData.tables);
            this.set('orders', RMS.sampleData.orders);
            this.set('reservations', RMS.sampleData.reservations);
            this.set('inventory', RMS.sampleData.inventory);
            this.set('suppliers', RMS.sampleData.suppliers);
            this.set('payments', RMS.sampleData.payments);
            this.set('activities', RMS.sampleData.activities);
            this.set('settings', RMS.sampleData.settings);
            this.set('currentUser', RMS.sampleData.currentUser);
            this.set('initialized', true);
            this.set('counters', {
                customer: 5, staff: 5, category: 7, menu: 12, table: 8, order: 4, reservation: 3, inventory: 3, supplier: 2, payment: 2
            });
        }
    }
};

// ===== DATA ACCESS OBJECTS =====
RMS.Data = {
    // Generic CRUD
    getAll(collection) {
        return RMS.Storage.get(collection) || [];
    },

    getById(collection, id) {
        const items = this.getAll(collection);
        return items.find(item => item.id === id) || null;
    },

    add(collection, item) {
        const items = this.getAll(collection);
        items.push(item);
        RMS.Storage.set(collection, items);
        return item;
    },

    update(collection, id, updates) {
        const items = this.getAll(collection);
        const index = items.findIndex(item => item.id === id);
        if (index === -1) return null;
        items[index] = { ...items[index], ...updates };
        RMS.Storage.set(collection, items);
        return items[index];
    },

    delete(collection, id) {
        let items = this.getAll(collection);
        items = items.filter(item => item.id !== id);
        RMS.Storage.set(collection, items);
        return true;
    },

    // Generate IDs
    generateId(prefix) {
        const counters = RMS.Storage.get('counters') || {};
        const num = (counters[prefix] || 0) + 1;
        counters[prefix] = num;
        RMS.Storage.set('counters', counters);
        const pad = String(num).padStart(3, '0');
        return prefix.toUpperCase().substring(0, 3) + pad;
    },

    // Search helper
    search(collection, query, fields) {
        const items = this.getAll(collection);
        if (!query) return items;
        const q = query.toLowerCase();
        return items.filter(item => {
            return fields.some(field => {
                const val = item[field];
                return val && String(val).toLowerCase().includes(q);
            });
        });
    },

    // Filter helper
    filter(collection, filters) {
        let items = this.getAll(collection);
        Object.keys(filters).forEach(key => {
            const val = filters[key];
            if (val !== undefined && val !== null && val !== '') {
                items = items.filter(item => item[key] === val);
            }
        });
        return items;
    },

    // Sort helper
    sort(items, field, direction = 'asc') {
        return [...items].sort((a, b) => {
            const aVal = a[field] || '';
            const bVal = b[field] || '';
            if (typeof aVal === 'number') {
                return direction === 'asc' ? aVal - bVal : bVal - aVal;
            }
            const compare = String(aVal).localeCompare(String(bVal));
            return direction === 'asc' ? compare : -compare;
        });
    },

    // Pagination helper
    paginate(items, page = 1, perPage = 10) {
        const total = items.length;
        const totalPages = Math.ceil(total / perPage);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return {
            items: items.slice(start, end),
            page,
            perPage,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };
    },

    // Get count
    count(collection, filterFn = null) {
        const items = this.getAll(collection);
        return filterFn ? items.filter(filterFn).length : items.length;
    },

    // Sum helper
    sum(collection, field, filterFn = null) {
        const items = this.getAll(collection);
        const filtered = filterFn ? items.filter(filterFn) : items;
        return filtered.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);
    }
};
