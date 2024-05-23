import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./header.component";

class TemporalComponentForRoutes {};

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'home',
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'login',
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'register',
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'posts',
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'categories',
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'profile',
                        component: TemporalComponentForRoutes,
                    }
                ])
            ],
            declarations: [HeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Ej2 - Test1 - should create', () => {
        expect(component).toBeTruthy();
    });

    it('Ej2 - Test2 - should navigate to home', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('home');
        expect(spy).toHaveBeenCalledWith('home');
    });
    
    it('Ej2 - Test3 - should navigate to login', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('login');
        expect(spy).toHaveBeenCalledWith('login');
    });

    it('Ej2 - Test4 - should navigate to register', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('register');
        expect(spy).toHaveBeenCalledWith('register');
    });

    it('Ej2 - Test5 - should navigate to posts', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('posts');
        expect(spy).toHaveBeenCalledWith('posts');
    });

    it('Ej2 - Test6 - should navigate to categories', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('categories');
        expect(spy).toHaveBeenCalledWith('categories');
    });

    it('Ej2 - Test7 - should navigate to profile', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('profile');
        expect(spy).toHaveBeenCalledWith('profile');
    });

    it('Ej5 - Test1 - should no login and get 4 buttons (Dashboard, Home, Login and Register)', () => {
        component.showAuthSection = false;
        component.showNoAuthSection = true;

        fixture.detectChanges();
        
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toBe(4);

        const buttonHTML = [...buttons].map(button => button.textContent.trim());

        expect(buttonHTML).toContain('Dashboard');
        expect(buttonHTML).toContain('Home');
        expect(buttonHTML).toContain('Login');
        expect(buttonHTML).toContain('Register');
    })

    it('Ej5 - Test2 - should login and get 6 buttons (Dashboard, Home, Admin posts, Admin categories, Profile, Logout)', () => {
        component.showAuthSection = true;
        component.showNoAuthSection = false;

        fixture.detectChanges();

        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons.length).toBe(6);

        const buttonHTML = [...buttons].map(button => button.textContent.trim());

        expect(buttonHTML).toContain('Dashboard');
        expect(buttonHTML).toContain('Home');
        expect(buttonHTML).toContain('Admin posts');
        expect(buttonHTML).toContain('Admin categories');
        expect(buttonHTML).toContain('Profile');
        expect(buttonHTML).toContain('Logout');
    })

});