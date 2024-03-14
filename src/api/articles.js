import request from "@/api/request";

export function getArticles() {
  return request({
    method: "GET",
    url: "https://localhost:8080/rawdata"
  });
}

export function getArticle(id) {
  return request({
    method: "GET",
    url: `https://localhost:8080/rawdata/${id}`
  });
}

export function addArticle(article) {
  return request({
    method: "POST",
    url: "https://localhost:8080/rawdata",
    data: article
  });
}

export function deleteArticle(id) {
    return request({
        method: "DELETE",
        url: `https://localhost:8080/rawdata/${id}`
    });
}

export function updateArticle(id, article) {
  return request({
    method: "PUT",
    url: `https://localhost:8080/rawdata/${id}`,
    data: article
  });
}
