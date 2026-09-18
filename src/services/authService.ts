import { AuthResponse, LoginPayload, RegisterPayload, UserSession } from '../types';

/**
 * Authentication Configuration & API Endpoints
 * Struktur ini siap dihubungkan ke backend production AgxPOS (misal Express/NestJS/FastAPI).
 */
export const AUTH_CONFIG = {
  BASE_URL: (import.meta.env.VITE_API_URL as string) || '',
  ENDPOINTS: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
  },
  STORAGE_KEYS: {
    SESSION: 'agxpos_active_session',
    USERS_DB: 'agxpos_registered_users',
  },
};

interface StoredUser {
  id: string;
  name: string;
  storeName: string;
  email: string;
  passwordHash: string;
  plan: 'standar' | 'pro' | 'premium';
  trialExpiresAt: string;
  createdAt: string;
}

/**
 * Helper hashing password menggunakan SHA-256 standar Web Crypto API
 * Menjamin password tidak disimpan secara plaintext.
 */
async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Inisialisasi mock database lokal jika belum ada, termasuk akun demo yang dapat langsung dicoba
function getLocalUsersDB(): StoredUser[] {
  try {
    const raw = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.USERS_DB);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  // Seed user default (password123 yang telah di-hash dengan SHA-256)
  // sha256("password123") = ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
  const defaultUser: StoredUser = {
    id: 'usr_demo_882',
    name: 'Budi Santoso',
    storeName: 'Toko Berkah Sejahtera',
    email: 'demo@agxpos.id',
    passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
    plan: 'standar',
    trialExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  };

  const initialDB = [defaultUser];
  try {
    localStorage.setItem(AUTH_CONFIG.STORAGE_KEYS.USERS_DB, JSON.stringify(initialDB));
  } catch {
    // Ignore storage issues
  }
  return initialDB;
}

function saveLocalUsersDB(users: StoredUser[]): void {
  try {
    localStorage.setItem(AUTH_CONFIG.STORAGE_KEYS.USERS_DB, JSON.stringify(users));
  } catch (e) {
    console.error('Gagal menyimpan database pengguna lokal:', e);
  }
}

/**
 * Service autentikasi AgxPOS
 */
export const authService = {
  /**
   * Pendaftaran akun trial 7 hari baru
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    // Validasi dasar client/service
    if (!payload.name?.trim()) {
      return { success: false, error: 'Nama lengkap wajib diisi.' };
    }
    if (!payload.storeName?.trim()) {
      return { success: false, error: 'Nama toko/bisnis wajib diisi.' };
    }
    if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
      return { success: false, error: 'Alamat email tidak valid.' };
    }
    if (!payload.password || payload.password.length < 8) {
      return { success: false, error: 'Password minimal 8 karakter.' };
    }
    if (!payload.agreedToTerms) {
      return {
        success: false,
        error: 'Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi.',
      };
    }

    // Jika ada real backend di AUTH_CONFIG.BASE_URL, coba panggil terlebih dahulu
    if (AUTH_CONFIG.BASE_URL) {
      try {
        const response = await fetch(`${AUTH_CONFIG.BASE_URL}${AUTH_CONFIG.ENDPOINTS.REGISTER}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) {
          return { success: false, error: data.message || 'Koneksi gagal. Silakan coba lagi.' };
        }
        this.setSession(data.session);
        return { success: true, session: data.session };
      } catch {
        return { success: false, error: 'Koneksi gagal. Silakan coba lagi.' };
      }
    }

    // Simulasi pemrosesan jaringan realistis
    await new Promise((resolve) => setTimeout(resolve, 800));

    const db = getLocalUsersDB();
    const normalizedEmail = payload.email.trim().toLowerCase();

    // Periksa apakah email sudah terdaftar
    const existing = db.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return {
        success: false,
        error: 'Email sudah terdaftar.',
      };
    }

    // Hash password sebelum disimpan
    const passwordHash = await hashPassword(payload.password);
    const userId = 'usr_' + Math.random().toString(36).substring(2, 9);
    const trialExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const newUser: StoredUser = {
      id: userId,
      name: payload.name.trim(),
      storeName: payload.storeName.trim(),
      email: normalizedEmail,
      passwordHash,
      plan: payload.targetPlan || 'standar',
      trialExpiresAt,
      createdAt: new Date().toISOString(),
    };

    db.push(newUser);
    saveLocalUsersDB(db);

    const session: UserSession = {
      id: newUser.id,
      name: newUser.name,
      storeName: newUser.storeName,
      email: newUser.email,
      plan: newUser.plan,
      trialExpiresAt: newUser.trialExpiresAt,
      token: 'agx_tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
      createdAt: newUser.createdAt,
    };

    this.setSession(session);
    return { success: true, session };
  },

  /**
   * Masuk ke akun yang sudah ada
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
      return { success: false, error: 'Alamat email tidak valid.' };
    }
    if (!payload.password) {
      return { success: false, error: 'Password wajib diisi.' };
    }

    // Jika ada real backend di AUTH_CONFIG.BASE_URL, coba panggil terlebih dahulu
    if (AUTH_CONFIG.BASE_URL) {
      try {
        const response = await fetch(`${AUTH_CONFIG.BASE_URL}${AUTH_CONFIG.ENDPOINTS.LOGIN}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) {
          return { success: false, error: data.message || 'Kredensial salah.' };
        }
        this.setSession(data.session);
        return { success: true, session: data.session };
      } catch {
        return { success: false, error: 'Koneksi gagal. Silakan coba lagi.' };
      }
    }

    // Simulasi delay network
    await new Promise((resolve) => setTimeout(resolve, 750));

    const db = getLocalUsersDB();
    const normalizedEmail = payload.email.trim().toLowerCase();
    const user = db.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      return {
        success: false,
        error: 'Kredensial salah.',
      };
    }

    const inputHash = await hashPassword(payload.password);
    if (user.passwordHash !== inputHash) {
      return {
        success: false,
        error: 'Kredensial salah.',
      };
    }

    const session: UserSession = {
      id: user.id,
      name: user.name,
      storeName: user.storeName,
      email: user.email,
      plan: user.plan,
      trialExpiresAt: user.trialExpiresAt,
      token: 'agx_tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
      createdAt: user.createdAt,
    };

    this.setSession(session);
    return { success: true, session };
  },

  setSession(session: UserSession): void {
    try {
      localStorage.setItem(AUTH_CONFIG.STORAGE_KEYS.SESSION, JSON.stringify(session));
    } catch {
      // Ignore
    }
  },

  getSession(): UserSession | null {
    try {
      const raw = localStorage.getItem(AUTH_CONFIG.STORAGE_KEYS.SESSION);
      if (raw) return JSON.parse(raw);
    } catch {
      return null;
    }
    return null;
  },

  logout(): void {
    try {
      localStorage.removeItem(AUTH_CONFIG.STORAGE_KEYS.SESSION);
    } catch {
      // Ignore
    }
  },
};
