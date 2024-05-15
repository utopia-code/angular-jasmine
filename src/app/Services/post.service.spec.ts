import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { NONE_TYPE } from "@angular/compiler";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { CategoryDTO } from "../Models/category.dto";
import { PostDTO } from "../Models/post.dto";
import { deleteResponse } from "./category.service";
import { PostService, updateResponse } from "./post.service";

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

describe('PostService', () => {
    let service: PostService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]  
        });
    });

    beforeEach(() => {
        service = TestBed.inject(PostService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    })

    it('GET method and getPosts return all posts', () => {
        service.getPosts().subscribe((resp: PostDTO[]) => {
            expect(resp).toEqual(postsList);
        });

        const req = httpMock.expectOne('http://localhost:3000/posts');

        expect(req.request.method).toBe('GET');

        req.flush(postsList);
    });

    it('GET method and getPostsByUserId return a list of posts', () => {
        service.getPostsByUserId('1').subscribe((resp: PostDTO[]) => {
            expect(resp).toEqual(postsList);
        });

        const req = httpMock.expectOne('http://localhost:3000/users/posts/1');

        expect(req.request.method).toBe('GET');

        req.flush(postsList);
    });

    it('POST method and createPost create a new item of posts', () => {
        let newPost: PostDTO = {
            postId: '4',
            title: '',
            description: '',
            num_likes: 0,
            num_dislikes: 0,
            publication_date: new Date(),
            categories: [categoriesList[1], categoriesList[2]],
            userId: '',
            userAlias: '',
        };
        let responsePost: PostDTO = {
            postId: '4',
            title: '',
            description: '',
            num_likes: 0,
            num_dislikes: 0,
            publication_date: new Date(),
            categories: [categoriesList[1], categoriesList[2]],
            userId: '',
            userAlias: '',
        };
        
        service.createPost(newPost).subscribe((resp: PostDTO) => {
            expect(resp).toEqual(responsePost);
        });

        const req = httpMock.expectOne('http://localhost:3000/posts');

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(newPost);

        req.flush(responsePost);
    });

    it('GET method and getPostById return an item of posts', () => {
        service.getPostById('1').subscribe((resp: PostDTO) => {
            expect(resp).toEqual(postsList[0]);
        });

        const req = httpMock.expectOne('http://localhost:3000/posts/1');

        expect(req.request.method).toBe('GET');

        req.flush(postsList[0]);
    });

    it('PUT method and updateCategory update an item of categories', () => {
        let currentPost: PostDTO = {
            postId: '3',
            title: '',
            description: '',
            num_likes: 0,
            num_dislikes: 0,
            publication_date: new Date(),
            categories: [categoriesList[2]],
            userId: '',
            userAlias: '',
        };
        let updatedPost: PostDTO = {
            postId: '3',
            title: '',
            description: '',
            num_likes: 0,
            num_dislikes: 0,
            publication_date: new Date(),
            categories: [categoriesList[2], categoriesList[1]],
            userId: '',
            userAlias: '',
        };
        
        service.updatePost('1', currentPost).subscribe((resp: PostDTO) => {
            expect(resp).toEqual(updatedPost);
        });

        const req = httpMock.expectOne('http://localhost:3000/posts/1');

        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toBe(currentPost);

        req.flush(updatedPost);
    });

    it('PUT method and likePost return a new value of likes', () => {
        const updateResponse: updateResponse = { affected: 1 };

        service.likePost('2').subscribe((resp: updateResponse) => {
            expect(resp.affected).toBe(1);
        });

        const req = httpMock.expectOne('http://localhost:3000/posts/like/2');

        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toBe(NONE_TYPE);

        req.flush(updateResponse);
    });

    it('PUT method and dislikePost return a new value of likes', () => {
        const updateResponse: updateResponse = { affected: 1 };

        service.dislikePost('2').subscribe((resp: updateResponse) => {
            expect(resp.affected).toBe(1);
        });

        const req = httpMock.expectOne('http://localhost:3000/posts/dislike/2');

        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toBe(NONE_TYPE);

        req.flush(updateResponse);
    });

    it('DELETE method and deletePost delete an item of post list', () => {
        const deleteResponse: deleteResponse = { affected: 1 };

        service.deletePost('1').subscribe((resp: deleteResponse) => {
            expect(resp.affected).toBe(1);
        });

        const req = httpMock.expectOne('http://localhost:3000/posts/1');

        expect(req.request.method).toBe('DELETE');

        req.flush(deleteResponse);
    });

});

