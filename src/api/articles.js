import request from "@/api/request";

export function getArticles(page, size) {
  return request({
    method: "GET",
    url: "/rawdata?/page=" + page + "&pageSize=" + size,
  });
}

export function getArticle(id) {
  return request({
    method: "GET",
    url: `/rawdata/${id}`
  });
}

export function addArticle(article) {
  return request({
    method: "POST",
    url: "/rawdata",
    data: article
  });
}

export function deleteArticle(id) {
  return request({
    method: "DELETE",
    url: `/rawdata/${id}`
  });
}
export function deleteArticles(ids) {
  return request({
    method: "DELETE",
    url: `/rawdata`,
    data: ids
  });
}
export function updateArticle(id, article) {
  return request({
    method: "PUT",
    url: `/rawdata/${id}`,
    data: article
  });
}

export function searchArticles(page, size, search) {
  return request({
    method: "POST",
    url: "/rawdata/query?/page=" + page + "&pageSize=" + size,
    data: search
  });
}

export function getKeywords() {
  return request({
    method: "GET",
    url: `/rawdata/keywords`
  });
}
export function filterArticles(query) {
  return request({
    method: "post",
    url: `/rawdata/filter/${keyword}`
  });
}
