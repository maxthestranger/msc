DROP DATABASE IF EXISTS msc;
CREATE DATABASE msc;

USE msc;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS course_materials;
DROP TABLE IF EXISTS exams;
DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS course_instructors;
DROP TABLE IF EXISTS program_coordinator_requests;
DROP TABLE IF EXISTS evaluations;
DROP TABLE IF EXISTS qa_recommendations;
DROP TABLE IF EXISTS messages;


-- Create `users` table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    token VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('student', 'instructor', 'admin', 'coordinator', 'qa') NOT NULL
);

-- Create `courses` table
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(255) NOT NULL,
    course_code VARCHAR(50) NOT NULL,
    course_description TEXT,
    instructor_id INT NOT NULL,
    pre_requisites TEXT,
    syllabus TEXT,
    credits INT NOT NULL,
    created_by_admin INT,
    FOREIGN KEY (created_by_admin) REFERENCES users(id),
    FOREIGN KEY (instructor_id) REFERENCES users(id),
    UNIQUE(course_name, course_code)
);

-- Create `course_materials` table
CREATE TABLE course_materials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    material_name VARCHAR(255) NOT NULL,
    material_link TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create `exams` table
CREATE TABLE exams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    exam_name VARCHAR(255) NOT NULL,
    exam_pdf_link TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create `grades` table
CREATE TABLE grades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    exam_id INT,
    grade FLOAT,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (exam_id) REFERENCES exams(id)
);

-- Create `enrollments` table
CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(student_id, course_id) -- To ensure a student can enroll in a course only once
);

-- Create `program_coordinator_requests` table
CREATE TABLE program_coordinator_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coordinator_id INT NOT NULL,
    course_id INT,
    request_text TEXT NOT NULL,
    FOREIGN KEY (coordinator_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create `evaluations` table
CREATE TABLE evaluations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coordinator_id INT NOT NULL,
    evaluation_form_link TEXT,
    course_id INT,
    evaluation_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (coordinator_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create `evaluation_responses` table
CREATE TABLE qa_recommendations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    qa_officer_id INT NOT NULL,
    course_id INT,
    recommendation_text TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (qa_officer_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Create `messages` table
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    message_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id)
);

-- Insert default admin user
# INSERT INTO users (first_name, last_name, email, email_verified, token, password, role) VALUES ('System', 'Admin', 'admin@msc.com', TRUE, '', '$2b$1', 'admin');


