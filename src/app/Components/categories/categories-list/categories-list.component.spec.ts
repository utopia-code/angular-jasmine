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

describe('CategoriesListComponent', () => {
    let component: CategoriesListComponent;
    let fixture: ComponentFixture<CategoriesListComponent>;
    let localStorageService: LocalStorageService;

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
                        path: 'user/category/:id',
                        component: TemporalComponentForRoutes
                    } 
                ])
            ],
            declarations: [CategoriesListComponent],
            providers: [CategoryService, LocalStorageService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesListComponent);
        component = fixture.componentInstance;
        localStorageService = TestBed.inject(LocalStorageService);
        fixture.detectChanges();
    });

    it('Ej4 - Test1 - should create', () => {
        expect(component).toBeTruthy();
    });

    it('Ej4 - Test2 - loadCategories success from subscription', () => {
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

        localStorageService.set('user_id', '1');
        const spy = spyOn(categoryService, 'getCategoriesByUserId').and.returnValue(of(categoriesList));
        component['loadCategories']();
        expect(spy).toHaveBeenCalledWith('1');
        expect(component.categories).toEqual(categoriesList);
        
    });

    it('Ej4 - Test3 - should createCategory success', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.createCategory();
        expect(spy).toHaveBeenCalledWith('/user/category/');
    });

    it('Ej4 - Test4 - should updateCategory success', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.updateCategory('1');
        expect(spy).toHaveBeenCalledWith('/user/category/1');
    });

});


