Almost out of storage … If you run out of space, you can't save to Drive or back up Google Photos.
# Barangay Emergency Response System
## Pure HTML, CSS, JavaScript Version

---

## ✨ **Overview**

A complete emergency response system built with **ONLY HTML, CSS, and JavaScript**. No backend server required - all data is stored in browser localStorage!

---

## 🚀 **Quick Start**

### **Super Simple - Just 2 Steps!**

1. **Open the folder in a browser:**
   - Navigate to: `c:\xampp\htdocs\CAPSTONE1\`
   - Double-click `index.html`

2. **Or use a local server:**
   - Open with Live Server in VS Code
   - Or use XAMPP: `http://localhost/CAPSTONE1/`

**That's it!** No installation, no setup, no backend server needed! 🎉

---

## 📋 **Features**

### **For Citizens:**
- ✅ Register & Login
- ✅ Report emergencies with GPS location
- ✅ Track emergency status in real-time
- ✅ View emergency history
- ✅ Access emergency contacts

### **For Responders:**
- ✅ View all active emergencies
- ✅ Update emergency status
- ✅ Add comments and updates
- ✅ View emergency details

### **For Admins:**
- ✅ View system statistics
- ✅ Assign responders to emergencies
- ✅ Monitor all activities
- ✅ Manage emergency contacts

---

## 🔐 **Test Accounts**

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@barangay.local | admin123 |
| **Responder** | responder@barangay.local | responder123 |
| **Citizen** | citizen@barangay.local | citizen123 |

---

## 📁 **Project Structure**

```
CAPSTONE1/
├── index.html              # Landing page
├── login.html              # Login page
├── register.html           # Registration page
├── citizen-dashboard.html  # Citizen dashboard
├── responder-dashboard.html # Responder dashboard
├── admin-dashboard.html    # Admin dashboard
├── report-emergency.html   # Emergency reporting
├── my-emergencies.html     # Emergency history
├── emergency-contacts.html # Emergency contacts
├── css/
│   └── style.css          # All styles
└── js/
    └── app.js             # All JavaScript logic
```

---

## 🛠 **Technology Stack**

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Data Storage** | localStorage (browser) |
| **Icons** | Font Awesome 6.4.0 |
| **Maps** | Geolocation API |

---

## 🎯 **How It Works**

### **Data Storage:**
- All data stored in browser's `localStorage`
- No database required
- Data persists across sessions
- Each user's data is isolated

### **Authentication:**
- Simple email/password login
- Session stored in localStorage
- Role-based access control

### **Emergency Reporting:**
- GPS location capture via browser
- Real-time status updates
- Emergency type categorization

---

## 📱 **Pages Overview**

### **Public Pages:**
1. **index.html** - Landing page with features
2. **login.html** - User login
3. **register.html** - New user registration

### **Citizen Pages:**
4. **citizen-dashboard.html** - Dashboard with stats
5. **report-emergency.html** - Report new emergency
6. **my-emergencies.html** - View all my emergencies
7. **emergency-contacts.html** - Emergency hotlines

### **Responder Pages:**
8. **responder-dashboard.html** - View active emergencies
9. **emergency-contacts.html** - Emergency hotlines

### **Admin Pages:**
10. **admin-dashboard.html** - System overview
11. **emergency-contacts.html** - Emergency hotlines

---

## 🔧 **Key Functions**

### **In `js/app.js`:**

**Authentication:**
- `register(formData)` - Register new user
- `login(email, password)` - User login
- `logout()` - User logout
- `getCurrentUser()` - Get logged-in user

**Emergency Management:**
- `createEmergency(data)` - Report emergency
- `getEmergencies(filters)` - Get emergencies
- `getEmergencyById(id)` - Get specific emergency
- `updateEmergencyStatus(id, status, message)` - Update status
- `assignResponder(emergencyId, responderId)` - Assign responder

**Utilities:**
- `formatDate(dateString)` - Format dates
- `getStatusBadge(status)` - Get status badge class
- `getPriorityBadge(priority)` - Get priority badge class
- `showAlert(message, type)` - Show alert messages

---

## 🌟 **Features Explained**

### **1. Emergency Reporting**
- Click "Report Emergency"
- Select emergency type
- Fill in details
- Click "Use Current Location" for GPS
- Submit report

### **2. Status Updates (Responders)**
- View active emergencies
- Click "Update Status"
- Change status (Acknowledged → Responding → Resolved)
- Add message
- Submit

### **3. Responder Assignment (Admin)**
- View pending emergencies
- Click "Assign"
- Select responder
- Submit assignment

