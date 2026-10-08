import { BackendNotConnectedError } from './apiClient';

/**
 * Authentication contract for the future SaaS app.
 * UI ONLY for now: every method rejects so the login page never pretends
 * a user was signed in. Implement these against the real auth API later.
 */

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpPayload extends SignInCredentials {
  fullName: string;
  organization: string;
}

export interface AuthSession {
  userId: string;
  organizationId: string;
  accessToken: string;
}

export interface AuthService {
  signIn(credentials: SignInCredentials): Promise<AuthSession>;
  signUp(payload: SignUpPayload): Promise<AuthSession>;
  signInWithGoogle(): Promise<AuthSession>;
  requestPasswordReset(email: string): Promise<void>;
}

export const authService: AuthService = {
  async signIn() {
    throw new BackendNotConnectedError('auth.signIn');
  },
  async signUp() {
    throw new BackendNotConnectedError('auth.signUp');
  },
  async signInWithGoogle() {
    throw new BackendNotConnectedError('auth.signInWithGoogle');
  },
  async requestPasswordReset() {
    throw new BackendNotConnectedError('auth.requestPasswordReset');
  },
};
