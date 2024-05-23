import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
    let pipe: FormatDatePipe;

    beforeEach(() => {
        pipe = new FormatDatePipe();
    });

    it('Ej1 - Test1 - should create', () => {
        expect(pipe).toBeTruthy();
    });

    it('Ej1 - Test2 - format date type with argument 1', () => {
        let date: Date = new Date('2022-01-01');
        const result = pipe.transform(date, 1);
        expect(result).toBe('01012022');
    });
    
    it('Ej1 - Test3 - format date type with argument 2', () => {
        let date: Date = new Date('2022-01-01');
        const result = pipe.transform(date, 2);
        expect(result).toBe('01 / 01 / 2022');
    });

    it('Ej1 - Test4 - format date type with argument 3', () => {
        let date: Date = new Date('2022-01-01');
        const result = pipe.transform(date, 3);
        expect(result).toBe('01/01/2022');
    });

    it('Ej1 - Test5 - format date type with argument 4', () => {
        let date: Date = new Date('2022-01-01');
        const result = pipe.transform(date, 4);
        expect(result).toBe('2022-01-01');
    });
})