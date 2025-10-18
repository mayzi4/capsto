Almost out of storage … If you run out of space, you can't save to Drive or back up Google Photos.
-- Barangay Emergency Response System Database Schema
-- MySQL Database

-- Create database
CREATE DATABASE IF NOT EXISTS barangay_emergency;
USE barangay_emergency;

-- Drop tables if they exist (for clean installation)
DROP TABLE IF EXISTS emergency_updates;
DROP TABLE IF EXISTS emergencies;
DROP TABLE IF EXISTS emergency_contacts;
DROP TABLE IF EXISTS emergency_types;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('citizen', 'responder', 'admin') DEFAULT 'citizen',
    barangay VARCHAR(100),
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_barangay (barangay)
);

-- Emergency types table
CREATE TABLE emergency_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(20),
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Emergencies table
CREATE TABLE emergencies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reporter_id INT NOT NULL,
    emergency_type_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('pending', 'acknowledged', 'responding', 'resolved', 'cancelled') DEFAULT 'pending',
    victim_count INT DEFAULT 0,
    assigned_responder_id INT,
    images TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (emergency_type_id) REFERENCES emergency_types(id),
    FOREIGN KEY (assigned_responder_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_reporter (reporter_id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_created (created_at)
);

-- Emergency updates table
CREATE TABLE emergency_updates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    emergency_id INT NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (emergency_id) REFERENCES emergencies(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_emergency (emergency_id),
    INDEX idx_created (created_at)
);

-- Emergency contacts table
CREATE TABLE emergency_contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    type ENUM('police', 'fire', 'medical', 'rescue', 'utility', 'other') DEFAULT 'other',
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (type)
);

-- Insert default users
INSERT INTO users (email, password, first_name, last_name, phone, role, barangay, address) VALUES
('admin@barangay.local', 'admin123', 'Admin', 'User', '09123456789', 'admin', 'Barangay 1', 'Admin Office'),
('responder@barangay.local', 'responder123', 'Juan', 'Responder', '09123456788', 'responder', 'Barangay 1', 'Responder Station'),
('citizen@barangay.local', 'citizen123', 'Maria', 'Citizen', '09123456787', 'citizen', 'Barangay 1', '123 Main Street');

-- Insert emergency types
INSERT INTO emergency_types (name, icon, color, priority) VALUES
('Fire', 'fire', '#FF5722', 'critical'),
('Medical', 'ambulance', '#F44336', 'critical'),
('Crime', 'shield-alt', '#E91E63', 'high'),
('Accident', 'car-crash', '#FF9800', 'high'),
('Flood', 'water', '#2196F3', 'high'),
('Power Outage', 'bolt', '#9C27B0', 'medium'),
('Gas Leak', 'exclamation-triangle', '#FF5722', 'critical'),
('Natural Disaster', 'cloud-showers-heavy', '#F44336', 'critical'),
('Missing Person', 'user-times', '#FF9800', 'high'),
('Other', 'circle', '#607D8B', 'medium');

-- Insert emergency contacts
INSERT INTO emergency_contacts (name, organization, phone, type, display_order) VALUES
('Emergency Hotline', 'Barangay Emergency Response', '911', 'other', 1),
('Police Station', 'Philippine National Police', '117', 'police', 2),
('Fire Department', 'Bureau of Fire Protection', '(02) 8426-0219', 'fire', 3),
('Medical Emergency', 'Emergency Medical Services', '(02) 8527-5174', 'medical', 4),
('Red Cross', 'Philippine Red Cross', '143', 'medical', 5),
('NDRRMC', 'National Disaster Risk Reduction', '(02) 8911-5061', 'rescue', 6),
('Coast Guard', 'Philippine Coast Guard', '(02) 8527-8481', 'rescue', 7),
('MMDA', 'Metro Manila Development Authority', '136', 'utility', 8);

-- Insert sample emergencies (optional)
INSERT INTO emergencies (reporter_id, emergency_type_id, title, description, latitude, longitude, address, priority, status, victim_count) VALUES
(3, 1, 'House Fire', 'Fire in residential area, multiple families affected', 14.5995, 120.9842, '123 Main Street, Barangay 1', 'critical', 'pending', 5),
(3, 2, 'Medical Emergency', 'Person having difficulty breathing', 14.6000, 120.9850, '456 Oak Avenue, Barangay 1', 'critical', 'acknowledged', 1);

-- Insert sample updates
INSERT INTO emergency_updates (emergency_id, user_id, message) VALUES
(1, 3, 'Emergency reported - Fire in residential area'),
(2, 3, 'Emergency reported - Medical emergency'),
(2, 2, 'Acknowledged - Responder on the way');

-- Create views for easier querying

