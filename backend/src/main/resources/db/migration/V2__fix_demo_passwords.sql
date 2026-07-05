-- Fix demo user password to ScholarHub2026!
UPDATE users SET password_hash = '$2b$10$x4E6Jb6BvW2NTIiAHTX.8.LNELG9HkxFr.T7i0Z96eIK0h8Atts3K'
WHERE email IN ('alex.morgan@university.edu', 'sarah.chen@university.edu', 'admin@scholarhub.io');
