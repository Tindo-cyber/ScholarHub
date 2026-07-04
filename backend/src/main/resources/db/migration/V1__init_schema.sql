-- ScholarHub Core Schema
-- AI-powered Digital Innovation Ecosystem

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users & Authentication
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    role            VARCHAR(50) NOT NULL,
    university      VARCHAR(255),
    department      VARCHAR(255),
    program         VARCHAR(255),
    avatar_url      VARCHAR(500),
    bio             TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Projects
CREATE TABLE projects (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    status          VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    phase           VARCHAR(50) NOT NULL DEFAULT 'IDEA',
    progress        INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    student_id      UUID NOT NULL REFERENCES users(id),
    supervisor_id   UUID REFERENCES users(id),
    department      VARCHAR(255),
    technologies    TEXT[],
    image_url       VARCHAR(500),
    github_url      VARCHAR(500),
    deployment_url  VARCHAR(500),
    deadline        DATE,
    is_public       BOOLEAN NOT NULL DEFAULT FALSE,
    innovation_score INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_student ON projects(student_id);
CREATE INDEX idx_projects_supervisor ON projects(supervisor_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_phase ON projects(phase);
CREATE INDEX idx_projects_public ON projects(is_public) WHERE is_public = TRUE;

-- Project Health Scores
CREATE TABLE project_health (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id          UUID NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
    documentation       INTEGER NOT NULL DEFAULT 0 CHECK (documentation >= 0 AND documentation <= 100),
    testing             INTEGER NOT NULL DEFAULT 0 CHECK (testing >= 0 AND testing <= 100),
    code_quality        INTEGER NOT NULL DEFAULT 0 CHECK (code_quality >= 0 AND code_quality <= 100),
    deployment          INTEGER NOT NULL DEFAULT 0 CHECK (deployment >= 0 AND deployment <= 100),
    presentation        INTEGER NOT NULL DEFAULT 0 CHECK (presentation >= 0 AND presentation <= 100),
    research            INTEGER NOT NULL DEFAULT 0 CHECK (research >= 0 AND research <= 100),
    security            INTEGER NOT NULL DEFAULT 0 CHECK (security >= 0 AND security <= 100),
    overall_score       INTEGER NOT NULL DEFAULT 0 CHECK (overall_score >= 0 AND overall_score <= 100),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project Timeline Events
CREATE TABLE project_timeline (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    event_type      VARCHAR(100) NOT NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    event_date      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_timeline_project ON project_timeline(project_id);

-- Project Files
CREATE TABLE project_files (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    file_type       VARCHAR(50) NOT NULL,
    mime_type       VARCHAR(100),
    size_bytes      BIGINT,
    storage_path    VARCHAR(500) NOT NULL,
    uploaded_by     UUID NOT NULL REFERENCES users(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_files_project ON project_files(project_id);

-- Supervisor Feedback
CREATE TABLE supervisor_feedback (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    supervisor_id   UUID NOT NULL REFERENCES users(id),
    message         TEXT NOT NULL,
    milestone       VARCHAR(100),
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_feedback_project ON supervisor_feedback(project_id);

-- Notifications
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type            VARCHAR(50) NOT NULL,
    title           VARCHAR(255) NOT NULL,
    message         TEXT NOT NULL,
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    reference_id    UUID,
    reference_type  VARCHAR(50),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- Portfolio
CREATE TABLE portfolios (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    score           INTEGER NOT NULL DEFAULT 0,
    is_public       BOOLEAN NOT NULL DEFAULT FALSE,
    public_slug     VARCHAR(100) UNIQUE,
    headline        VARCHAR(255),
    summary         TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Skills
CREATE TABLE skills (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(100) NOT NULL,
    category        VARCHAR(100),
    level           INTEGER NOT NULL DEFAULT 0 CHECK (level >= 0 AND level <= 100)
);

CREATE INDEX idx_skills_user ON skills(user_id);

-- Certificates
CREATE TABLE certificates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name            VARCHAR(255) NOT NULL,
    issuer          VARCHAR(255) NOT NULL,
    issued_date     DATE NOT NULL
);

-- Achievements
CREATE TABLE achievements (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    icon            VARCHAR(50),
    achieved_date   DATE NOT NULL
);

-- AI Conversations
CREATE TABLE ai_conversations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_id      UUID REFERENCES projects(id) ON DELETE SET NULL,
    title           VARCHAR(255) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_conv_user ON ai_conversations(user_id);

-- AI Messages
CREATE TABLE ai_messages (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id     UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role                VARCHAR(20) NOT NULL,
    content             TEXT NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_messages_conv ON ai_messages(conversation_id);

-- Marketplace Listings
CREATE TABLE marketplace_listings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    summary         TEXT NOT NULL,
    category        VARCHAR(100),
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    view_count      INTEGER NOT NULL DEFAULT 0,
    published_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_marketplace_category ON marketplace_listings(category);

-- Startups
CREATE TABLE startups (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      UUID NOT NULL REFERENCES projects(id),
    founder_id      UUID NOT NULL REFERENCES users(id),
    name            VARCHAR(255) NOT NULL,
    tagline         VARCHAR(500),
    description     TEXT,
    stage           VARCHAR(50) NOT NULL DEFAULT 'ideation',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_startups_founder ON startups(founder_id);

-- Seed demo users (password: ScholarHub2026!)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, university, department, program) VALUES
('a0000000-0000-0000-0000-000000000001', 'alex.morgan@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Alex', 'Morgan', 'STUDENT', 'Stanford University', 'Computer Science', 'MSc Computer Science'),
('a0000000-0000-0000-0000-000000000002', 'sarah.chen@university.edu', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Sarah', 'Chen', 'SUPERVISOR', 'Stanford University', 'Computer Science', NULL),
('a0000000-0000-0000-0000-000000000003', 'admin@scholarhub.io', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'System', 'Admin', 'ADMINISTRATOR', 'ScholarHub', NULL, NULL);

-- Seed demo projects
INSERT INTO projects (id, title, description, status, phase, progress, student_id, supervisor_id, department, technologies, image_url, deadline, innovation_score) VALUES
('b0000000-0000-0000-0000-000000000001', 'Neural Network Optimizer', 'A novel approach to optimizing deep learning models for edge devices using adaptive quantization techniques.', 'IN_REVIEW', 'SUPERVISOR_REVIEW', 78, 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Computer Science', ARRAY['Python', 'TensorFlow', 'Machine Learning'], 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop', '2026-07-15', 82),
('b0000000-0000-0000-0000-000000000002', 'Campus Connect API', 'RESTful microservices architecture for university event management and student collaboration.', 'DEPLOYED', 'PORTFOLIO', 100, 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Computer Science', ARRAY['Node.js', 'PostgreSQL', 'Docker'], 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', NULL, 91),
('b0000000-0000-0000-0000-000000000003', 'EcoTrack Mobile App', 'Cross-platform mobile application for tracking personal carbon footprint with gamification.', 'REVISION', 'DEVELOPMENT', 65, 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Computer Science', ARRAY['React Native', 'Firebase'], 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop', '2026-07-20', 74);

INSERT INTO project_health (project_id, documentation, testing, code_quality, deployment, presentation, research, security, overall_score) VALUES
('b0000000-0000-0000-0000-000000000001', 85, 70, 88, 60, 75, 90, 72, 79),
('b0000000-0000-0000-0000-000000000002', 95, 92, 90, 100, 88, 85, 94, 92),
('b0000000-0000-0000-0000-000000000003', 60, 55, 70, 40, 65, 75, 58, 60);

INSERT INTO portfolios (user_id, score, is_public, public_slug, headline, summary) VALUES
('a0000000-0000-0000-0000-000000000001', 87, TRUE, 'alex-morgan', 'Full-Stack Developer & ML Enthusiast', 'Building innovative solutions at the intersection of AI and software engineering.');

INSERT INTO skills (user_id, name, category, level) VALUES
('a0000000-0000-0000-0000-000000000001', 'React', 'Frontend', 90),
('a0000000-0000-0000-0000-000000000001', 'TypeScript', 'Frontend', 85),
('a0000000-0000-0000-0000-000000000001', 'Python', 'Backend', 88),
('a0000000-0000-0000-0000-000000000001', 'Machine Learning', 'AI/ML', 82);

INSERT INTO supervisor_feedback (project_id, supervisor_id, message, milestone) VALUES
('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Excellent progress on the quantization module. Please expand the benchmark section.', 'SUPERVISOR_REVIEW'),
('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'The UI redesign looks great. Revise the data persistence layer before resubmitting.', 'DEVELOPMENT');

INSERT INTO notifications (user_id, type, title, message) VALUES
('a0000000-0000-0000-0000-000000000001', 'supervisor', 'New feedback received', 'Dr. Sarah Chen commented on Neural Network Optimizer'),
('a0000000-0000-0000-0000-000000000001', 'deployment', 'Deployment successful', 'Campus Connect API is now live'),
('a0000000-0000-0000-0000-000000000001', 'ai', 'AI analysis complete', 'Documentation review for EcoTrack is ready'),
('a0000000-0000-0000-0000-000000000001', 'deadline', 'Deadline approaching', 'Neural Network Optimizer submission due in 11 days');
