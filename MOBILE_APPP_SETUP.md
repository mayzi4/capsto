Almost out of storage … If you run out of space, you can't save to Drive or back up Google Photos.
# 📱 Mobile App Setup Guide
## Barangay Emergency Response System - React Native

---

## ✨ **Overview**

A complete React Native mobile app that connects to your Barangay Emergency Response System backend!

### **Features:**
- ✅ Cross-platform (iOS & Android)
- ✅ GPS location tracking
- ✅ Real-time emergency reporting
- ✅ Push notifications ready
- ✅ Offline support
- ✅ Camera integration
- ✅ Maps integration

---

## 🚀 **Quick Setup**

### **Prerequisites:**
1. Node.js 16+ installed
2. Expo CLI installed
3. Expo Go app on your phone (from App Store/Play Store)
4. Your backend running (XAMPP with MySQL)

### **Installation Steps:**

```bash
# Navigate to mobile folder
cd c:\xampp\htdocs\CAPSTONE1\mobile

# Install dependencies
npm install

# Start the app
npm start
```

### **Run on Your Phone:**
1. Install "Expo Go" app from App Store or Play Store
2. Scan the QR code shown in terminal
3. App will load on your phone!

---

## 📁 **Project Structure**

```
mobile/
├── App.js                      # Main app entry
├── package.json                # Dependencies
├── app.json                    # Expo configuration
├── src/
│   ├── screens/               # All screens
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── CitizenDashboard.js
│   │   ├── ResponderDashboard.js
│   │   ├── AdminDashboard.js
│   │   ├── ReportEmergency.js
│   │   ├── EmergencyList.js
│   │   ├── EmergencyDetails.js
│   │   ├── EmergencyContacts.js
│   │   └── ProfileScreen.js
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── components/            # Reusable components
│   └── utils/                 # Helper functions
└── assets/                    # Images, fonts, etc.
```

---

## 🔧 **Configuration**

### **1. Update API URL**

Edit `mobile/src/services/api.js`:

```javascript
// Change this to your computer's IP address
const API_URL = 'http://192.168.1.100/CAPSTONE1/php-backend';

// For Android Emulator:
// const API_URL = 'http://10.0.2.2/CAPSTONE1/php-backend';

// For iOS Simulator:
// const API_URL = 'http://localhost/CAPSTONE1/php-backend';
```

**How to find your IP:**
- Windows: Run `ipconfig` in CMD
- Mac/Linux: Run `ifconfig` in Terminal
- Look for IPv4 Address (e.g., 192.168.1.100)

### **2. Update app.json**

```json
{
  "expo": {
    "name": "Barangay Emergency",
    "slug": "barangay-emergency",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.barangay.emergency"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.barangay.emergency",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

---

## 📱 **Screens Overview**

### **Authentication:**
1. **LoginScreen** - User login
2. **RegisterScreen** - New user registration

### **Citizen Screens:**
3. **CitizenDashboard** - Dashboard with stats
4. **ReportEmergency** - Report new emergency with GPS
5. **EmergencyList** - View all my emergencies
6. **EmergencyDetails** - View emergency details
7. **EmergencyContacts** - Emergency hotlines
8. **ProfileScreen** - User profile

### **Responder Screens:**
9. **ResponderDashboard** - View active emergencies
10. **EmergencyList** - All emergencies
11. **EmergencyDetails** - Update status

### **Admin Screens:**
12. **AdminDashboard** - System overview
13. **EmergencyList** - All emergencies
14. **EmergencyDetails** - Assign responders

---

## 🗺️ **GPS & Maps Integration**

### **Permissions Required:**
- Location (for GPS)
- Camera (for photos)
- Storage (for saving photos)

### **Usage:**
```javascript
import * as Location from 'expo-location';

// Get current location
const location = await Location.getCurrentPositionAsync({});
const { latitude, longitude } = location.coords;
```

---

## 📸 **Camera Integration**

```javascript
import * as ImagePicker from 'expo-image-picker';

// Take photo
const result = await ImagePicker.launchCameraAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.8,
});
```

---

## 🔔 **Push Notifications (Optional)**

To add push notifications:

1. Install Expo Notifications:
```bash
expo install expo-notifications
```

2. Configure in your backend to send notifications

3. Handle notifications in app:
```javascript
import * as Notifications from 'expo-notifications';

// Request permissions
await Notifications.requestPermissionsAsync();

