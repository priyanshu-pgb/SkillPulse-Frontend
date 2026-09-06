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
      { id: 1, field_atlas_id: 'PMKVY-4.0-ND-2026-88219', name: 'Rajesh Kumar Verma', email: 'rajesh.verma@pmkvy-portal.in', course: 'Solar PV Installer', stage: 'placed', provider: 'National Institute of Solar Energy', district: 'Varanasi', state: 'Uttar Pradesh', wage: 21500, consent_status: 'active', latest_placement: { role: 'Solar Assembly Specialist', wage: 21500, validation_status: 'verified' } },
      { id: 2, field_atlas_id: 'NCVET-EV-2026-99401', name: 'Ananya Deshmukh', email: 'ananya.d@asdc-skill.in', course: 'EV Service Technician', stage: 'retained', provider: 'Automotive Skill Council', district: 'Pune', state: 'Maharashtra', wage: 24000, consent_status: 'active', latest_placement: { role: 'EV Diagnostics Technician', wage: 24000, validation_status: 'verified' } },
      { id: 3, field_atlas_id: 'DGT-CTS-2025-77102', name: 'Suresh Chandran', email: 'suresh.c@dgt-ati.gov.in', course: 'CNC Machine Operator', stage: 'placed', provider: 'Advanced Training Institute', district: 'Belagavi', state: 'Karnataka', wage: 19500, consent_status: 'active', latest_placement: { role: 'CNC Milling Operator', wage: 19500, validation_status: 'verified' } },
      { id: 4, field_atlas_id: 'PMKVY-GDA-2026-33910', name: 'Sunita Soren', email: 'sunita.soren@hssc.in', course: 'General Duty Assistant', stage: 'follow_up_due', provider: 'Healthcare Sector Skill Council', district: 'Ranchi', state: 'Jharkhand', wage: 17200, consent_status: 'active', latest_placement: { role: 'Hospital Patient Care Asst', wage: 17200, validation_status: 'pending' } },
      { id: 5, field_atlas_id: 'NCVET-AGR-2026-44109', name: 'Vikram Singh Rathore', email: 'vikram.r@asci-skill.in', course: 'Micro Irrigation Specialist', stage: 'placed', provider: 'Agriculture Skill Council', district: 'Jaipur', state: 'Rajasthan', wage: 18500, consent_status: 'active', latest_placement: { role: 'Irrigation Systems Tech', wage: 18500, validation_status: 'verified' } },
      { id: 6, field_atlas_id: 'NSDC-IT-2026-55201', name: 'Priya Patel', email: 'priya.patel@nsdc-digital.in', course: 'Full Stack Software Associate', stage: 'retained', provider: 'NASSCOM FutureSkills Prime', district: 'Bengaluru', state: 'Karnataka', wage: 28000, consent_status: 'active', latest_placement: { role: 'Junior Web Developer', wage: 28000, validation_status: 'verified' } },
      { id: 7, field_atlas_id: 'PMKVY-4.0-UP-2026-11892', name: 'Amitabh Tripathi', email: 'amitabh.t@pmkvy.in', course: 'Solar PV Installer', stage: 'training', provider: 'National Institute of Solar Energy', district: 'Varanasi', state: 'Uttar Pradesh', wage: null, consent_status: 'active', latest_placement: null },
      { id: 8, field_atlas_id: 'NCVET-AUTO-2026-66381', name: 'Kavita Naik', email: 'kavita.n@asdc.in', course: 'EV Service Technician', stage: 'assessment', provider: 'Automotive Skill Council', district: 'Pune', state: 'Maharashtra', wage: null, consent_status: 'active', latest_placement: null },
    ],
    total: 8,
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

  // ─── Trainee Personal Dashboard ──────────────────────────────────────────
  const TRAINEE_DASHBOARD = {
    trainee: {
      name: 'Priya Patel',
      unified_id: 'FA-24-0182',
      email: 'trainee@fieldatlas.in',
      course: 'Full Stack Web Development',
      provider: 'National Skill Development Corporation',
      district: 'Pune',
      batch: 'IT-2026-Q1',
      enrollment_date: '2026-01-15',
      profile_picture: null,
    },
    completion_percentage: 78,
    current_stage_index: 3,
    stages: ['Enrolled', 'Training', 'Assessment', 'Certified', 'Placed'],
    latest_placement: {
      employer_name: 'Tata Consultancy Services',
      role: 'Junior Web Developer',
      wage: 22000,
      validation_status: 'verified',
      start_date: '2026-07-01',
    },
    upcoming_actions: [
      { label: 'Submit 90-day check-in', due: '2026-10-01', type: 'checkin' },
      { label: 'Upload salary slip', due: '2026-09-30', type: 'document' },
    ],
    certificates: [
      { id: 1, name: 'Full Stack Web Development', issued_date: '2026-06-15', status: 'issued', verification_url: '#' },
    ],
    learning_records: [
      { module: 'HTML/CSS Fundamentals', score: 92, status: 'completed' },
      { module: 'JavaScript Essentials', score: 88, status: 'completed' },
      { module: 'React Framework', score: 85, status: 'completed' },
      { module: 'Node.js & Express', score: 79, status: 'completed' },
      { module: 'Database & SQL', score: 91, status: 'completed' },
      { module: 'DevOps Basics', score: null, status: 'in_progress' },
    ],
  };

  const TRAINEE_ENROLLMENTS = {
    enrollments: [
      { id: 1, course_name: 'Full Stack Web Development', provider: 'NSDC', status: 'active', progress: 78, start_date: '2026-01-15', end_date: '2026-07-15' },
    ],
    total: 1,
  };

  const TRAINEE_CERTIFICATES = {
    certificates: [
      { id: 1, course_name: 'Full Stack Web Development', issued_date: '2026-06-15', certificate_number: 'NSDC-FSW-2026-0182', verification_token: 'abc123def456', status: 'issued' },
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

  // ─── Data Endpoint Handlers ──────────────────────────────────────────────
  const DATA_HANDLERS = {
    // Trainer endpoints
    '/api/trainer/dashboard/': () => mockResponse(TRAINER_DASHBOARD),
    '/api/trainer/courses/': () => mockResponse(TRAINER_COURSES),
    '/api/trainer/trainees/': () => mockResponse(TRAINER_TRAINEES),
    '/api/trainer/follow-ups/': () => mockResponse(TRAINER_FOLLOWUPS),
    '/api/trainer/followups/': () => mockResponse(TRAINER_FOLLOWUPS),
    '/api/trainer/providers/': () => mockResponse(TRAINER_PROVIDERS),
    '/api/trainer/reports/': () => mockResponse(TRAINER_REPORTS),

    // Trainee endpoints
    '/api/trainee/me/dashboard/': () => mockResponse(TRAINEE_DASHBOARD),
    '/api/trainee/me/enrollments/': () => mockResponse(TRAINEE_ENROLLMENTS),
    '/api/trainee/me/certificates/': () => mockResponse(TRAINEE_CERTIFICATES),
    '/api/trainee/me/applications/': () => mockResponse({ applications: [], total: 0 }),

    // Profile endpoint
    '/api/auth/profile/': () => mockResponse(getProfileData()),
    '/api/auth/profile/update/': () => mockResponse({ ...getProfileData(), message: 'Profile updated successfully.' }),

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

    // Catch-all for any trainee/trainer sub-endpoints
    '/api/trainee/': () => mockResponse({ message: 'OK' }),
    '/api/trainer/': () => mockResponse({ message: 'OK' }),
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
      await new Promise((r) => setTimeout(r, 150)); // simulate network delay
      return DATA_HANDLERS[normalizedPath]();
    }

    // Check prefix matches for sub-endpoints
    for (const prefix of Object.keys(DATA_HANDLERS)) {
      if (normalizedPath.startsWith(prefix) && normalizedPath !== prefix) {
        await new Promise((r) => setTimeout(r, 150));
        return DATA_HANDLERS[prefix]();
      }
    }

    // Fall through to previous fetch (mock-auth.js) which handles auth + network errors
    return _prevFetch(input, options);
  };

  console.info('[FieldAtlas] Mock data layer active. All dashboard data is simulated.');
})();
