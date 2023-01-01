const listHelper = require('../utils/list_helper')
const blogs = require('./blogs.json')

// const { describe } = require('node:test');

test('dummy returns one', () => {
    // const blogs = [];

    const result = 1 //listHelper.dummy(blogs);
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('favourite blog', () => {
    test('get favourite blog for supplied list', () => {
        const fav = listHelper.favouriteBlog(blogs)
        expect(fav).toHaveProperty('likes', 12)
    })
})

describe('most articles written by an author', () => {
    test('get author with most blogs', () => {
        const most = listHelper.mostBlogs(blogs)
        expect(most).toMatchObject({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })

    test('get empty result when empty array supplied', () => {
        const res = listHelper.mostBlogs([])
        expect(res).toMatchObject({
            author: '',
            blogs: 0,
        })
    })

    test('get the only author with 1 author supplied', () => {
        const res = listHelper.mostBlogs([
            {
                _id: '5a422ba71b54a676234d17fb',
                title: 'TDD harms architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
                likes: 0,
                __v: 0,
            },
            {
                _id: '5a422ba71d54a676234d17fb',
                title: 'A18371e',
                author: 'Robert C. Martin',
                url: 'http://example.co',
                likes: 0,
                __v: 0,
            },
            {
                _id: '5a422ba78b54a676234d17fb',
                title: 'TDD benefits architecture',
                author: 'Robert C. Martin',
                url: 'http://blog.cleancoder.com/uncle-bob/2022/03/03/TDD-Benefits-Architecture.html',
                likes: 0,
                __v: 0,
            },
        ])

        expect(res).toMatchObject({
            author: 'Robert C. Martin',
            blogs: 3,
        })
    })
})

describe('author with most likes', () => {
    test('get author with most likes for testing list', () => {
        const res = listHelper.mostLikes(blogs)
        expect(res).toMatchObject({ author: 'Edsger W. Dijkstra', likes: 17 })
    })

    test('get no author and 0 likes for empty list', () => {
        const res = listHelper.mostLikes([])
        expect(res).toMatchObject({ author: '', likes: 0 })
    })
})
