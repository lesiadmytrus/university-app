import { async, TestBed } from '@angular/core/testing';
import { MessagesService } from './messages.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockSuccessMessage = 'You are success!';
const mockErrorMessage = { message: 'It is an error!' };

describe('MessagesService', () => {
  let messagesService: jasmine.SpyObj<MessagesService>;
  let toster: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MessagesService, useClass: MessagesService },
        { provide: ToastrService, useClass: ToastrService }
      ]
    });

    messagesService = TestBed.get(MessagesService);
    toster = TestBed.get(ToastrService);
  }));

  it('should be created', () => {
    expect(messagesService).toBeTruthy();
  });

  it('#handlerSuccess should return success message', () => {
    spyOn(toster, 'success').and.callThrough();
    messagesService.handlerSuccess(mockSuccessMessage);
    expect(toster.success).toHaveBeenCalled();
  });

  it('#handlerSuccess should return default success message', () => {
    spyOn(toster, 'success').and.callThrough();
    messagesService.handlerSuccess('');
    expect(toster.success).toHaveBeenCalled();
  });
  
  it('#handlerError should return error message', () => {
    spyOn(toster, 'error').and.callThrough();
    messagesService.handlerError(mockErrorMessage);
    expect(toster.error).toHaveBeenCalled();
  });
  
  it('#handlerError should return default error message', () => {
    spyOn(toster, 'error').and.callThrough();
    messagesService.handlerError('');
    expect(toster.error).toHaveBeenCalled();
  });

  it('#handlerWarning should return default warning message', () => {
    spyOn(toster, 'warning').and.callThrough();
    messagesService.handlerWarning('');
    expect(toster.warning).toHaveBeenCalled();
  });
});
