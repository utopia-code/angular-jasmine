import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { PostDTO } from 'src/app/Models/post.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { PostService } from 'src/app/Services/post.service';
import { PostsListComponent } from './posts-list.component';

class TemporalComponentForRoutes {};

class TemporalLocalStorageService {
    get(): string {
        return '1'; 
    }
}

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

const postsList: PostDTO[] = [
    {
        postId: '1',
        title: '',
        description: '',
        num_likes: 0,
        num_dislikes: 0,
        publication_date: new Date(),
        categories: [categoriesList[0]],
        userId: '',
        userAlias: '',
    },
    {
        postId: '2',
        title: '',
        description: '',
        num_likes: 0,
        num_dislikes: 0,
        publication_date: new Date(),
        categories: [categoriesList[1]],
        userId: '',
        userAlias: '',
    },
    {
        postId: '3',
        title: '',
        description: '',
        num_likes: 0,
        num_dislikes: 0,
        publication_date: new Date(),
        categories: [categoriesList[2]],
        userId: '',
        userAlias: '',
    },
]

describe('PostsListComponent', () => {
    let component: PostsListComponent;
    let fixture: ComponentFixture<PostsListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'user/post',
                        component: TemporalComponentForRoutes
                    },
                    {
                        path: 'user/post/1',
                        component: TemporalComponentForRoutes
                    } 
                ])
            ],
            declarations: [PostsListComponent],
            providers: [PostService, { provide: LocalStorageService, useClass: TemporalLocalStorageService }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PostsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('loadPosts success from subscription', () => {
        const postService = fixture.debugElement.injector.get(PostService);
        const spy = spyOn(postService, 'getPostsByUserId').and.returnValue(of(postsList));
        component['loadPosts']();
        expect(spy).toHaveBeenCalledWith('1');
        expect(component.posts).toEqual(postsList);
        
    });

    it('createCategory() should navigate to user/post', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.createPost();
        expect(spy).toHaveBeenCalledWith('/user/post/');
    });

    it('updateCategory() should navigate to user/post/1', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.updatePost('1');
        expect(spy).toHaveBeenCalledWith('/user/post/1');
    });

});