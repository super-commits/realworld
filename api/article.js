import { request } from "@/plugins/request";

export const getArticles = params => {
  return request({
    method: 'get',
    url: 'articles',
    params
  })
}

export const getFeedArticles = params => {
  return request({
    method: 'get',
    url: 'articles/feed',
    params
  })
}

export const addFavorite = slug => {
  return request({
    method: 'post',
    url: `articles/${slug}/favorite`,
  })
}

export const removeFavorite = slug => {
  return request({
    method: 'delete',
    url: `articles/${slug}/favorite`,
  })
}

export const getArticle = slug => {
  return request({
    method: 'get',
    url: `articles/${slug}`,
  })
}

export const getComments = slug => {
  return request({
    method: 'get',
    url: `articles/${slug}/comments`,
  })
}

export const addComment = (slug, data) => {
  return request({
    method: 'post',
    url: `articles/${slug}/comments`,
    data
  })
}

export const delComment = (slug, id) => {
  return request({
    method: 'delete',
    url: `articles/${slug}/comments/${id}`,
  })
}

export const delArticle = slug => {
  return request({
    method: 'delete',
    url: `articles/${slug}`,
  })
}

export const createArticle = data => {
  return request({
    method: 'post',
    url: 'articles',
    data
  })
}

export const updateArticle = (data, slug) => {
  return request({
    method: 'put',
    url: `articles/${slug}`,
    data
  })
}