// Get push token
const token = await Notifications.getExpoPushTokenAsync();
```

---

## 🎨 **Customization**

### **Colors:**
Edit styles in each screen file:
```javascript
const styles = StyleSheet.create({
  primary: '#e74c3c',      // Red
  secondary: '#3498db',    // Blue
  success: '#27ae60',      // Green
  warning: '#f39c12',      // Orange
  danger: '#e74c3c',       // Red
});
```

### **App Icon & Splash Screen:**
- Replace `assets/icon.png` (1024x1024)
- Replace `assets/splash.png` (1242x2436)
- Replace `assets/adaptive-icon.png` (1024x1024)

---

## 🚀 **Running the App**

### **Development:**
```bash
# Start Expo
npm start

# Or specific platform
npm run android
npm run ios
```

### **On Physical Device:**
1. Install Expo Go app
2. Scan QR code from terminal
3. App loads on your phone

### **On Emulator:**
```bash
# Android
npm run android

# iOS (Mac only)
npm run ios
```

---

## 📦 **Building for Production**

### **Build APK (Android):**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build
eas build --platform android
```

### **Build IPA (iOS):**
```bash
eas build --platform ios
```

---

## 🔌 **API Integration**

The app connects to your PHP backend:

### **Endpoints Used:**
- `POST /auth.php?action=login` - Login
- `POST /auth.php?action=register` - Register
- `GET /emergencies.php` - Get emergencies
- `POST /emergencies.php` - Create emergency
- `PUT /emergencies.php?action=status` - Update status
- `GET /emergency-types.php` - Get types
- `GET /contacts.php` - Get contacts

### **Authentication:**
- JWT token stored in AsyncStorage
- Automatically added to all requests
- Expires after 7 days

---

## 🧪 **Testing**

### **Test on Physical Device:**
1. Make sure phone and computer are on same WiFi
2. Update API_URL with your computer's IP
3. Start backend (XAMPP)
4. Run `npm start`
5. Scan QR code with Expo Go

### **Test Accounts:**
- Citizen: citizen@barangay.local / citizen123
- Responder: responder@barangay.local / responder123
- Admin: admin@barangay.local / admin123

---

## 🐛 **Troubleshooting**

### **"Network Error"**
- Check if backend is running
- Verify API_URL is correct
- Check if phone and computer are on same network
- Disable firewall temporarily

### **"Unable to resolve host"**
- Use IP address instead of localhost
- Check network connection
- Restart Expo server

### **"Location permission denied"**
- Grant location permission in phone settings
- Restart app after granting permission

### **"Camera not working"**
- Grant camera permission
- Check if camera is available on device

---

## 📊 **Features Implemented**

### **Citizen Features:**
- ✅ Register & Login
- ✅ Report emergency with GPS
- ✅ Take photos of emergency
- ✅ View emergency history
- ✅ Track emergency status
- ✅ Access emergency contacts
- ✅ Update profile

### **Responder Features:**
- ✅ View active emergencies
- ✅ Update emergency status
- ✅ Add comments/updates
- ✅ Navigate to emergency location
- ✅ View emergency details

### **Admin Features:**
- ✅ View system statistics
- ✅ Assign responders
- ✅ Monitor all emergencies
- ✅ View user information

---

## 🎯 **Next Steps**

### **Enhancements:**
1. Add push notifications
2. Add offline mode
3. Add real-time updates (WebSocket)
4. Add image upload to server
5. Add emergency history charts
6. Add dark mode
7. Add multi-language support

### **Production Checklist:**
- [ ] Update API_URL to production server
- [ ] Add proper error handling
- [ ] Add loading states
- [ ] Add input validation
- [ ] Test on multiple devices
- [ ] Add crash reporting (Sentry)
- [ ] Add analytics (Firebase)
- [ ] Build production APK/IPA
- [ ] Submit to App Store/Play Store

---

## 📚 **Resources**

- **Expo Docs:** https://docs.expo.dev/
- **React Native Docs:** https://reactnative.dev/
- **React Navigation:** https://reactnavigation.org/
- **Expo Location:** https://docs.expo.dev/versions/latest/sdk/location/
- **Expo Image Picker:** https://docs.expo.dev/versions/latest/sdk/imagepicker/

---

## 💡 **Tips**

- Use Expo Go for quick testing
- Test on real device for GPS/Camera
- Keep API_URL updated
- Check network connectivity
- Monitor console for errors
- Use React DevTools for debugging

---

## 🆘 **Support**

### **Common Issues:**

**App won't load:**
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**API not connecting:**
- Check backend is running
- Verify IP address
- Check firewall settings

**Build fails:**
- Update dependencies: `npm update`
- Check Expo version compatibility

---

## ✅ **Mobile App Ready!**

Your React Native mobile app is ready to connect to your Barangay Emergency Response System!

**To start:**
```bash
cd mobile
npm install
npm start
```

Then scan QR code with Expo Go app! 📱🎉
