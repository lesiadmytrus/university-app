import { AgePipe } from './age.pipe';

const mockBirthday = '2013-12-12';
const invalidBirthdayInput = 'hgtu23-df';
const greaterBirthdayInputThanCurrentYear = '2019-12-12';

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
      expect(expectation).toEqual(5);
    });

    it('should return 0 if birthday bigger than current year', () => {
      const expectation = pipe.transform(greaterBirthdayInputThanCurrentYear);
      expect(expectation).toEqual(0);
    });
  });
});
