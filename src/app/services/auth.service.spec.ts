import { TestBed } from '@angular/core/testing';

import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

const mockToken = 'fkjh45hk45jdhfg546456h56hjgkljdgj';

describe('AuthService', () => {
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthService }
      ]
    });

    auth = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(auth).toBeTruthy();
  });

  describe('LocalStorage', () => {
    it('#setItem should set user token', () => {
      spyOn(localStorage, 'setItem').and.callThrough();
      auth.setToken(mockToken);
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('#getItem should get user token', () => {
      localStorage.setItem('access_token', mockToken);
      spyOn(localStorage, 'getItem').and.callThrough();
      auth.getToken();
      expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    });

    it('#removeItem should delete user token', () => {
      spyOn(localStorage, 'removeItem').and.callThrough();
      auth.logOut();
      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    });

    it('should return true if user is log in', () => {
      spyOn(localStorage, 'getItem').and.callThrough();
      auth.isLoggedIn();
      expect(localStorage.getItem).toHaveBeenCalledWith('access_token');
    });
  });
});
