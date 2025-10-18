Almost out of storage … If you run out of space, you can't save to Drive or back up Google Photos.
// Barangay Emergency Response System - Main JavaScript
// Using localStorage for data persistence

// Initialize app data structure
function initializeApp() {
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: 1,
                email: 'admin@barangay.local',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'User',
                phone: '09123456789',
                role: 'admin',
                barangay: 'Barangay 1',
                address: 'Admin Office',
                isActive: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                email: 'responder@barangay.local',
                password: 'responder123',
                firstName: 'Juan',
                lastName: 'Responder',
                phone: '09123456788',
                role: 'responder',
                barangay: 'Barangay 1',
                address: 'Responder Station',
                isActive: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                email: 'citizen@barangay.local',
                password: 'citizen123',
                firstName: 'Maria',
                lastName: 'Citizen',
                phone: '09123456787',
                role: 'citizen',
                barangay: 'Barangay 1',
                address: '123 Main Street',
                isActive: true,
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('emergencies')) {
        localStorage.setItem('emergencies', JSON.stringify([]));
    }

    if (!localStorage.getItem('emergencyTypes')) {
        const emergencyTypes = [
            { id: 1, name: 'Fire', icon: 'fire', color: '#FF5722', priority: 'critical' },
            { id: 2, name: 'Medical', icon: 'ambulance', color: '#F44336', priority: 'critical' },
            { id: 3, name: 'Crime', icon: 'shield-alt', color: '#E91E63', priority: 'high' },
            { id: 4, name: 'Accident', icon: 'car-crash', color: '#FF9800', priority: 'high' },
            { id: 5, name: 'Flood', icon: 'water', color: '#2196F3', priority: 'high' },
            { id: 6, name: 'Power Outage', icon: 'bolt', color: '#9C27B0', priority: 'medium' },
            { id: 7, name: 'Gas Leak', icon: 'exclamation-triangle', color: '#FF5722', priority: 'critical' },
            { id: 8, name: 'Natural Disaster', icon: 'cloud-showers-heavy', color: '#F44336', priority: 'critical' },
            { id: 9, name: 'Missing Person', icon: 'user-times', color: '#FF9800', priority: 'high' },
            { id: 10, name: 'Other', icon: 'circle', color: '#607D8B', priority: 'medium' }
        ];
        localStorage.setItem('emergencyTypes', JSON.stringify(emergencyTypes));
    }

    if (!localStorage.getItem('emergencyContacts')) {
        const contacts = [
            { id: 1, name: 'Emergency Hotline', organization: 'Barangay Emergency Response', phone: '911', type: 'other' },
            { id: 2, name: 'Police Station', organization: 'Philippine National Police', phone: '117', type: 'police' },
            { id: 3, name: 'Fire Department', organization: 'Bureau of Fire Protection', phone: '(02) 8426-0219', type: 'fire' },
            { id: 4, name: 'Medical Emergency', organization: 'Emergency Medical Services', phone: '(02) 8527-5174', type: 'medical' },
            { id: 5, name: 'Red Cross', organization: 'Philippine Red Cross', phone: '143', type: 'medical' },
            { id: 6, name: 'NDRRMC', organization: 'National Disaster Risk Reduction', phone: '(02) 8911-5061', type: 'rescue' },
            { id: 7, name: 'Coast Guard', organization: 'Philippine Coast Guard', phone: '(02) 8527-8481', type: 'rescue' },
            { id: 8, name: 'MMDA', organization: 'Metro Manila Development Authority', phone: '136', type: 'utility' }
        ];
        localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
    }
}

// Helper Functions
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
    alertContainer.innerHTML = `
        <div class="alert ${alertClass}">
            ${message}
        </div>
    `;
    
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getStatusBadge(status) {
    const badges = {
        'pending': 'badge-pending',
        'acknowledged': 'badge-acknowledged',
        'responding': 'badge-responding',
        'resolved': 'badge-resolved',
        'cancelled': 'badge-cancelled'
    };
    return badges[status] || 'badge-pending';
}

function getPriorityBadge(priority) {
    const badges = {
        'low': 'badge-low',
        'medium': 'badge-medium',
        'high': 'badge-high',
        'critical': 'badge-critical'
    };
    return badges[priority] || 'badge-medium';
}

function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

function isAuthenticated() {
    return !!getCurrentUser();
}

function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function redirectToDashboard() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    switch(user.role) {
        case 'admin':
            window.location.href = 'admin-dashboard.html';
            break;
        case 'responder':
            window.location.href = 'responder-dashboard.html';
            break;
        case 'citizen':
            window.location.href = 'citizen-dashboard.html';
            break;
        default:
            window.location.href = 'login.html';
    }
}

