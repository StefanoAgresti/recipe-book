import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  async signUp(email: string, password: string) {
    try {
      const data = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const user = data.user;
      return user;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already taken');
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const data = await this.auth.signInWithEmailAndPassword(email, password);

      const user = data.user;
      return user;
    } catch (error: any) {
      if (error.code === 'auth/invalid-login-credentials') {
        throw new Error('User not found. Check your email and password');
      } else {
        console.error(error.message);
      }
      throw error;
    }
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/auth']);
      })
      .catch((err) => console.log(err));
  }

  getCurrentUser() {
    return this.auth.authState;
  }
}
