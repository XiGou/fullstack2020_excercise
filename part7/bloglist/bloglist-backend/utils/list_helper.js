const _ = require('lodash')
const { result } = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((pre, cur) => {
        return pre + cur.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null
    }

    return blogs.reduce((pre, cur) => {
        return (cur.likes > pre.likes)?cur:pre
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0)return null

    const countRes = _.countBy(blogs, (b)=>b.author)
    const countResList = _.transform(countRes, (res, val, key) => {
        res.push({author:key, blogs: val})
    }, [])

    return countResList.reduce((pre, cur) => {
        return (cur.blogs > pre.blogs)?cur:pre
    }, countResList[0])
}

const mostlike = (blogs) => {
    if(blogs.length === 0)return null
    const groupRes = _.groupBy(blogs, (b)=>b.author)

    // console.log(groupRes)
    const likeOfAuthor = _.transform(groupRes, (res, val, key)=>{
        let likes = _.sumBy(val, v=>v.likes)
        res.push({author:key, likes:likes})
    }, [])

    return _.maxBy(likeOfAuthor, l=>l.likes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostlike 
}