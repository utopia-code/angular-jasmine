import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { CategoryService } from "src/app/Services/category.service";
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CategoriesListComponent } from "./categories-list.component";

class TemporalComponentForRoutes {};

class TemporalLocalStorageService {
    get(): string {
        return '1'; 
    }
}

describe('CategoriesListComponent', () => {
    let component: CategoriesListComponent;
    let fixture: ComponentFixture<CategoriesListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'user/category',
                        component: TemporalComponentForRoutes
                    },
                    {
                        path: 'user/category/1',
                        component: TemporalComponentForRoutes
                    } 
                ])
            ],
            declarations: [CategoriesListComponent],
            providers: [CategoryService, { provide: LocalStorageService, useClass: TemporalLocalStorageService }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('loadCategories success from subscription', () => {
        const categoryService = fixture.debugElement.injector.get(CategoryService);
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

        const spy = spyOn(categoryService, 'getCategoriesByUserId').and.returnValue(of(categoriesList));
        component['loadCategories']();
        expect(spy).toHaveBeenCalledWith('1');
        expect(component.categories).toEqual(categoriesList);
        
    });

    it('createCategory() should navigate to user/categories', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.createCategory();
        expect(spy).toHaveBeenCalledWith('/user/category/');
    });

    it('updateCategory() should navigate to user/categories/1', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.updateCategory('1');
        expect(spy).toHaveBeenCalledWith('/user/category/1');
    });

});