// Authentication Functions
function register(formData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === formData.email)) {
        showAlert('Email already registered', 'danger');
        return false;
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        role: 'citizen',
        barangay: formData.barangay,
        address: formData.address,
        isActive: true,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    const userForStorage = { ...newUser };
    delete userForStorage.password;
    localStorage.setItem('currentUser', JSON.stringify(userForStorage));
    
    showAlert('Registration successful! Redirecting...', 'success');
    setTimeout(() => {
        window.location.href = 'citizen-dashboard.html';
    }, 1500);
    
    return true;
}

function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showAlert('Invalid email or password', 'danger');
        return false;
    }
    
    if (!user.isActive) {
        showAlert('Account is deactivated', 'danger');
        return false;
    }
    
    // Store user (without password)
    const userForStorage = { ...user };
    delete userForStorage.password;
    localStorage.setItem('currentUser', JSON.stringify(userForStorage));
    
    showAlert('Login successful! Redirecting...', 'success');
    setTimeout(() => {
        redirectToDashboard();
    }, 1500);
    
    return true;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Emergency Functions
function createEmergency(emergencyData) {
    const emergencies = JSON.parse(localStorage.getItem('emergencies') || '[]');
    const user = getCurrentUser();
    
    const newEmergency = {
        id: emergencies.length + 1,
        reporterId: user.id,
        reporterName: `${user.firstName} ${user.lastName}`,
        reporterPhone: user.phone,
        typeId: emergencyData.typeId,
        typeName: emergencyData.typeName,
        title: emergencyData.title,
        description: emergencyData.description,
        latitude: emergencyData.latitude,
        longitude: emergencyData.longitude,
        address: emergencyData.address,
        priority: emergencyData.priority,
        victimCount: emergencyData.victimCount || 0,
        status: 'pending',
        assignedResponderId: null,
        assignedResponderName: null,
        images: emergencyData.images || [],
        updates: [
            {
                id: 1,
                userId: user.id,
                userName: `${user.firstName} ${user.lastName}`,
                message: 'Emergency reported',
                timestamp: new Date().toISOString()
            }
        ],
        createdAt: new Date().toISOString(),
        resolvedAt: null
    };
    
    emergencies.push(newEmergency);
    localStorage.setItem('emergencies', JSON.stringify(emergencies));
    
    return newEmergency;
}

function getEmergencies(filters = {}) {
    let emergencies = JSON.parse(localStorage.getItem('emergencies') || '[]');
    const user = getCurrentUser();
    
    // Filter by role
    if (user.role === 'citizen') {
        emergencies = emergencies.filter(e => e.reporterId === user.id);
    }
    
    // Apply additional filters
    if (filters.status) {
        emergencies = emergencies.filter(e => e.status === filters.status);
    }
    
    if (filters.priority) {
        emergencies = emergencies.filter(e => e.priority === filters.priority);
    }
    
    // Sort by date (newest first)
    emergencies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return emergencies;
}

function getEmergencyById(id) {
    const emergencies = JSON.parse(localStorage.getItem('emergencies') || '[]');
    return emergencies.find(e => e.id === parseInt(id));
}

function updateEmergencyStatus(id, status, message) {
    const emergencies = JSON.parse(localStorage.getItem('emergencies') || '[]');
    const user = getCurrentUser();
    const index = emergencies.findIndex(e => e.id === parseInt(id));
    
    if (index === -1) return false;
    
    emergencies[index].status = status;
    if (status === 'resolved') {
        emergencies[index].resolvedAt = new Date().toISOString();
    }
    
    // Add update
    emergencies[index].updates.push({
        id: emergencies[index].updates.length + 1,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        message: message || `Status changed to ${status}`,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('emergencies', JSON.stringify(emergencies));
    return true;
}

function assignResponder(emergencyId, responderId) {
    const emergencies = JSON.parse(localStorage.getItem('emergencies') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = getCurrentUser();
    
    const emergencyIndex = emergencies.findIndex(e => e.id === parseInt(emergencyId));
    const responder = users.find(u => u.id === parseInt(responderId));
    
    if (emergencyIndex === -1 || !responder) return false;
    
    emergencies[emergencyIndex].assignedResponderId = responder.id;
    emergencies[emergencyIndex].assignedResponderName = `${responder.firstName} ${responder.lastName}`;
    emergencies[emergencyIndex].status = 'acknowledged';
    
    // Add update
    emergencies[emergencyIndex].updates.push({
        id: emergencies[emergencyIndex].updates.length + 1,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        message: `Assigned to ${responder.firstName} ${responder.lastName}`,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('emergencies', JSON.stringify(emergencies));
    return true;
}

// Initialize app on load
initializeApp();
