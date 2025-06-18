import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './jwt.interceptor';

export const appConfig = {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])) // Add this
  ]
};