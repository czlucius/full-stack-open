const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, current) => {
        return accumulator + current.likes
    }, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce(
        (a, b) => {
            if (a.likes > b.likes) return a
            else return b
        },
        { likes: 0 }
    ) // TODO if blogs is empty this will be invalid!!!
}

const mostBlogs = (blogs) => {
    let authors = {}

    for (const blog of blogs) {
        if (blog.author in authors) {
            authors[blog.author] += 1
        } else {
            authors[blog.author] = 1
        }
    }
    // console.debug(authors);

    const authorMost = Object.keys(authors).reduce(
        (a, b) => (authors[a] > authors[b] ? a : b),
        ''
    )

    const obj = {
        author: authorMost,
        blogs: authors[authorMost] ?? 0,
    }
    // console.debug(obj);
    return obj
}

const mostLikes = (blogs) => {
    let authors = {}

    for (const blog of blogs) {
        if (blog.author in authors) {
            authors[blog.author] += blog.likes
        } else {
            authors[blog.author] = blog.likes
        }
    }
    const authorMost = Object.keys(authors).reduce(
        (a, b) => (authors[a] > authors[b] ? a : b),
        ''
    )

    const obj = {
        author: authorMost,
        likes: authors[authorMost] ?? 0,
    }
    return obj
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}