-- View: Emergency details with user information
CREATE OR REPLACE VIEW emergency_details AS
SELECT 
    e.id,
    e.title,
    e.description,
    e.latitude,
    e.longitude,
    e.address,
    e.priority,
    e.status,
    e.victim_count,
    e.created_at,
    e.updated_at,
    e.resolved_at,
    et.name AS emergency_type_name,
    et.icon AS emergency_type_icon,
    et.color AS emergency_type_color,
    u.first_name AS reporter_first_name,
    u.last_name AS reporter_last_name,
    u.phone AS reporter_phone,
    u.email AS reporter_email,
    r.first_name AS responder_first_name,
    r.last_name AS responder_last_name,
    r.phone AS responder_phone
FROM emergencies e
LEFT JOIN emergency_types et ON e.emergency_type_id = et.id
LEFT JOIN users u ON e.reporter_id = u.id
LEFT JOIN users r ON e.assigned_responder_id = r.id;

-- View: Emergency statistics
CREATE OR REPLACE VIEW emergency_statistics AS
SELECT 
    COUNT(*) AS total_emergencies,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_count,
    SUM(CASE WHEN status = 'acknowledged' THEN 1 ELSE 0 END) AS acknowledged_count,
    SUM(CASE WHEN status = 'responding' THEN 1 ELSE 0 END) AS responding_count,
    SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) AS resolved_count,
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_count,
    SUM(CASE WHEN priority = 'critical' THEN 1 ELSE 0 END) AS critical_count,
    SUM(CASE WHEN priority = 'high' THEN 1 ELSE 0 END) AS high_count,
    SUM(CASE WHEN priority = 'medium' THEN 1 ELSE 0 END) AS medium_count,
    SUM(CASE WHEN priority = 'low' THEN 1 ELSE 0 END) AS low_count
FROM emergencies;

-- Stored procedures

-- Procedure: Create emergency
DELIMITER //
CREATE PROCEDURE create_emergency(
    IN p_reporter_id INT,
    IN p_emergency_type_id INT,
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_latitude DECIMAL(10, 8),
    IN p_longitude DECIMAL(11, 8),
    IN p_address TEXT,
    IN p_priority VARCHAR(20),
    IN p_victim_count INT
)
BEGIN
    DECLARE new_emergency_id INT;
    
    INSERT INTO emergencies (
        reporter_id, emergency_type_id, title, description, 
        latitude, longitude, address, priority, victim_count
    ) VALUES (
        p_reporter_id, p_emergency_type_id, p_title, p_description,
        p_latitude, p_longitude, p_address, p_priority, p_victim_count
    );
    
    SET new_emergency_id = LAST_INSERT_ID();
    
    -- Add initial update
    INSERT INTO emergency_updates (emergency_id, user_id, message)
    VALUES (new_emergency_id, p_reporter_id, 'Emergency reported');
    
    SELECT new_emergency_id AS emergency_id;
END //
DELIMITER ;

-- Procedure: Update emergency status
DELIMITER //
CREATE PROCEDURE update_emergency_status(
    IN p_emergency_id INT,
    IN p_user_id INT,
    IN p_status VARCHAR(20),
    IN p_message TEXT
)
BEGIN
    UPDATE emergencies 
    SET status = p_status,
        resolved_at = CASE WHEN p_status = 'resolved' THEN NOW() ELSE resolved_at END
    WHERE id = p_emergency_id;
    
    INSERT INTO emergency_updates (emergency_id, user_id, message)
    VALUES (p_emergency_id, p_user_id, p_message);
END //
DELIMITER ;

-- Procedure: Assign responder
DELIMITER //
CREATE PROCEDURE assign_responder(
    IN p_emergency_id INT,
    IN p_responder_id INT,
    IN p_admin_id INT
)
BEGIN
    DECLARE responder_name VARCHAR(255);
    
    SELECT CONCAT(first_name, ' ', last_name) INTO responder_name
    FROM users WHERE id = p_responder_id;
    
    UPDATE emergencies 
    SET assigned_responder_id = p_responder_id,
        status = 'acknowledged'
    WHERE id = p_emergency_id;
    
    INSERT INTO emergency_updates (emergency_id, user_id, message)
    VALUES (p_emergency_id, p_admin_id, CONCAT('Assigned to ', responder_name));
END //
DELIMITER ;

-- Triggers

-- Trigger: Update timestamp on emergency update
DELIMITER //
CREATE TRIGGER update_emergency_timestamp
AFTER INSERT ON emergency_updates
FOR EACH ROW
BEGIN
    UPDATE emergencies 
    SET updated_at = NOW() 
    WHERE id = NEW.emergency_id;
END //
DELIMITER ;

-- Display success message
SELECT 'Database created successfully!' AS message;
SELECT 'Tables created: users, emergency_types, emergencies, emergency_updates, emergency_contacts' AS info;
SELECT 'Sample data inserted' AS info;
SELECT 'Views created: emergency_details, emergency_statistics' AS info;
SELECT 'Stored procedures created: create_emergency, update_emergency_status, assign_responder' AS info;
