import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
    let pipe: FormatDatePipe;

    beforeEach(() => {
        pipe = new FormatDatePipe();
    });

    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('should format date type 1', () => {
        let date: Date = new Date('2022-01-01');
        const result = pipe.transform(date, 1);
        expect(result).toBe('01012022');
    });
    
    it('should format date type 2', () => {
        let date: Date = new Date('2022-01-01');
        const result = pipe.transform(date, 2);
        expect(result).toBe('01 / 01 / 2022');
    });

    it('should format date type 3', () => {
        let date: Date = new Date('2022-01-01');
        const result = pipe.transform(date, 3);
        expect(result).toBe('01/01/2022');
    });

    it('should format date type 4', () => {
        let date: Date = new Date('2022-01-01');
        const result = pipe.transform(date, 4);
        expect(result).toBe('2022-01-01');
    });
})