/**
 * FIELD ATLAS — MOCK DATA LAYER
 * Intercepts all non-auth API calls and returns realistic dummy data.
 * No backend required — the entire app runs fully client-side.
 *
 * MUST be loaded AFTER mock-auth.js (which patches window.fetch first).
 */

(function () {
  'use strict';

  // ─── Trainer Dashboard Overview Data ─────────────────────────────────────
  const TRAINER_DASHBOARD = {
    metrics: {
      total_trainees: { value: 1247, growth: '+12.3%', period: 'vs last quarter' },
      verified_outcomes: { value: 893, growth: '+8.7%', period: 'vs last quarter' },
      placement_rate: { value: 71.6, growth: '+3.2%', period: 'vs last quarter' },
      avg_wage: { value: 18500, growth: '+5.1%', period: 'vs last quarter' },
    },
    route_stages: [
      { label: 'Enrolled', count: 1247 },
      { label: 'Training', count: 1089 },
      { label: 'Assessed', count: 952 },
      { label: 'Certified', count: 893 },
      { label: 'Placed', count: 641 },
    ],
    current_stage_active: 2,
    monthly_outcomes: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      certified: [78, 92, 105, 88, 112, 134, 98, 125],
      placed: [45, 58, 72, 61, 84, 96, 70, 89],
    },
    sector_distribution: {
      labels: ['IT/ITES', 'Healthcare', 'Construction', 'Retail', 'Hospitality', 'Manufacturing'],
      values: [28, 19, 16, 14, 12, 11],
    },
    providers: [
      { name: 'National Skill Dev Corp', district: 'Mumbai', trainees: 342, verified: 289, rate: 84.5 },
      { name: 'Pradhan Mantri Kaushal', district: 'Delhi', trainees: 278, verified: 234, rate: 84.2 },
      { name: 'State Skill Mission', district: 'Pune', trainees: 215, verified: 178, rate: 82.8 },
      { name: 'IL&FS Skills Dev', district: 'Bangalore', trainees: 198, verified: 156, rate: 78.8 },
    ],
    recent_activity: [
      { type: 'verification', message: 'Priya Patel\'s placement at TCS verified', time: '2 hours ago' },
      { type: 'enrollment', message: '15 new trainees enrolled in IT/ITES batch', time: '5 hours ago' },
      { type: 'certificate', message: 'Batch #IT-2026-Q2 certificates issued (28 trainees)', time: '1 day ago' },
      { type: 'placement', message: 'Rahul Kumar placed at Infosys — ₹22,000/month', time: '2 days ago' },
    ],
  };

  // ─── Trainer Courses Data (Govt NCVET & PMKVY 4.0 Standards) ───────────
  const TRAINER_COURSES = {
    courses: [
      { id: 1, title: 'Solar PV Installer (Suryamitra Initiative)', course_code: 'PMKVY-4.0-SOL-01', category: 'Renewable Energy', duration_weeks: 12, capacity: 50, enrolled_count: 48, status: 'published', start_date: '2026-01-10', end_date: '2026-04-10', district: 'Varanasi', state: 'Uttar Pradesh', language: 'Hindi / English', description: 'NSDC & National Institute of Solar Energy (NISE) certified course on solar PV array mounting, inverter setup, and grid synchronization.' },
      { id: 2, title: 'Electric Vehicle Service Technician', course_code: 'NCVET-AUTO-EV-02', category: 'Automotive', duration_weeks: 16, capacity: 40, enrolled_count: 36, status: 'published', start_date: '2026-02-01', end_date: '2026-05-30', district: 'Pune', state: 'Maharashtra', language: 'Marathi / English', description: 'ASDC accredited program covering high-voltage battery management systems, EV drivetrain diagnostics, and charging infrastructure.' },
      { id: 3, title: 'CNC Machine Operator & Programmer', course_code: 'DGT-CTS-CNC-03', category: 'Capital Goods & Mfg', duration_weeks: 24, capacity: 30, enrolled_count: 30, status: 'published', start_date: '2025-11-01', end_date: '2026-04-30', district: 'Belagavi', state: 'Karnataka', language: 'Kannada / English', description: 'Directorate General of Training (DGT) craftsman training scheme for multi-axis CNC lathe turning and milling operations.' },
      { id: 4, title: 'General Duty Assistant (Healthcare)', course_code: 'HSSC-GDA-HC-04', category: 'Healthcare & Life Sciences', duration_weeks: 12, capacity: 60, enrolled_count: 55, status: 'published', start_date: '2026-01-15', end_date: '2026-04-15', district: 'Ranchi', state: 'Jharkhand', language: 'Hindi / English', description: 'Healthcare Sector Skill Council certified patient care management, vital signs recording, and emergency response assistance.' },
      { id: 5, title: 'Micro Irrigation & Precision Farmer', course_code: 'ASCI-AGR-MI-05', category: 'Agriculture & Allied', duration_weeks: 8, capacity: 45, enrolled_count: 42, status: 'published', start_date: '2026-02-15', end_date: '2026-04-15', district: 'Jaipur', state: 'Rajasthan', language: 'Hindi', description: 'ASCI module focusing on drip and sprinkler irrigation automation, soil moisture sensors, and climate-resilient farming.' },
      { id: 6, title: 'Full Stack Software Associate', course_code: 'NSDC-IT-FS-06', category: 'IT-ITeS', duration_weeks: 24, capacity: 50, enrolled_count: 46, status: 'published', start_date: '2026-01-05', end_date: '2026-06-30', district: 'Bengaluru', state: 'Karnataka', language: 'English', description: 'NASSCOM FutureSkills Prime accredited web development, REST API design, and cloud containerization.' },
    ],
    total: 6,
  };

  // ─── Trainer Trainees List (Skill India Digital Registered Trainees) ──────
  const TRAINER_TRAINEES = {
    trainees: [
      { id: 1, field_atlas_id: 'PMKVY-4.0-ND-2026-88219', name: 'Rajesh Kumar Verma', email: 'rajesh.verma@pmkvy-portal.in', course: 'Solar PV Installer', stage: 'placed', provider: 'National Institute of Solar Energy', district: 'Varanasi', state: 'Uttar Pradesh', wage: 21500, consent_status: 'active', status: 'verified' },
      { id: 2, field_atlas_id: 'NCVET-EV-2026-99401', name: 'Ananya Deshmukh', email: 'ananya.d@asdc-skill.in', course: 'EV Service Technician', stage: 'Certified', provider: 'Automotive Skill Council', district: 'Pune', state: 'Maharashtra', wage: 24000, consent_status: 'active', status: 'active' },
      { id: 3, field_atlas_id: 'DGT-CTS-2025-77102', name: 'Suresh Chandran', email: 'suresh.c@dgt-ati.gov.in', course: 'CNC Machine Operator', stage: 'Placed', provider: 'Advanced Training Institute', district: 'Belagavi', state: 'Karnataka', wage: 19500, consent_status: 'active', status: 'verified' },
      { id: 4, field_atlas_id: 'PMKVY-GDA-2026-33910', name: 'Sunita Soren', email: 'sunita.soren@hssc.in', course: 'General Duty Assistant', stage: 'Assessment', provider: 'Healthcare Sector Skill Council', district: 'Ranchi', state: 'Jharkhand', wage: null, consent_status: 'active', status: 'pending' },
      { id: 5, field_atlas_id: 'NCVET-AGR-2026-44109', name: 'Vikram Singh Rathore', email: 'vikram.r@asci-skill.in', course: 'Micro Irrigation Specialist', stage: 'Training', provider: 'Agriculture Skill Council', district: 'Jaipur', state: 'Rajasthan', wage: null, consent_status: 'active', status: 'active' },
      { id: 6, field_atlas_id: 'NSDC-IT-2026-55201', name: 'Priya Patel', email: 'priya.patel@nsdc-digital.in', course: 'Full Stack Software Associate', stage: 'Certified', provider: 'NASSCOM FutureSkills Prime', district: 'Bengaluru', state: 'Karnataka', wage: null, consent_status: 'active', status: 'active' },
      { id: 7, field_atlas_id: 'PMKVY-4.0-UP-2026-11892', name: 'Amitabh Tripathi', email: 'amitabh.t@pmkvy.in', course: 'Solar PV Installer', stage: 'Training', provider: 'National Institute of Solar Energy', district: 'Varanasi', state: 'Uttar Pradesh', wage: null, consent_status: 'active', status: 'active' },
      { id: 8, field_atlas_id: 'NCVET-AUTO-2026-66381', name: 'Kavita Naik', email: 'kavita.n@asdc.in', course: 'EV Service Technician', stage: 'Assessment', provider: 'Automotive Skill Council', district: 'Pune', state: 'Maharashtra', wage: null, consent_status: 'active', status: 'pending' },
      { id: 9, field_atlas_id: 'DDU-GKY-2026-77812', name: 'Ramesh Jha', email: 'ramesh.jha@ddugky.in', course: 'Retail Sales Associate', stage: 'Placed', provider: 'Ministry of Rural Development', district: 'Patna', state: 'Bihar', wage: 16000, consent_status: 'active', status: 'verified' },
      { id: 10, field_atlas_id: 'NULM-2026-33921', name: 'Meena Kumari', email: 'meena.k@nulm.gov.in', course: 'Apparel Pattern Maker', stage: 'Placed', provider: 'National Urban Livelihoods Mission', district: 'Surat', state: 'Gujarat', wage: 18500, consent_status: 'active', status: 'verified' }
    ],
    total: 10,
    page: 1,
    per_page: 20,
  };

  // ─── Follow-Up Queue (Outreach Channels: WhatsApp, SMS, Tele-Call) ────────
  const TRAINER_FOLLOWUPS = {
    queue: [
      { id: 1, trainee_name: 'Sunita Soren', trainee_unified_id: 'PMKVY-GDA-2026-33910', trainee_course: 'General Duty Assistant', trainee_district: 'Ranchi', trainee_consent: 'active', milestone: '90_day_retention', attempts: 2, status: 'needs_assistance', is_overdue: true, is_due_today: false, next_contact_date: '2026-09-07', trainer_notes: 'Learner reported shift timing issues. Requires 3-month retention check.' },
      { id: 2, trainee_name: 'Rajesh Kumar Verma', trainee_unified_id: 'PMKVY-4.0-ND-2026-88219', trainee_course: 'Solar PV Installer', trainee_district: 'Varanasi', trainee_consent: 'active', milestone: '30_day_verification', attempts: 1, status: 'pending', is_overdue: false, is_due_today: true, next_contact_date: '2026-09-06', trainer_notes: 'Verify 1st month salary slip upload with employer NISE Solar Corp.' },
      { id: 3, trainee_name: 'Suresh Chandran', trainee_unified_id: 'DGT-CTS-2025-77102', trainee_course: 'CNC Machine Operator', trainee_district: 'Belagavi', trainee_consent: 'active', milestone: 'placement_check', attempts: 0, status: 'pending', is_overdue: false, is_due_today: true, next_contact_date: '2026-09-06', trainer_notes: 'Confirm joining date at Kirloskar Systems Belagavi unit.' },
      { id: 4, trainee_name: 'Vikram Singh Rathore', trainee_unified_id: 'NCVET-AGR-2026-44109', trainee_course: 'Micro Irrigation Specialist', trainee_district: 'Jaipur', trainee_consent: 'active', milestone: 'retention_check', attempts: 3, status: 'sent', is_overdue: false, is_due_today: false, next_contact_date: '2026-09-12', trainer_notes: 'Outreach dispatched via WhatsApp. Awaiting self-employment verification.' },
    ],
    total: 4,
  };

  // ─── Provider Pulse Data ─────────────────────────────────────────────────
  const TRAINER_PROVIDERS = {
    providers: [
      { id: 1, name: 'National Skill Development Corporation', short: 'NSDC', district: 'Mumbai', total_trainees: 342, verified: 289, placed: 245, avg_wage: 19200, compliance_score: 92 },
      { id: 2, name: 'Pradhan Mantri Kaushal Vikas Yojana', short: 'PMKVY', district: 'Delhi', total_trainees: 278, verified: 234, placed: 198, avg_wage: 17800, compliance_score: 88 },
      { id: 3, name: 'State Skill Mission', short: 'SSM', district: 'Pune', total_trainees: 215, verified: 178, placed: 142, avg_wage: 16500, compliance_score: 85 },
      { id: 4, name: 'IL&FS Skills Development', short: 'IL&FS', district: 'Bangalore', total_trainees: 198, verified: 156, placed: 121, avg_wage: 18100, compliance_score: 81 },
    ],
    total: 4,
  };

  // ─── Scheduled Trainer Classes (Visible to Trainee in Notification Bell) ──
  const TRAINER_CLASSES = [
    {
      id: 101,
      title: 'Full Stack: Advanced Django REST & React Integration',
      course: 'Full Stack Web Development',
      trainer_name: 'Vikram Malhotra',
      trainer_role: 'Senior NSDC Vocational Instructor',
      timing: 'Today · 10:30 AM – 12:00 PM',
      date: '2026-09-08',
      status: 'upcoming',
      room: 'Virtual Lab 3B',
      meet_url: 'https://meet.google.com/xyz-skill-pulse',
      is_live: false,
    },
    {
      id: 102,
      title: 'Database Architecture, Indexing & SQL Optimization',
      course: 'Full Stack Web Development',
      trainer_name: 'Sunita Rao',
      trainer_role: 'Lead Database Specialist',
      timing: 'Tomorrow · 02:00 PM – 03:30 PM',
      date: '2026-09-09',
      status: 'scheduled',
      room: 'Technical Hub A',
      meet_url: 'https://meet.google.com/db-opt-skill',
      is_live: false,
    },
    {
      id: 103,
      title: 'Industry Mock Interview & Technical Readiness Workshop',
      course: 'Skill India Placement Cell',
      trainer_name: 'Amit Sharma',
      trainer_role: 'Corporate Placement Mentor',
      timing: 'Friday · 11:00 AM – 01:00 PM',
      date: '2026-09-11',
      status: 'scheduled',
      room: 'Placement Auditorium',
      meet_url: 'https://meet.google.com/placement-prep',
      is_live: false,
    },
  ];

  // ─── Trainee Streak & Attendance Tracking Data ───────────────────────────
  const TRAINEE_STREAK_ATTENDANCE = {
    current_streak_days: 14,
    longest_streak_days: 21,
    logged_in_today: true,
    total_classes: 26,
    classes_attended: 24,
    attendance_rate: 92.3,
    days_active_month: 28,
    exam_eligibility_threshold: 75,
    is_exam_eligible: true,
    history_14_days: [
      { date: 'Aug 25', day: 'Mon', attended: true, logged_in: true },
      { date: 'Aug 26', day: 'Tue', attended: true, logged_in: true },
      { date: 'Aug 27', day: 'Wed', attended: true, logged_in: true },
      { date: 'Aug 28', day: 'Thu', attended: true, logged_in: true },
      { date: 'Aug 29', day: 'Fri', attended: true, logged_in: true },
      { date: 'Aug 30', day: 'Sat', attended: false, logged_in: true },
      { date: 'Aug 31', day: 'Sun', attended: false, logged_in: true },
      { date: 'Sep 01', day: 'Mon', attended: true, logged_in: true },
      { date: 'Sep 02', day: 'Tue', attended: true, logged_in: true },
      { date: 'Sep 03', day: 'Wed', attended: false, logged_in: true },
      { date: 'Sep 04', day: 'Thu', attended: true, logged_in: true },
      { date: 'Sep 05', day: 'Fri', attended: true, logged_in: true },
      { date: 'Sep 06', day: 'Sat', attended: true, logged_in: true },
      { date: 'Sep 07', day: 'Sun', attended: true, logged_in: true },
    ],
  };

  // ─── Indian Government Funded Courses Catalog ───────────────────────────
  const GOVERNMENT_COURSES = [
    {
      id: 'pmkvy-4-fsw',
      scheme_code: 'PMKVY 4.0',
      scheme_name: 'Pradhan Mantri Kaushal Vikas Yojana 4.0',
      title: 'Full Stack Web Development & Python Cloud',
      ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
      category: 'IT-ITeS & FutureSkills',
      duration: '24 Weeks · 400 Hours',
      stipend_info: '100% Free Govt Subsidy + Direct Assessment Grant',
      certification: 'NSDC & NCVET Accredited Level 5 Certificate',
      eligibility: '12th Pass / Graduate / Diploma',
      official_url: 'https://www.pmkvyofficial.org',
      portal_url: 'https://www.skillindiadigital.gov.in',
      badge_color: 'var(--color-teal)',
      description: 'Comprehensive Indian national vocational standard qualification in modern frontend architecture, Django REST Framework, relational databases, and containerized deployment.',
    },
    {
      id: 'ddu-gky-data',
      scheme_code: 'DDU-GKY',
      scheme_name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
      title: 'Data Analytics & Business Intelligence Specialist',
      ministry: 'Ministry of Rural Development (MoRD)',
      category: 'Information Technology',
      duration: '16 Weeks · 320 Hours',
      stipend_info: '100% Govt Funded with Free Hostel & Boarding Support',
      certification: 'National Vocational Training Council Certification',
      eligibility: '10th / 12th Pass Rural Youth (15-35 yrs)',
      official_url: 'https://ddugky.gov.in',
      portal_url: 'https://ddugky.gov.in',
      badge_color: 'var(--color-ochre)',
      description: 'Rural skilling initiative providing practical instruction in PowerBI, SQL querying, data cleaning pipelines, and entry-level enterprise analytics.',
    },
    {
      id: 'swayam-ai-ml',
      scheme_code: 'SWAYAM / NPTEL',
      scheme_name: 'Study Webs of Active-Learning for Young Aspiring Minds',
      title: 'Applied AI, Machine Learning & Python Foundations',
      ministry: 'Ministry of Education (MoE)',
      category: 'Higher Education & Deep Tech',
      duration: '12 Weeks · Self-Paced & Proctored Exam',
      stipend_info: 'Free Course Access + Subsidized Exam Fee',
      certification: 'IIT Madras & NPTEL Verifiable Honor Certificate',
      eligibility: 'Open to All Students & Professionals',
      official_url: 'https://swayam.gov.in',
      portal_url: 'https://nptel.ac.in',
      badge_color: 'var(--color-deep-indigo)',
      description: 'Rigorous academic and industry-aligned syllabus delivered in collaboration with premier IIT faculties, covering PyTorch, Scikit-learn, and neural networks.',
    },
    {
      id: 'futureskills-prime',
      scheme_code: 'FutureSkills PRIME',
      scheme_name: 'MeitY & NASSCOM National Digital Skilling Platform',
      title: 'Cloud Architecture & DevOps Engineering',
      ministry: 'Ministry of Electronics & Information Technology (MeitY)',
      category: 'Emerging Technologies',
      duration: '20 Weeks · Blended Learning',
      stipend_info: 'Govt Incentive Cashback on Certification Completion',
      certification: 'NASSCOM Industry Gold Credential',
      eligibility: 'Graduates in Engineering / Science / BCA',
      official_url: 'https://futureskillsprime.in',
      portal_url: 'https://futureskillsprime.in',
      badge_color: 'var(--color-coral)',
      description: 'Enterprise-grade curriculum focused on AWS/Azure infrastructure, Docker containers, Kubernetes orchestration, and CI/CD automated release pipelines.',
    },
    {
      id: 'pm-vishwakarma',
      scheme_code: 'PM Vishwakarma',
      scheme_name: 'Pradhan Mantri Vishwakarma Scheme',
      title: 'Digital Craftsmanship & Advanced Precision Tooling',
      ministry: 'Ministry of Micro, Small & Medium Enterprises (MSME)',
      category: 'Manufacturing & Traditional Crafts',
      duration: '8 Weeks · Hands-on Workshop',
      stipend_info: '₹500/day Stipend during Training + ₹15,000 Toolkit Incentive',
      certification: 'PM Vishwakarma Official Digital ID & Certificate',
      eligibility: 'Traditional Artisans & Craftsmen across 18 Trades',
      official_url: 'https://pmvishwakarma.gov.in',
      portal_url: 'https://pmvishwakarma.gov.in',
      badge_color: 'var(--color-ochre)',
      description: 'National program empowering artisans with modern design thinking, digital payment tools, quality enhancement, and market linkage.',
    },
    {
      id: 'naps-apprentice-prog',
      scheme_code: 'NAPS Portal',
      scheme_name: 'National Apprenticeship Promotion Scheme',
      title: 'Industrial IT Infrastructure & Technical Apprenticeship',
      ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
      category: 'Apprenticeship & On-the-Job Training',
      duration: '52 Weeks · Paid Industrial Apprenticeship',
      stipend_info: 'Govt Direct Benefit Transfer (DBT) Stipend Support',
      certification: 'National Apprenticeship Certificate (NAC)',
      eligibility: 'ITI / Diploma / Graduate',
      official_url: 'https://www.apprenticeshipindia.gov.in',
      portal_url: 'https://www.apprenticeshipindia.gov.in',
      badge_color: 'var(--color-teal)',
      description: 'Central government apprenticeship training matching eligible trainees with corporate employers with national stipend reimbursement.',
    },
    {
      id: 'nielit-iot',
      scheme_code: 'NIELIT Certified',
      scheme_name: 'National Institute of Electronics & Information Technology',
      title: 'Industrial IoT & Embedded Hardware Engineering',
      ministry: 'Ministry of Electronics & Information Technology (MeitY)',
      category: 'Electronics Hardware',
      duration: '14 Weeks · Practical Labs',
      stipend_info: 'Subsidized Fee for SC/ST/Women Candidates',
      certification: 'NIELIT National Qualification Register (NQR) Level 4',
      eligibility: 'ITI / Diploma / B.Sc / B.Tech',
      official_url: 'https://nielit.gov.in',
      portal_url: 'https://nielit.gov.in',
      badge_color: 'var(--color-teal)',
      description: 'Microcontroller programming, sensor telemetry, Arduino/ESP32 firmware, and MQTT industrial cloud communications.',
    },
  ];

  // ─── Government Schemes Learning Records & Modules Tracker ───────────────
  const GOVERNMENT_SCHEMES_DATA = [
    {
      scheme_id: 'PMKVY-4.0-FSW',
      scheme_name: 'PMKVY 4.0: Full Stack Web Development & Python Cloud',
      ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
      enrollment_id: 'FA-PMKVY-2026-98124',
      trainer: 'Vikram Malhotra',
      official_scheme_url: 'https://www.pmkvyofficial.org',
      portal_url: 'https://www.skillindiadigital.gov.in',
      guidelines_url: 'https://www.msde.gov.in/en/schemes-initiatives/schemes-initiatives-msde/pradhan-mantri-kaushal-vikas-yojana-pmkvy',
      course_completion_status: 'yes', // 'yes' or 'in_progress'
      completion_percentage: 100,
      exam_eligible: true,
      certificate_issued: true,
      certificate_id: 'FA-CERT-2026-98124',
      modules: [
        { id: 'm1', name: 'Module 1: HTML5 & Responsive Semantic Web Architecture', score: 94, is_completed: true },
        { id: 'm2', name: 'Module 2: Advanced JavaScript ES6+, Asynchronous DOM & APIs', score: 90, is_completed: true },
        { id: 'm3', name: 'Module 3: Python Programming & Django REST Framework', score: 88, is_completed: true },
        { id: 'm4', name: 'Module 4: Relational Databases, PostgreSQL & SQL Optimization', score: 92, is_completed: true },
        { id: 'm5', name: 'Module 5: React UI Architecture, State Management & Tailwind', score: 86, is_completed: true },
        { id: 'm6', name: 'Module 6: Enterprise Full Stack Capstone Deployment & CI/CD', score: 95, is_completed: true },
      ],
    },
    {
      scheme_id: 'DDU-GKY-DATA',
      scheme_name: 'DDU-GKY: Data Analytics & Enterprise Systems',
      ministry: 'Ministry of Rural Development (MoRD)',
      enrollment_id: 'FA-DDU-2026-44021',
      trainer: 'Sunita Rao',
      official_scheme_url: 'https://ddugky.gov.in',
      portal_url: 'https://ddugky.gov.in',
      guidelines_url: 'https://rural.gov.in',
      course_completion_status: 'in_progress',
      completion_percentage: 67,
      exam_eligible: false,
      certificate_issued: false,
      certificate_id: null,
      modules: [
        { id: 'd1', name: 'Module 1: Excel for Business Intelligence & Advanced Formulas', score: 92, is_completed: true },
        { id: 'd2', name: 'Module 2: Structured Query Language (SQL) & Data Warehousing', score: 85, is_completed: true },
        { id: 'd3', name: 'Module 3: Python for Data Extraction & Pandas Analytics', score: 80, is_completed: true },
        { id: 'd4', name: 'Module 4: PowerBI Dashboarding & Data Storytelling', score: 89, is_completed: true },
        { id: 'd5', name: 'Module 5: Cloud Storage & BigQuery Fundamentals', score: null, is_completed: false },
        { id: 'd6', name: 'Module 6: Capstone Project & Rural Livelihood Analytics', score: null, is_completed: false },
      ],
    },
    {
      scheme_id: 'PM-VISHWAKARMA',
      scheme_name: 'PM Vishwakarma Scheme: Digital Precision Craftsmanship',
      ministry: 'Ministry of Micro, Small & Medium Enterprises (MSME)',
      enrollment_id: 'FA-PMV-2026-11902',
      trainer: 'Dr. Rajeshwar Sen',
      official_scheme_url: 'https://pmvishwakarma.gov.in',
      portal_url: 'https://pmvishwakarma.gov.in',
      guidelines_url: 'https://msme.gov.in',
      course_completion_status: 'in_progress',
      completion_percentage: 50,
      exam_eligible: false,
      certificate_issued: false,
      certificate_id: null,
      modules: [
        { id: 'v1', name: 'Module 1: Traditional Craftsmanship & Contemporary CAD Design', score: 91, is_completed: true },
        { id: 'v2', name: 'Module 2: Advanced Precision Machinery & Digital Safety Protocols', score: 88, is_completed: true },
        { id: 'v3', name: 'Module 3: Financial Literacy, UPI Digital Payments & Collateral Loans', score: 85, is_completed: true },
        { id: 'v4', name: 'Module 4: Quality Packaging, E-Commerce Portals & GeM Registration', score: null, is_completed: false },
        { id: 'v5', name: 'Module 5: Global Export Linkages & Sustainable Craft Standards', score: null, is_completed: false },
      ],
    },
    {
      scheme_id: 'NAPS-APPRENTICE',
      scheme_name: 'NAPS: National Apprenticeship Promotion Scheme (IT-ITeS)',
      ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
      enrollment_id: 'FA-NAPS-2026-77314',
      trainer: 'Amit Sharma',
      official_scheme_url: 'https://www.apprenticeshipindia.gov.in',
      portal_url: 'https://www.apprenticeshipindia.gov.in',
      guidelines_url: 'https://www.msde.gov.in',
      course_completion_status: 'yes',
      completion_percentage: 100,
      exam_eligible: true,
      certificate_issued: true,
      certificate_id: 'FA-NAPS-2026-77314',
      modules: [
        { id: 'n1', name: 'Module 1: Workplace Safety, Industrial Ethics & Agile Methodologies', score: 96, is_completed: true },
        { id: 'n2', name: 'Module 2: Enterprise Software Engineering & Production Debugging', score: 92, is_completed: true },
        { id: 'n3', name: 'Module 3: Cloud Infrastructure Maintenance & Docker Containerization', score: 90, is_completed: true },
        { id: 'n4', name: 'Module 4: Industrial On-the-Job Apprenticeship Practicum', score: 94, is_completed: true },
      ],
    },
  ];

  // ─── Trainee Personal Dashboard ──────────────────────────────────────────
  const TRAINEE_DASHBOARD = {
    trainee: {
      name: 'Priya Patel',
      unified_id: 'FA-24-0182',
      email: 'trainee@fieldatlas.in',
      phone: '+91 98765 43210',
      course: 'Full Stack Web Development',
      provider: 'National Skill Development Corporation',
      district: 'Pune',
      batch: 'IT-2026-Q1',
      enrollment_date: '2026-01-15',
      profile_picture: null,
    },
    completion_percentage: 100,
    current_stage_index: 3,
    stages: ['Enrolled', 'Training', 'Assessment', 'Certified', 'Placed'],
    streak: {
      current_streak_days: 7,
      longest_streak_days: 14,
      total_logins: 42,
      classes_attended: 24,
      total_classes: 28,
      attendance_rate: 85.7,
      weekly_activity: [
        { day: 'Mon', label: 'M', date: 'Sep 01', logged_in: true, attended: true, hours: '2.5h' },
        { day: 'Tue', label: 'T', date: 'Sep 02', logged_in: true, attended: true, hours: '3.0h' },
        { day: 'Wed', label: 'W', date: 'Sep 03', logged_in: true, attended: false, hours: '1.5h' },
        { day: 'Thu', label: 'T', date: 'Sep 04', logged_in: true, attended: true, hours: '2.0h' },
        { day: 'Fri', label: 'F', date: 'Sep 05', logged_in: true, attended: true, hours: '3.5h' },
        { day: 'Sat', label: 'S', date: 'Sep 06', logged_in: true, attended: true, hours: '4.0h' },
        { day: 'Sun', label: 'S', date: 'Sep 07', logged_in: true, attended: false, hours: '1.0h' }
      ],
      monthly_bars: [
        { week: 'Wk 1', attended: 6, total: 7, pct: 86 },
        { week: 'Wk 2', attended: 7, total: 7, pct: 100 },
        { week: 'Wk 3', attended: 5, total: 7, pct: 71 },
        { week: 'Wk 4', attended: 6, total: 7, pct: 86 }
      ]
    },
    scheduled_classes: [
      {
        id: 'cls-101',
        title: 'Full Stack Web Dev — REST APIs, DRF & PostgreSQL Architecture',
        scheme: 'PMKVY 4.0: Full Stack Web Development',
        trainer_name: 'Vikram Malhotra',
        timing: 'Today, 4:30 PM – 6:00 PM',
        room: 'Lab Room 3B (Virtual Room #1)',
        status: 'live_soon',
        status_label: 'LIVE IN 30 MINS',
        join_url: '#'
      },
      {
        id: 'cls-102',
        title: 'Cloud Containerization, Docker & Microservices Deployment',
        scheme: 'FutureSkills PRIME (Cloud Architecture)',
        trainer_name: 'Ananya Sen',
        timing: 'Tomorrow, 10:00 AM – 11:30 AM',
        room: 'Technical Hall A',
        status: 'upcoming',
        status_label: 'UPCOMING',
        join_url: '#'
      },
      {
        id: 'cls-103',
        title: 'Career Placement Prep: Technical Mock Interviews & System Design',
        scheme: 'National Skill Development Corporation',
        trainer_name: 'Rajesh Sharma',
        timing: 'Wednesday, 2:00 PM – 3:30 PM',
        room: 'Career Mentorship Hub',
        status: 'upcoming',
        status_label: 'UPCOMING',
        join_url: '#'
      }
    ],
    government_courses: GOVERNMENT_COURSES_CATALOG,
    government_schemes: GOVERNMENT_SCHEMES_DATA,
    latest_placement: {
      employer_name: 'Tata Consultancy Services',
      role: 'Junior Web Developer',
      wage: 22000,
      validation_status: 'verified',
      start_date: '2026-07-01',
      scheme_enrolled: 'PMKVY 4.0: Full Stack Web Development',
      location: 'Pune, Maharashtra',
      contact_phone: '+91 98765 43210',
      contact_email: 'trainee@fieldatlas.in',
    },
    upcoming_actions: [
      { label: 'Submit 90-day check-in', due: '2026-10-01', type: 'checkin' },
      { label: 'Upload salary slip', due: '2026-09-30', type: 'document' },
    ],
    certificates: [
      { id: 1, name: 'Full Stack Web Development (PMKVY 4.0)', issued_date: '2026-06-15', status: 'issued', verification_url: 'certificate-verify.html?token=FA-CERT-2026-98124', verification_token: 'FA-CERT-2026-98124' },
    ],
    learning_records: [
      { module: 'HTML/CSS Fundamentals', score: 92, status: 'completed' },
      { module: 'JavaScript Essentials', score: 88, status: 'completed' },
      { module: 'React Framework', score: 85, status: 'completed' },
      { module: 'Node.js & Express', score: 79, status: 'completed' },
      { module: 'Database & SQL', score: 91, status: 'completed' },
      { module: 'DevOps Basics', score: 95, status: 'completed' },
    ],
  };

  const TRAINEE_ENROLLMENTS = {
    enrollments: [
      { id: 1, course_name: 'Full Stack Web Development', provider: 'NSDC', status: 'active', progress: 100, start_date: '2026-01-15', end_date: '2026-07-15' },
    ],
    total: 1,
  };

  const TRAINEE_CERTIFICATES = {
    certificates: [
      { id: 1, course_name: 'Full Stack Web Development (PMKVY 4.0)', issued_date: '2026-06-15', certificate_number: 'NSDC-FSW-2026-0182', verification_token: 'FA-CERT-2026-98124', status: 'issued' },
    ],
    total: 1,
  };

  // ─── Reports Data ────────────────────────────────────────────────────────
  const TRAINER_REPORTS = {
    available_reports: [
      { id: 'placement-summary', name: 'Placement Summary Report', format: 'CSV', last_generated: '2026-09-01' },
      { id: 'outcome-tracker', name: 'Outcome Tracker Report', format: 'CSV', last_generated: '2026-08-28' },
      { id: 'provider-compliance', name: 'Provider Compliance Report', format: 'PDF', last_generated: '2026-08-15' },
    ],
  };

  // ─── User Profile Data ───────────────────────────────────────────────────
  function getProfileData() {
    const session = localStorage.getItem('fa_mock_session');
    if (session) {
      try {
        return JSON.parse(session);
      } catch (e) {}
    }
    return {
      id: 1,
      full_name: 'Demo User',
      email: 'demo@fieldatlas.in',
      role: 'trainer',
      field_atlas_id: 'FA-DEMO-0001',
      provider: 'Field Atlas',
      district: 'Mumbai',
    };
  }

  // ─── Mock API Response Builder ───────────────────────────────────────────
  function mockResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  function getActiveSession() {
    return (window.FieldAtlasMockAuth && window.FieldAtlasMockAuth.getSession()) ||
           (window.FieldAtlasCache && window.FieldAtlasCache.get('user_session')) || null;
  }

  // ─── Data Endpoint Handlers ──────────────────────────────────────────────
  const DATA_HANDLERS = {
    // Trainer endpoints
    '/api/trainer/dashboard/': () => {
      const session = getActiveSession();
      const overview = JSON.parse(JSON.stringify(TRAINER_DASHBOARD));
      return mockResponse(overview);
    },
    '/api/trainer/courses/': () => mockResponse(TRAINER_COURSES),
    '/api/trainer/trainees/': () => mockResponse(TRAINER_TRAINEES),
    '/api/trainer/follow-ups/': () => mockResponse(TRAINER_FOLLOWUPS),
    '/api/trainer/followups/': () => mockResponse(TRAINER_FOLLOWUPS),
    '/api/trainer/providers/': () => mockResponse(TRAINER_PROVIDERS),
    '/api/trainer/reports/': () => mockResponse(TRAINER_REPORTS),

    // Trainee endpoints (hydrated dynamically with active user session)
    '/api/trainee/me/dashboard/': () => {
      const session = getActiveSession();
      const dashboard = JSON.parse(JSON.stringify(TRAINEE_DASHBOARD));
      if (session) {
        dashboard.trainee.name = session.full_name || session.aadhaar_name || dashboard.trainee.name;
        dashboard.trainee.unified_id = session.field_atlas_id || dashboard.trainee.unified_id;
        dashboard.trainee.email = session.email || (session.aadhaar_number ? `Aadhaar: ${session.aadhaar_number}` : dashboard.trainee.email);
        dashboard.trainee.phone_number = session.phone_number || '';
        dashboard.trainee.district = session.district || dashboard.trainee.district;
        dashboard.trainee.provider = session.provider || dashboard.trainee.provider;
        dashboard.trainee.profile_picture = session.profile_picture || session.profile_photo_url || null;
      }
      return mockResponse(dashboard);
    },
    '/api/trainee/me/enrollments/': () => mockResponse(TRAINEE_ENROLLMENTS),
    '/api/trainee/me/certificates/': () => mockResponse(TRAINEE_CERTIFICATES),
    '/api/trainee/me/applications/': () => mockResponse({ applications: [], total: 0 }),

    // Profile endpoint
    '/api/profile/': () => {
      const session = getActiveSession() || {
        id: 2,
        field_atlas_id: 'FA-24-0182',
        full_name: 'Priya Patel',
        email: 'trainee@fieldatlas.in',
        phone_number: '9833456789',
        role: 'trainee',
        district: 'Pune',
        state: 'Maharashtra',
        provider: 'National Skill Development Corporation'
      };
      return mockResponse({ user: session });
    },
    '/api/auth/profile/': () => {
      const session = getActiveSession() || {
        id: 2,
        field_atlas_id: 'FA-24-0182',
        full_name: 'Priya Patel',
        email: 'trainee@fieldatlas.in',
        phone_number: '9833456789',
        role: 'trainee',
        district: 'Pune',
        state: 'Maharashtra',
        provider: 'National Skill Development Corporation'
      };
      return mockResponse(session);
    },
    '/api/auth/profile/update/': () => mockResponse({ message: 'Profile updated successfully.' }),

    // Certificate verification
    '/api/certificates/verify/': () => mockResponse({
      valid: true,
      certificate: {
        holder_name: 'Priya Patel',
        course_name: 'Full Stack Web Development',
        issued_date: '2026-06-15',
        certificate_number: 'NSDC-FSW-2026-0182',
        provider: 'National Skill Development Corporation',
      },
    }),

    // Trainee 6-Step Feature Endpoints
    '/api/trainee/trainer-classes/': () => mockResponse({ classes: TRAINER_CLASSES, total: TRAINER_CLASSES.length }),
    '/api/trainee/streak-attendance/': () => mockResponse(TRAINEE_STREAK_ATTENDANCE),
    '/api/trainee/govt-courses/': () => mockResponse({ courses: GOVERNMENT_COURSES, total: GOVERNMENT_COURSES.length }),
    '/api/trainee/schemes/': () => mockResponse({ schemes: GOVERNMENT_SCHEMES_DATA, total: GOVERNMENT_SCHEMES_DATA.length }),

    // 4-Digit Phone SMS OTP endpoints for Password Reset
    '/api/auth/phone-sms-otp/': (opts) => {
      let body = {};
      try { body = JSON.parse(opts?.body || '{}'); } catch(e) {}
      const phone = body.phone || '9833456789';
      // Generate realistic 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      sessionStorage.setItem('fa_last_phone_otp', otp);
      sessionStorage.setItem('fa_last_phone_target', phone);
      return mockResponse({
        success: true,
        message: `4-digit OTP sent via SMS to +91 ${phone}`,
        simulated_otp: otp,
        phone: phone,
      });
    },

    '/api/auth/phone-verify-reset/': (opts) => {
      let body = {};
      try { body = JSON.parse(opts?.body || '{}'); } catch(e) {}
      const inputOtp = (body.otp || '').trim();
      const newPassword = body.new_password || '';
      const savedOtp = sessionStorage.getItem('fa_last_phone_otp');

      if (!inputOtp || (inputOtp !== savedOtp && inputOtp !== '4829')) {
        return mockResponse({ error: 'Invalid 4-digit verification code. Please check your SMS and try again.' }, 400);
      }

      // Update password in mock session
      const session = getActiveSession();
      if (session) {
        session.password_updated_at = new Date().toISOString();
        if (window.FieldAtlasMockAuth && window.FieldAtlasMockAuth.updateSession) {
          window.FieldAtlasMockAuth.updateSession(session);
        }
      }

      return mockResponse({
        success: true,
        message: 'Password successfully reset! You are now authenticated with your credentials.',
        user: session,
      });
    },

    // Trainee Placement Submission (Google Form Style)
    '/api/trainee/placement-submit/': (opts) => {
      let body = {};
      try { body = JSON.parse(opts?.body || '{}'); } catch(e) {}
      
      const newPlacement = {
        employer_name: body.employer_name || 'Tata Consultancy Services',
        role: body.role || 'Junior Web Developer',
        wage: Number(body.wage) || 22000,
        start_date: body.start_date || new Date().toISOString().split('T')[0],
        validation_status: 'submitted_verification_pending',
        scheme_enrolled: body.scheme_enrolled || 'PMKVY 4.0 (Full Stack Web Development)',
        work_location: body.work_location || 'Pune, Maharashtra',
        employment_type: body.employment_type || 'Full-time Regular',
      };

      // Save to local storage for persistence across reloads
      localStorage.setItem('fa_latest_placement', JSON.stringify(newPlacement));
      TRAINEE_DASHBOARD.latest_placement = newPlacement;
      TRAINEE_DASHBOARD.stages = ['Enrolled', 'Training', 'Assessment', 'Certified', 'Placed'];
      TRAINEE_DASHBOARD.current_stage_index = 4; // Advanced to Placed

      return mockResponse({
        success: true,
        message: 'Placement outcome reported successfully! Submitted for trainer and NSDC verification.',
        placement: newPlacement,
      });
    },

    // Catch-all for any trainee/trainer sub-endpoints
    '/api/trainee/': () => mockResponse({ message: 'OK' }),
    '/api/trainer/': () => mockResponse({ message: 'OK' }),
    
    '/api/i18n/set-language/': () => mockResponse({ message: 'Language updated successfully.' }),
  };

  // ─── Patch fetch to intercept data endpoints ─────────────────────────────
  // mock-auth.js has already patched window.fetch — we wrap that patched version
  const _prevFetch = window.fetch;

  window.fetch = async function (input, options = {}) {
    const url = typeof input === 'string' ? input : (input.url || '');

    // Extract pathname
    let pathname = url;
    try {
      pathname = new URL(url, window.location.origin).pathname;
    } catch (e) {}

    // Normalize trailing slash
    const normalizedPath = pathname.endsWith('/') ? pathname : pathname + '/';

    // Check exact match first
    if (DATA_HANDLERS[normalizedPath]) {
      await new Promise((r) => setTimeout(r, 120)); // simulate network delay
      return DATA_HANDLERS[normalizedPath](options);
    }

    // Check prefix matches for sub-endpoints
    for (const prefix of Object.keys(DATA_HANDLERS)) {
      if (normalizedPath.startsWith(prefix) && normalizedPath !== prefix) {
        await new Promise((r) => setTimeout(r, 120));
        return DATA_HANDLERS[prefix](options);
      }
    }

    // Fall through to previous fetch (mock-auth.js) which handles auth + network errors
    return _prevFetch(input, options);
  };

  console.info('[FieldAtlas] Mock data layer active. All dashboard data is simulated.');
})();
