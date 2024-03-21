<template>
    <div class="news">
 
      <button class="back-button" @click="goBack">
        <b-icon icon="arrow-left"></b-icon> Back
      </button>

      <h2 class="title">{{ title }}</h2>
      <p class="author">Author: {{ author }}</p>
      <p class="date">Date: {{ date }}</p>
      <p class="labels" v-if="labels.length > 0">Labels: {{ labels.map(label => label).join(', ') }}</p>
      <div class="content" style="white-space: pre-line;">{{ content }}</div>

      <button class="edit-button" @click="editNews">
        <b-icon icon="pencil"></b-icon> Edit
      </button>

    </div>
  </template>
  
<script>
import axios from "axios";
import {getArticle} from "@/api/articles";

  export default {
    data() {
      return {
        id: '',
        title: '',
        content: '',
        author: '',
        date: null,
        labels: [],
      };
    },
    methods:{
      goBack() {
      // 返回上一页的操作
      this.$router.go(-1);
      },
      editNews() {
        this.$router.push({ path: `/addNews/${this.id}` });
      },
      async fetchItems(id) {
          try {
              await getArticle(id).then((res) => {
                this.title = res.data.title;
                this.content = res.data.content;
                this.author = res.data.author;
                var date = res.data.date;
                this.date = new Date(date);
                this.id = res.data.id;
                this.labels = res.data.labels;
              });
          } catch (error) {
              console.error(error);
          }
      },
    },
    created() {
        const id = this.$route.params.id;
        this.fetchItems(id);
    }
  };
  </script>
  
  <style scoped>
  .news {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  
  .author,
  .date,
  .labels{
    margin-bottom: 5px;
    font-size: 14px;
    color: #888;
  }
  
  .content {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
  }

  .back-button,
  .edit-button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
  }

.back-button {
  background-color: #f2f2f2;
  color: #333;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
}

.back-button:hover,
.edit-button:hover {
  background-color: #e0e0e0;
}
  </style>