### **4. Real-time Updates**
- Auto-refresh every 30 seconds
- View updates timeline
- Track emergency progress

---

## 💾 **Data Structure**

### **localStorage Keys:**

**users** - Array of user objects:
```javascript
{
  id: 1,
  email: "user@example.com",
  password: "password",
  firstName: "John",
  lastName: "Doe",
  phone: "09123456789",
  role: "citizen",
  barangay: "Barangay 1",
  address: "123 Street",
  isActive: true,
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**emergencies** - Array of emergency objects:
```javascript
{
  id: 1,
  reporterId: 1,
  reporterName: "John Doe",
  typeId: 1,
  typeName: "Fire",
  title: "Building Fire",
  description: "Fire in building",
  latitude: "14.5995",
  longitude: "120.9842",
  address: "123 Street",
  priority: "critical",
  status: "pending",
  assignedResponderId: null,
  updates: [...],
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

**emergencyTypes** - Array of emergency types
**emergencyContacts** - Array of emergency contacts
**currentUser** - Currently logged-in user object

---

## 🔒 **Security Notes**

⚠️ **Important:** This is a demo/prototype system using localStorage.

**For Production:**
- ❌ Don't use localStorage for sensitive data
- ❌ Don't store passwords in plain text
- ✅ Use a real backend with database
- ✅ Implement proper authentication
- ✅ Use HTTPS
- ✅ Hash passwords
- ✅ Validate all inputs

---

## 🌐 **Browser Compatibility**

Works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Requirements:**
- JavaScript enabled
- localStorage enabled
- Geolocation API (for GPS)

---

## 📱 **Mobile Responsive**

- ✅ Fully responsive design
- ✅ Works on phones and tablets
- ✅ Touch-friendly interface
- ✅ Mobile-optimized layouts

---

## 🎨 **Customization**

### **Change Colors:**
Edit `css/style.css` - CSS variables at top:
```css
:root {
    --primary-color: #e74c3c;
    --secondary-color: #3498db;
    --success-color: #27ae60;
    /* ... */
}
```

### **Add Emergency Types:**
Edit `js/app.js` - `emergencyTypes` array in `initializeApp()`

### **Add Emergency Contacts:**
Edit `js/app.js` - `contacts` array in `initializeApp()`

---

## 🐛 **Troubleshooting**

### **Can't login?**
- Check if JavaScript is enabled
- Check browser console for errors
- Try clearing localStorage: `localStorage.clear()`

### **Data not saving?**
- Check if localStorage is enabled
- Check browser storage limits
- Try incognito/private mode

### **GPS not working?**
- Allow location access in browser
- Use HTTPS (or localhost)
- Check browser permissions

---

## 📊 **Advantages**

✅ **No Backend Required** - Pure frontend
✅ **No Installation** - Just open HTML files
✅ **No Database** - Uses localStorage
✅ **Fast** - Everything runs locally
✅ **Simple** - Easy to understand
✅ **Portable** - Works anywhere
✅ **Free Hosting** - Host on GitHub Pages, Netlify, etc.

---

## 🎓 **Perfect For:**

- ✅ Learning web development
- ✅ Prototyping ideas
- ✅ School projects
- ✅ Capstone projects
- ✅ Portfolio demonstrations
- ✅ Quick MVPs

---

## 🚀 **Deployment**

### **GitHub Pages:**
1. Push to GitHub
2. Enable GitHub Pages
3. Access at: `https://yourusername.github.io/CAPSTONE1/`

### **Netlify:**
1. Drag and drop folder to Netlify
2. Get instant URL

### **Any Web Host:**
- Just upload all files
- No server-side requirements
- Works with any static hosting

---

## 📝 **Notes**

- Data is stored per browser
- Clearing browser data will delete all records
- Not suitable for production without backend
- Great for demos and prototypes
- Can be converted to use real backend later

---

## 🔄 **Future Enhancements**

Want to make it production-ready?
- Add real backend (Node.js, PHP, Python)
- Use real database (MySQL, MongoDB)
- Implement proper authentication
- Add image upload functionality
- Integrate real Google Maps
- Add SMS/Email notifications
- Implement real-time with WebSockets

---

## 💡 **Tips**

- Use Chrome DevTools to inspect localStorage
- Test with different user roles
- Try on mobile devices
- Check browser console for any errors
- Bookmark test account credentials

---

## ✨ **Credits**

- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **Geolocation API** - GPS functionality

---

**Built with ❤️ using only HTML, CSS, and JavaScript**

**No frameworks, no libraries, no backend - just pure web technologies!** 🎉
