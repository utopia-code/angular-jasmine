import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { CategoryDTO } from "../Models/category.dto";
import { CategoryService, deleteResponse } from "./category.service";

const categoriesList: CategoryDTO[] = [
    {
        userId: '',
        categoryId: '1',
        css_color: '',
        description: '',
        title: ''
    },
    {
        userId: '',
        categoryId: '2',
        css_color: '',
        description: '',
        title: ''
    },
    {
        userId: '',
        categoryId: '3',
        css_color: '',
        description: '',
        title: ''
    }
];

describe('CategoryService', () => {
    let service: CategoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CategoryService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(CategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('Ej3 - Test1 - should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Ej3 - Test2 - GET method and getCategoriesByUserId return a list of categories', () => {
        service.getCategoriesByUserId('1').subscribe((resp: CategoryDTO[]) => {
            expect(resp).toEqual(categoriesList);
        });

        const req = httpMock.expectOne('http://localhost:3000/users/categories/1');

        expect(req.request.method).toBe('GET');

        req.flush(categoriesList);
    });

    it('Ej3 - Test3 - POST method and create new category', () => {
        let newCategory: CategoryDTO = {userId: '', categoryId: '4', css_color: '', description: '', title: ''};
        let responseCategory: CategoryDTO = {userId: '', categoryId: '4', css_color: '', description: '', title: ''};
        
        service.createCategory(newCategory).subscribe((resp: CategoryDTO) => {
            expect(resp).toEqual(responseCategory);
        });

        const req = httpMock.expectOne('http://localhost:3000/categories');

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(newCategory);

        req.flush(responseCategory);
    });

    it('Ej3 - Test4 - GET method and getCategoryById return a category', () => {
        service.getCategoryById('1').subscribe((resp: CategoryDTO) => {
            expect(resp).toEqual(categoriesList[0]);
        });

        const req = httpMock.expectOne('http://localhost:3000/categories/1');

        expect(req.request.method).toBe('GET');

        req.flush(categoriesList[0]);
    });

    it('Ej3 - Test5 - PUT method and update category', () => {
        let currentCategory: CategoryDTO = {userId: '', categoryId: '1', css_color: '', description: '', title: ''};
        let updatedCategory: CategoryDTO = {userId: '', categoryId: '1', css_color: '#123456', description: '', title: ''};
        
        service.updateCategory('1', currentCategory).subscribe((resp: CategoryDTO) => {
            expect(resp).toEqual(updatedCategory);
        });

        const req = httpMock.expectOne('http://localhost:3000/categories/1');

        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toBe(currentCategory);

        req.flush(updatedCategory);
    });

    it('Ej3 - Test6 - DELETE method and detele an existing category', () => {
        const deleteResponse: deleteResponse = { affected: 1 };

        service.deleteCategory('1').subscribe((resp: deleteResponse) => {
            expect(resp.affected).toBe(1);
        });

        const req = httpMock.expectOne('http://localhost:3000/categories/1');

        expect(req.request.method).toBe('DELETE');

        req.flush(deleteResponse);
    });
});