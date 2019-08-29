import { AgePipe } from './age.pipe';

const mockBirthday = '2010-11-11';
const invalidBirthdayInput = 'hgtu23-df';

describe('AgePipe', () => {
  let pipe: AgePipe;

  beforeEach(() => {
    pipe = new AgePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Calculations', () => {
    it('should return false if invalid input data', () => {
      const expectation = pipe.transform(invalidBirthdayInput);
      expect(expectation).toBeFalsy();
    });
  
    it('should transform input date to age', () => {
      const expectation = pipe.transform(mockBirthday);
      expect(expectation).toBe(8);
    });
  });
});
