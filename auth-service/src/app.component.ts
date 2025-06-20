import { HttpClient } from '@angular/common/http';

export class AppComponent {
  constructor(private http: HttpClient) {}

  loginTest() {
    this.http.post('http://localhost:3000/auth/login', {
      username: 'admin',
      password: 'password'
    }).subscribe({
      next: (res: any) => console.log('JWT Token:', res.access_token),
      error: (err) => console.error('Login failed:', err)
    });
  }
}