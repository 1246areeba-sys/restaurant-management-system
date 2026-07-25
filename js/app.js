/* ============================================
   RESTAURANT MANAGEMENT SYSTEM - APP LOGIC
   ============================================ */

// RMS is already defined as a global var in data.js
var RMS = window.RMS || {};

// ===== UTILITY FUNCTIONS =====
RMS.Utils = {
    formatCurrency(amount) {
        const settings = RMS.Storage.get('settings') || RMS.sampleData.settings;
        const symbol = settings.currencySymbol || '₨';
        const formatted = Number(amount).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return symbol + ' ' + formatted;
    },

    formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },

    formatDateTime(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    },

    formatTime(timeStr) {
        if (!timeStr) return '';
        const [h, m] = timeStr.split(':');
        const hour = parseInt(h);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${m} ${ampm}`;
    },

    getRelativeTime(dateStr) {
        if (!dateStr) return '';
        const now = new Date();
        const d = new Date(dateStr);
        const diff = Math.floor((now - d) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
        return this.formatDate(dateStr);
    },

    generateId(prefix) {
        return RMS.Data.generateId(prefix);
    },

    today() {
        return new Date().toISOString().split('T')[0];
    },

    now() {
        return new Date().toISOString().replace('T', ' ').substring(0, 16);
    },

    getStatusBadge(status) {
        const map = {
            'available': '<span class="badge badge-success">Available</span>',
            'occupied': '<span class="badge badge-danger">Occupied</span>',
            'reserved': '<span class="badge badge-warning">Reserved</span>',
            'pending': '<span class="badge badge-warning">Pending</span>',
            'preparing': '<span class="badge badge-info">Preparing</span>',
            'ready': '<span class="badge badge-primary">Ready</span>',
            'served': '<span class="badge badge-info">Served</span>',
            'completed': '<span class="badge badge-success">Completed</span>',
            'cancelled': '<span class="badge badge-danger">Cancelled</span>',
            'paid': '<span class="badge badge-success">Paid</span>',
            'confirmed': '<span class="badge badge-success">Confirmed</span>',
            'failed': '<span class="badge badge-danger">Failed</span>',
            'refunded': '<span class="badge badge-info">Refunded</span>',
            'active': '<span class="badge badge-success">Active</span>',
            'inactive': '<span class="badge badge-secondary">Inactive</span>'
        };
        return map[status] || `<span class="badge badge-secondary">${status}</span>`;
    },

    getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
    },

    getCategoryName(catId) {
        const cat = RMS.Data.getById('categories', catId);
        return cat ? cat.name : 'Unknown';
    },

    getCustomerName(cusId) {
        const cus = RMS.Data.getById('customers', cusId);
        return cus ? cus.name : 'Walk-in Guest';
    },

    getTableNumber(tblId) {
        const tbl = RMS.Data.getById('tables', tblId);
        return tbl ? `Table #${tbl.number}` : 'N/A';
    },

    getSupplierName(supId) {
        const sup = RMS.Data.getById('suppliers', supId);
        return sup ? sup.name : 'Unknown';
    },

    getRoleColor(role) {
        const map = {
            'Waiter': '#3498db',
            'Chef': '#e67e22',
            'Cashier': '#27ae60',
            'Manager': '#9b59b6',
            'Receptionist': '#1abc9c'
        };
        return map[role] || '#95a5a6';
    },

    truncate(str, len = 50) {
        if (!str) return '';
        return str.length > len ? str.substring(0, len) + '...' : str;
    },

    debounce(func, delay = 300) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Export to CSV
    exportToCSV(data, filename = 'export.csv') {
        if (!data.length) return;
        const headers = Object.keys(data[0]);
        let csv = headers.join(',') + '\n';
        data.forEach(row => {
            const values = headers.map(h => {
                const val = row[h] || '';
                return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
            });
            csv += values.join(',') + '\n';
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        RMS.UI.showToast('Exported successfully!', 'success');
    },

    // Print element
    printElement(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        const win = window.open('', '', 'width=800,height=600');
        win.document.write('<html><head><title>Print</title>');
        win.document.write('<link rel="stylesheet" href="css/main.css">');
        win.document.write('</head><body>');
        win.document.write(el.innerHTML);
        win.document.write('</body></html>');
        win.document.close();
        win.print();
    }
};

// ===== UI HELPERS =====
RMS.UI = {
    // Toast notifications
    showToast(message, type = 'success', title = '') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const titles = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Info' };
        const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-circle', info: 'fa-info-circle' };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas ${icons[type] || icons.info}"></i></div>
            <div class="toast-content">
                <div class="toast-title">${title || titles[type] || 'Notification'}</div>
                <div class="toast-message">${message}</div>
            </div>
            <div class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></div>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    // Show confirmation dialog
    showConfirm(title, message, callback, type = 'warning') {
        const overlay = document.getElementById('modalOverlay');
        if (!overlay) return;

        const icons = { warning: 'fa-exclamation-triangle', danger: 'fa-trash-alt', info: 'fa-info-circle' };

        overlay.innerHTML = `
            <div class="modal modal-sm">
                <div class="confirm-dialog">
                    <div class="confirm-icon ${type}">
                        <i class="fas ${icons[type] || icons.warning}"></i>
                    </div>
                    <h3>${title}</h3>
                    <p>${message}</p>
                    <div class="confirm-actions">
                        <button class="btn btn-outline" onclick="RMS.UI.closeModal()">Cancel</button>
                        <button class="btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}" id="confirmBtn">
                            <i class="fas fa-check"></i> Confirm
                        </button>
                    </div>
                </div>
            </div>
        `;
        overlay.classList.add('active');

        document.getElementById('confirmBtn').onclick = function () {
            RMS.UI.closeModal();
            if (typeof callback === 'function') callback();
        };
    },

    // Show modal
    showModal(content, modalClass = '') {
        const overlay = document.getElementById('modalOverlay');
        if (!overlay) return;
        overlay.innerHTML = `
            <div class="modal ${modalClass}">
                ${content}
            </div>
        `;
        overlay.classList.add('active');
    },

    // Close modal
    closeModal() {
        const overlay = document.getElementById('modalOverlay');
        if (overlay) overlay.classList.remove('active');
    },

    // Toggle sidebar
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.toggle('collapsed');
    },

    // Mobile sidebar toggle
    toggleMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.toggle('active');
    },

    // Set active nav item
    setActiveNav(pageId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            }
        });
    },

    // Populate select dropdown
    populateSelect(selectId, data, valueField, textField, defaultOption = '-- Select --') {
        const select = document.getElementById(selectId);
        if (!select) return;
        select.innerHTML = `<option value="">${defaultOption}</option>`;
        data.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item[valueField];
            opt.textContent = item[textField];
            select.appendChild(opt);
        });
    },

    // Populate table with data
    populateTable(tableBodyId, data, rowRenderer) {
        const tbody = document.getElementById(tableBodyId);
        if (!tbody) return;
        if (!data || data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="10">
                        <div class="empty-state">
                            <i class="fas fa-inbox"></i>
                            <h3>No Data Found</h3>
                            <p>There are no records to display.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        tbody.innerHTML = data.map(rowRenderer).join('');
    },

    // Show loading spinner
    showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<div class="spinner-container"><div class="spinner"></div></div>`;
        }
    },

    // Hide loading (just remove spinner) - handled by populateTable
};

// ===== PAGE LOADER =====
RMS.Page = {
    // Initialize common elements
    initCommon() {
        // Set user info in sidebar
        const user = RMS.Storage.get('currentUser') || RMS.sampleData.currentUser;
        document.querySelectorAll('.user-name-display').forEach(el => el.textContent = user.name);
        document.querySelectorAll('.user-role-display').forEach(el => el.textContent = user.role);

        // Set initials
        document.querySelectorAll('.user-initials').forEach(el => el.textContent = RMS.Utils.getInitials(user.name));

        // Set restaurant name
        const settings = RMS.Storage.get('settings') || RMS.sampleData.settings;
        document.querySelectorAll('.restaurant-name').forEach(el => el.textContent = settings.restaurantName);
        document.querySelectorAll('.brand-text').forEach(el => el.textContent = settings.restaurantName);

        // Theme
        const theme = settings.theme || 'light';
        document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
        const themeIcon = document.getElementById('themeToggleIcon');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        // Sidebar toggle
        const toggleBtn = document.getElementById('sidebarToggle');
        if (toggleBtn) toggleBtn.onclick = RMS.UI.toggleSidebar;

        const mobileToggle = document.getElementById('mobileSidebarToggle');
        if (mobileToggle) mobileToggle.onclick = RMS.UI.toggleMobileSidebar;

        // Close modal on overlay click
        const overlay = document.getElementById('modalOverlay');
        if (overlay) {
            overlay.onclick = function (e) {
                if (e.target === this) RMS.UI.closeModal();
            };
        }

        // Apply settings
        this.applySettings();
    },

    applySettings() {
        const settings = RMS.Storage.get('settings') || RMS.sampleData.settings;
        // Theme
        if (settings.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    },

    // Load page content
    load(pageName) {
        // Mark nav active
        RMS.UI.setActiveNav(pageName);

        // Update breadcrumb
        const breadcrumb = document.getElementById('breadcrumb');
        if (breadcrumb) {
            const names = {
                dashboard: 'Dashboard',
                customers: 'Customers',
                staff: 'Staff',
                categories: 'Categories',
                menu: 'Menu',
                tables: 'Tables',
                orders: 'Orders',
                billing: 'Billing',
                payments: 'Payments',
                reservations: 'Reservations',
                inventory: 'Inventory',
                suppliers: 'Suppliers',
                reports: 'Reports',
                settings: 'Settings',
                profile: 'Profile',
                about: 'About',
                contact: 'Contact'
            };
            breadcrumb.textContent = names[pageName] || pageName;
        }

        // Page-specific init
        const initFn = `init${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;
        if (typeof RMS.Page[initFn] === 'function') {
            RMS.Page[initFn]();
        }
    }
};

// ===== THEME TOGGLE =====
RMS.Theme = {
    toggle() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        const settings = RMS.Storage.get('settings') || RMS.sampleData.settings;
        settings.theme = next;
        RMS.Storage.set('settings', settings);
        const icon = document.getElementById('themeToggleIcon');
        if (icon) icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        RMS.UI.showToast(`Switched to ${next} mode`, 'info');
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    RMS.Storage.init();
    RMS.Page.initCommon();

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.onclick = RMS.Theme.toggle;

    // Notification toggle
    const notifToggle = document.getElementById('notificationToggle');
    if (notifToggle) {
        notifToggle.onclick = function () {
            const menu = document.getElementById('notificationMenu');
            if (menu) menu.classList.toggle('active');
        };
    }

    // User dropdown toggle
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.onclick = function () {
            const menu = document.getElementById('userDropdownMenu');
            if (menu) menu.classList.toggle('active');
        };
    }

    // Close dropdowns on outside click
    document.addEventListener('click', function (e) {
        document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
            if (!menu.parentElement.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    });

    // Page init
    const pageName = document.body.dataset.page;
    if (pageName) {
        RMS.Page.load(pageName);
    }
});
