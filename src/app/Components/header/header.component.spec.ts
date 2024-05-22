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

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to home', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('home');
        expect(spy).toHaveBeenCalledWith('home');
    });
    
    it('should navigate to login', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('login');
        expect(spy).toHaveBeenCalledWith('login');
    });

    it('should navigate to register', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('register');
        expect(spy).toHaveBeenCalledWith('register');
    });

    it('should navigate to posts', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('posts');
        expect(spy).toHaveBeenCalledWith('posts');
    });

    it('should navigate to categories', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('categories');
        expect(spy).toHaveBeenCalledWith('categories');
    });

    it('should navigate to profile', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigateTo('profile');
        expect(spy).toHaveBeenCalledWith('profile');
    });

    it('should has a header with 4 links (Dashboard, Home, Login and Register) if showNoAuthSection is true', () => {
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

    it('should has a header with 6 links (Dashboard, Home, Admin posts, Admin categories, Profile, Logout) if showAuthSection is true', () => {
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