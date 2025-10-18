Almost out of storage … If you run out of space, you can't save to Drive or back up Google Photos.
# MySQL Database Setup Guide
## Barangay Emergency Response System

---

## 📋 **Database Overview**

The MySQL database includes:
- ✅ 5 main tables
- ✅ Sample data (3 test users)
- ✅ Emergency types (10 types)
- ✅ Emergency contacts (8 contacts)
- ✅ 2 views for easy querying
- ✅ 3 stored procedures
- ✅ 1 trigger

---

## 🚀 **Quick Setup (3 Steps)**

### **Step 1: Start MySQL**
1. Open XAMPP Control Panel
2. Click **Start** next to MySQL
3. Wait for green indicator

### **Step 2: Import Database**

**Option A: Using phpMyAdmin (Easiest)**
1. Open: `http://localhost/phpmyadmin`
2. Click **Import** tab
3. Click **Choose File**
4. Select: `database.sql`
5. Click **Go**
6. Done! ✅

**Option B: Using Command Line**
```bash
mysql -u root -p < database.sql
```
(Press Enter when asked for password if you don't have one)

### **Step 3: Verify**
1. Open phpMyAdmin
2. Click `barangay_emergency` database
3. You should see 5 tables

---

## 📊 **Database Structure**

### **Tables Created:**

#### **1. users**
Stores all user accounts (citizens, responders, admins)

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| email | VARCHAR(255) | Unique email |
| password | VARCHAR(255) | Password (plain text for demo) |
| first_name | VARCHAR(100) | First name |
| last_name | VARCHAR(100) | Last name |
| phone | VARCHAR(20) | Phone number |
| role | ENUM | citizen, responder, admin |
| barangay | VARCHAR(100) | Barangay name |
| address | TEXT | Full address |
| is_active | BOOLEAN | Account status |
| created_at | TIMESTAMP | Registration date |
| updated_at | TIMESTAMP | Last update |

#### **2. emergency_types**
Types of emergencies (Fire, Medical, etc.)

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(100) | Type name |
| icon | VARCHAR(50) | Font Awesome icon |
| color | VARCHAR(20) | Hex color code |
| priority | ENUM | low, medium, high, critical |
| is_active | BOOLEAN | Active status |
| created_at | TIMESTAMP | Creation date |

#### **3. emergencies**
All emergency reports

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| reporter_id | INT | Foreign key to users |
| emergency_type_id | INT | Foreign key to emergency_types |
| title | VARCHAR(255) | Emergency title |
| description | TEXT | Detailed description |
| latitude | DECIMAL(10,8) | GPS latitude |
| longitude | DECIMAL(11,8) | GPS longitude |
| address | TEXT | Location address |
| priority | ENUM | low, medium, high, critical |
| status | ENUM | pending, acknowledged, responding, resolved, cancelled |
| victim_count | INT | Number of victims |
| assigned_responder_id | INT | Foreign key to users (responder) |
| images | TEXT | JSON array of image URLs |
| created_at | TIMESTAMP | Report date |
| updated_at | TIMESTAMP | Last update |
| resolved_at | TIMESTAMP | Resolution date |

#### **4. emergency_updates**
Timeline of updates for each emergency

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| emergency_id | INT | Foreign key to emergencies |
| user_id | INT | Foreign key to users |
| message | TEXT | Update message |
| created_at | TIMESTAMP | Update date |

#### **5. emergency_contacts**
Emergency hotlines and contacts

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(255) | Contact name |
| organization | VARCHAR(255) | Organization name |
| phone | VARCHAR(50) | Phone number |
| email | VARCHAR(255) | Email address |
| type | ENUM | police, fire, medical, rescue, utility, other |
| address | TEXT | Physical address |
| is_active | BOOLEAN | Active status |
| display_order | INT | Sort order |
| created_at | TIMESTAMP | Creation date |

---

## 🔍 **Views Created**

### **1. emergency_details**
Complete emergency information with user details
```sql
SELECT * FROM emergency_details;
```

### **2. emergency_statistics**
System-wide statistics
```sql
SELECT * FROM emergency_statistics;
```

---

## ⚙️ **Stored Procedures**

### **1. create_emergency**
Create new emergency and add initial update
```sql
CALL create_emergency(
    3,                    -- reporter_id
    1,                    -- emergency_type_id (Fire)
    'House Fire',         -- title
    'Fire in building',   -- description
    14.5995,             -- latitude
    120.9842,            -- longitude
    '123 Main St',       -- address
    'critical',          -- priority
    2                    -- victim_count
);
```

### **2. update_emergency_status**
Update emergency status and add update
```sql
CALL update_emergency_status(
    1,                   -- emergency_id
    2,                   -- user_id (responder)
    'responding',        -- new status
    'On the way'        -- message
);
```

### **3. assign_responder**
Assign responder to emergency
```sql
CALL assign_responder(
    1,                   -- emergency_id
    2,                   -- responder_id
    1                    -- admin_id
);
```

---

## 📝 **Sample Queries**

### **Get all pending emergencies:**
```sql
SELECT * FROM emergency_details 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

### **Get emergencies by reporter:**
```sql
SELECT * FROM emergency_details 
WHERE reporter_id = 3;
```

### **Get critical emergencies:**
```sql
SELECT * FROM emergency_details 
WHERE priority = 'critical' 
AND status != 'resolved';
```

### **Get responder's assignments:**
```sql
SELECT * FROM emergency_details 
WHERE assigned_responder_id = 2;
```

### **Get emergency with updates:**
```sql
SELECT 
    e.*,
    u.message,
    u.created_at AS update_time,
    CONCAT(us.first_name, ' ', us.last_name) AS updater_name
FROM emergencies e
LEFT JOIN emergency_updates u ON e.id = u.emergency_id
LEFT JOIN users us ON u.user_id = us.id
WHERE e.id = 1
ORDER BY u.created_at DESC;
```

### **Get statistics:**
```sql
SELECT * FROM emergency_statistics;
```

### **Count emergencies by type:**
```sql
SELECT 
    et.name,
    COUNT(e.id) AS count
FROM emergency_types et
LEFT JOIN emergencies e ON et.id = e.emergency_type_id
GROUP BY et.id, et.name
ORDER BY count DESC;
```

### **Get today's emergencies:**
```sql
SELECT * FROM emergency_details 
WHERE DATE(created_at) = CURDATE();
```

---

## 🔐 **Default Test Accounts**

| Role | Email | Password | ID |
|------|-------|----------|-----|
| Admin | admin@barangay.local | admin123 | 1 |
| Responder | responder@barangay.local | responder123 | 2 |
| Citizen | citizen@barangay.local | citizen123 | 3 |

---

## 🛠 **Common Operations**

### **Add new user:**
```sql
INSERT INTO users (email, password, first_name, last_name, phone, role, barangay)
VALUES ('newuser@example.com', 'password123', 'John', 'Doe', '09123456789', 'citizen', 'Barangay 1');
```

### **Add new emergency type:**
```sql
INSERT INTO emergency_types (name, icon, color, priority)
VALUES ('Earthquake', 'house-damage', '#795548', 'critical');
```

### **Add new contact:**
```sql
INSERT INTO emergency_contacts (name, organization, phone, type)
VALUES ('Barangay Hall', 'Barangay Office', '(02) 1234-5678', 'other');
```

### **Update emergency status:**
```sql
UPDATE emergencies 
SET status = 'resolved', resolved_at = NOW() 
WHERE id = 1;
```

### **Deactivate user:**
```sql
UPDATE users 
SET is_active = FALSE 
WHERE id = 5;
```

---

## 📊 **Database Relationships**

```
users (reporter) ──┐
                   ├──> emergencies
emergency_types ───┘        │
                            ├──> emergency_updates
users (responder) ──────────┘
```

---

## 🔄 **Backup & Restore**

### **Backup Database:**
```bash
mysqldump -u root -p barangay_emergency > backup.sql
```

### **Restore Database:**
```bash
mysql -u root -p barangay_emergency < backup.sql
```

---

## 🧪 **Testing the Database**

### **Test 1: Create Emergency**
```sql
CALL create_emergency(3, 2, 'Medical Emergency', 'Person needs help', 14.6000, 120.9850, '456 Oak Ave', 'critical', 1);
```

### **Test 2: View Emergency**
```sql
SELECT * FROM emergency_details WHERE id = LAST_INSERT_ID();
```

### **Test 3: Update Status**
```sql
CALL update_emergency_status(LAST_INSERT_ID(), 2, 'responding', 'Ambulance dispatched');
```

### **Test 4: View Statistics**
```sql
SELECT * FROM emergency_statistics;
```

---

## ⚠️ **Important Notes**

### **Security:**
- ⚠️ Passwords are stored in plain text (for demo only)
- ⚠️ For production, use password hashing (bcrypt, etc.)
- ⚠️ Add proper input validation
- ⚠️ Use prepared statements to prevent SQL injection

### **Performance:**
- ✅ Indexes added on frequently queried columns
- ✅ Foreign keys for data integrity
- ✅ Views for complex queries
- ✅ Stored procedures for common operations

### **Maintenance:**
- 🔄 Regular backups recommended
- 🔄 Monitor database size
- 🔄 Clean old resolved emergencies periodically
- 🔄 Update statistics regularly

---

## 🐛 **Troubleshooting**

### **Error: Database exists**
```sql
DROP DATABASE barangay_emergency;
-- Then re-import database.sql
```

### **Error: Access denied**
- Check MySQL is running
- Verify username/password
- Check user permissions

### **Error: Cannot create table**
- Check if tables already exist
- Drop existing tables first
- Check MySQL version compatibility

---

## 📚 **Next Steps**

After setting up the database:

1. ✅ Database is ready
2. ✅ Test accounts created
3. ✅ Sample data loaded
4. ✅ Ready to connect from your app

**To connect from PHP/Node.js:**
- Host: `localhost`
- Database: `barangay_emergency`
- User: `root`
- Password: (empty or your MySQL password)
- Port: `3306`

---

## 🎉 **Database Setup Complete!**

Your MySQL database is now ready to use with the Barangay Emergency Response System!

**Next:** Connect your HTML/JS app to this database using a backend (PHP, Node.js, etc.)
