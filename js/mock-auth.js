/**
 * FIELD ATLAS — MOCK AUTHENTICATION LAYER
 * ----------------------------------------
 * Provides a fully client-side auth system.
 * All API calls for auth (/api/auth/*) are intercepted and handled locally.
 * No backend is required for authentication.
 *
 * Demo Credentials (Password: Atlas@2026! for all):
 *   trainer@fieldatlas.in  or  FA-TR-1001  → Trainer role
 *   trainee@fieldatlas.in  or  FA-24-0182  → Trainee role
 *   admin@fieldatlas.in    or  FA-AD-0001  → Admin role
 */

(function () {
  'use strict';

  // ─── Demo User Database ───────────────────────────────────────────────────
  const DEMO_USERS = [
    {
      id: 1,
      field_atlas_id: 'FA-TR-1001',
      email: 'trainer@fieldatlas.in',
      full_name: 'Arjun Sharma',
      role: 'trainer',
      password: 'Atlas@2026!',
      provider: 'National Skill Development Corporation',
      district: 'Mumbai',
      is_verified: true,
      profile_picture: null,
      date_joined: '2024-01-15',
      redirect_url: '/trainer-dashboard.html',
    },
    {
      id: 2,
      field_atlas_id: 'FA-24-0182',
      email: 'trainee@fieldatlas.in',
      full_name: 'Priya Patel',
      role: 'trainee',
      password: 'Atlas@2026!',
      provider: 'National Skill Development Corporation',
      district: 'Pune',
      is_verified: true,
      profile_picture: null,
      date_joined: '2024-03-20',
      redirect_url: '/trainee-dashboard.html',
    },
    {
      id: 3,
      field_atlas_id: 'FA-AD-0001',
      email: 'admin@fieldatlas.in',
      full_name: 'Admin User',
      role: 'admin',
      password: 'Atlas@2026!',
      provider: 'Field Atlas HQ',
      district: 'New Delhi',
      is_verified: true,
      profile_picture: null,
      date_joined: '2023-08-01',
      redirect_url: '/admin-dashboard.html',
    },
  ];

  const SESSION_KEY = 'fa_mock_session';

  // ─── Session Helpers ──────────────────────────────────────────────────────
  function saveSession(user) {
    const sessionData = { ...user };
    delete sessionData.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  }

  function getSession() {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  // ─── Find user by email or Field Atlas ID ─────────────────────────────────
  function findUser(identifier) {
    const id = (identifier || '').trim().toLowerCase();
    return DEMO_USERS.find(
      (u) =>
        u.email.toLowerCase() === id ||
        u.field_atlas_id.toLowerCase() === id
    ) || null;
  }

  // ─── Safe JSON response builder ───────────────────────────────────────────
  function mockResponse(data, ok = true, status = 200) {
    return new Response(JSON.stringify(data), {
      status: ok ? status : (data.status || 400),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ─── Mock handlers for each auth endpoint ─────────────────────────────────
  const MOCK_HANDLERS = {
    '/api/auth/login/': async (body) => {
      const { identifier, password } = body || {};
      const user = findUser(identifier);
      if (!user) {
        return mockResponse({ error: 'No account found with that email or ID.' }, false, 401);
      }
      if (user.password !== password) {
        return mockResponse({ error: 'Incorrect password. Please try again.' }, false, 401);
      }
      saveSession(user);
      const { password: _p, ...safeUser } = user;
      return mockResponse({
        ...safeUser,
        redirect_url: user.redirect_url,
        message: 'Login successful.',
      });
    },

    '/api/auth/logout/': async () => {
      clearSession();
      return mockResponse({ message: 'Logged out successfully.' });
    },

    '/api/auth/me/': async () => {
      const session = getSession();
      if (!session) {
        return mockResponse({ detail: 'Authentication credentials were not provided.' }, false, 401);
      }
      return mockResponse(session);
    },

    '/api/auth/register/': async (body) => {
      const { full_name, email, password, role } = body || {};
      if (!full_name || !email || !password || !role) {
        return mockResponse({ error: 'All fields are required.' }, false, 400);
      }
      // In demo mode, registration always succeeds and logs the user in
      const newUser = {
        id: Date.now(),
        field_atlas_id: 'FA-DEMO-' + Math.floor(Math.random() * 9000 + 1000),
        full_name,
        email,
        role,
        provider: body.provider || '',
        district: body.district || '',
        is_verified: true,
        profile_picture: null,
        date_joined: new Date().toISOString().split('T')[0],
        redirect_url: role === 'trainer' ? '/trainer-dashboard.html' : '/trainee-dashboard.html',
        password,
      };
      saveSession(newUser);
      const { password: _p, ...safeUser } = newUser;
      return mockResponse({
        ...safeUser,
        redirect_url: newUser.redirect_url,
        message: 'Account created successfully!',
      }, true, 201);
    },

    '/api/auth/send-otp/': async (body) => {
      // Mock OTP — always succeeds, OTP is always "123456"
      return mockResponse({
        message: 'Demo mode: Use OTP code 123456 (no real email sent).',
      });
    },

    '/api/auth/verify-otp/': async (body) => {
      const { code } = body || {};
      if (code === '123456' || code === '') {
        return mockResponse({ message: 'OTP verified successfully.' });
      }
      return mockResponse({ error: 'Invalid OTP. Use 123456 in demo mode.' }, false, 400);
    },

    '/api/auth/password-reset/': async (body) => {
      return mockResponse({ message: 'Password reset successful in demo mode. Please log in.' });
    },

    '/api/i18n/set-language/': async (body) => {
      const lang = (body && body.language) || 'en';
      localStorage.setItem('field_atlas_lang', lang);
      return mockResponse({ message: 'Language updated successfully.', language: lang });
    },
  };

  // ─── Intercept fetch globally ─────────────────────────────────────────────
  const _originalFetch = window.fetch;

  window.fetch = async function (input, options = {}) {
    const url = typeof input === 'string' ? input : (input.url || '');

    // Extract path from URL
    let pathname = url;
    try {
      pathname = new URL(url, window.location.origin).pathname;
    } catch (e) {}

    // Check if this is an auth/i18n endpoint we should mock
    const handler = MOCK_HANDLERS[pathname] || MOCK_HANDLERS[pathname.replace(/\/?$/, '/')];
    if (handler) {
      let body = {};
      try {
        const rawBody = options.body;
        if (typeof rawBody === 'string') body = JSON.parse(rawBody);
        else if (rawBody instanceof FormData) {
          rawBody.forEach((v, k) => { body[k] = v; });
        }
      } catch (e) {}

      await new Promise((r) => setTimeout(r, 120));

      try {
        return await handler(body);
      } catch (err) {
        return mockResponse({ error: 'Mock handler error: ' + err.message }, false, 500);
      }
    }

    // For non-auth requests, attempt fetch with silent fallback
    try {
      const response = await _originalFetch(input, options);
      if (!response.ok && pathname.includes('/api/i18n/')) {
        return mockResponse({ message: 'Language set locally.' });
      }
      return response;
    } catch (networkErr) {
      console.warn('[FieldAtlas] Backend fetch fallback for:', url);
      return new Response(JSON.stringify({
        message: 'Request processed locally.',
        offline: true,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };

  // ─── Expose session helper globally ──────────────────────────────────────
  window.FieldAtlasMockAuth = {
    getSession,
    clearSession,
    isLoggedIn: () => !!getSession(),
  };

  console.info('[FieldAtlas] Mock auth layer active. Demo logins work offline.');
})();
