/**
 * auth.ts — Нэвтрэх / бүртгүүлэх үйлчилгээний "гэрээ" (interface).
 *
 * ОДООГООР ЗӨВХӨН ДҮРС ТӨРХ: Нэвтрэх хуудас нь хэрэглэгчийг нэвтэрсэн мэт
 * хуурамчаар харуулахгүйн тулд энд байгаа бүх функц "backend холбогдоогүй"
 * алдаа буцаадаг. Жинхэнэ нэвтрэлтийн сервер бэлэн болоход эдгээр функцийн
 * дотор талыг л бичихэд Login хуудас шууд ажиллаж эхэлнэ.
 */
import { BackendNotConnectedError } from './apiClient';

/** Нэвтрэхэд шаардлагатай мэдээлэл. */
export interface SignInCredentials {
  email: string;
  password: string;
}

/** Бүртгүүлэхэд шаардлагатай мэдээлэл (нэвтрэх мэдээлэл + нэр, байгууллага). */
export interface SignUpPayload extends SignInCredentials {
  fullName: string;
  organization: string;
}

/** Амжилттай нэвтэрсний дараа серверээс ирэх мэдээлэл. */
export interface AuthSession {
  userId: string;
  organizationId: string;
  accessToken: string;
}

/** Нэвтрэлтийн үйлчилгээнд байх ёстой функцууд. */
export interface AuthService {
  /** Имэйл, нууц үгээр нэвтрэх. */
  signIn(credentials: SignInCredentials): Promise<AuthSession>;
  /** Шинэ бүртгэл үүсгэх. */
  signUp(payload: SignUpPayload): Promise<AuthSession>;
  /** Google бүртгэлээр нэвтрэх. */
  signInWithGoogle(): Promise<AuthSession>;
  /** Нууц үг сэргээх холбоос имэйлээр илгээх. */
  requestPasswordReset(email: string): Promise<void>;
}

/** Одоогийн хэрэгжүүлэлт: бүгд "backend холбогдоогүй" алдаа буцаана. */
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
