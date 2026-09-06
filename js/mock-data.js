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

  // ─── Trainer Courses Data ────────────────────────────────────────────────
  const TRAINER_COURSES = {
    courses: [
      { id: 1, name: 'Full Stack Web Development', sector: 'IT/ITES', duration: '6 months', enrolled: 45, certified: 38, status: 'active', start_date: '2026-01-15' },
      { id: 2, name: 'Data Analytics & Visualization', sector: 'IT/ITES', duration: '4 months', enrolled: 32, certified: 28, status: 'active', start_date: '2026-03-01' },
      { id: 3, name: 'Healthcare Assistant', sector: 'Healthcare', duration: '3 months', enrolled: 28, certified: 25, status: 'active', start_date: '2026-02-10' },
      { id: 4, name: 'Digital Marketing', sector: 'IT/ITES', duration: '3 months', enrolled: 52, certified: 44, status: 'completed', start_date: '2025-09-01' },
      { id: 5, name: 'Construction Supervision', sector: 'Construction', duration: '5 months', enrolled: 35, certified: 30, status: 'active', start_date: '2026-04-01' },
      { id: 6, name: 'Retail Management', sector: 'Retail', duration: '2 months', enrolled: 40, certified: 36, status: 'completed', start_date: '2025-11-15' },
    ],
    total: 6,
  };

  // ─── Trainer Trainees List ───────────────────────────────────────────────
  const TRAINER_TRAINEES = {
    trainees: [
      { id: 1, field_atlas_id: 'FA-24-0182', name: 'Priya Patel', email: 'priya@example.in', course: 'Full Stack Web Dev', stage: 'Placed', provider: 'NSDC', district: 'Pune', wage: 22000, status: 'verified' },
      { id: 2, field_atlas_id: 'FA-24-0201', name: 'Rahul Kumar', email: 'rahul@example.in', course: 'Data Analytics', stage: 'Certified', provider: 'NSDC', district: 'Mumbai', wage: null, status: 'pending' },
      { id: 3, field_atlas_id: 'FA-24-0215', name: 'Anita Sharma', email: 'anita@example.in', course: 'Healthcare Assistant', stage: 'Placed', provider: 'PMKVY', district: 'Delhi', wage: 18000, status: 'verified' },
      { id: 4, field_atlas_id: 'FA-24-0223', name: 'Vikram Singh', email: 'vikram@example.in', course: 'Construction Supervision', stage: 'Training', provider: 'SSM', district: 'Jaipur', wage: null, status: 'active' },
      { id: 5, field_atlas_id: 'FA-24-0230', name: 'Meera Devi', email: 'meera@example.in', course: 'Retail Management', stage: 'Placed', provider: 'IL&FS', district: 'Bangalore', wage: 16500, status: 'verified' },
      { id: 6, field_atlas_id: 'FA-24-0245', name: 'Arjun Nair', email: 'arjun@example.in', course: 'Digital Marketing', stage: 'Certified', provider: 'NSDC', district: 'Chennai', wage: null, status: 'pending' },
      { id: 7, field_atlas_id: 'FA-24-0258', name: 'Sneha Gupta', email: 'sneha@example.in', course: 'Full Stack Web Dev', stage: 'Assessment', provider: 'PMKVY', district: 'Kolkata', wage: null, status: 'active' },
      { id: 8, field_atlas_id: 'FA-24-0267', name: 'Deepak Yadav', email: 'deepak@example.in', course: 'Data Analytics', stage: 'Placed', provider: 'NSDC', district: 'Hyderabad', wage: 20000, status: 'verified' },
    ],
    total: 8,
    page: 1,
    per_page: 20,
  };

  // ─── Follow-Up Queue ─────────────────────────────────────────────────────
  const TRAINER_FOLLOWUPS = {
    queue: [
      { id: 1, trainee_name: 'Rahul Kumar', trainee_id: 'FA-24-0201', type: 'placement_verification', priority: 'high', message: 'Pending placement verification at Infosys', days_pending: 3, channel: 'whatsapp' },
      { id: 2, trainee_name: 'Arjun Nair', trainee_id: 'FA-24-0245', type: 'certificate_collection', priority: 'medium', message: 'Certificate ready for collection', days_pending: 7, channel: 'sms' },
      { id: 3, trainee_name: 'Sneha Gupta', trainee_id: 'FA-24-0258', type: 'assessment_reminder', priority: 'high', message: 'Assessment scheduled for next week', days_pending: 1, channel: 'whatsapp' },
      { id: 4, trainee_name: 'Vikram Singh', trainee_id: 'FA-24-0223', type: 'attendance', priority: 'low', message: 'Absent for 3 consecutive days', days_pending: 5, channel: 'call' },
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
