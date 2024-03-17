<template>
    <div>
      <section class="section">
        <div class="container">
          <h1 class="title">Edit News</h1>
          <b-field label="Title">
            <b-input v-model="title" type="text" placeholder="Enter title" required></b-input>
          </b-field>
          
          <b-field label="Content">
            <b-input v-model="content" type="textarea" placeholder="Enter content" required></b-input>
          </b-field>
          
          <b-field label="Author">
            <b-input v-model="author" type="text" placeholder="Enter author" required></b-input>
          </b-field>
          
          <b-field label="Date">
            <b-datepicker v-model="date" placeholder="Select date" required></b-datepicker>
          </b-field>
          
          <b-field label="Types">
            <b-checkbox-button v-model="selectedTypes"
                native-value="科技" required>
                <span>科技</span>
            </b-checkbox-button>
  
            <b-checkbox-button v-model="selectedTypes"
                native-value="体育" required>
                <span>体育</span>
            </b-checkbox-button>
    
            <b-checkbox-button v-model="selectedTypes"
                native-value="娱乐" required>
                <span>娱乐</span>
            </b-checkbox-button>
    
            <b-checkbox-button v-model="selectedTypes"
                native-value="财经" required>
                <span>财经</span>
            </b-checkbox-button>
    
            <b-checkbox-button v-model="selectedTypes"
                native-value="其他" required>
                <span>其他</span>
            </b-checkbox-button>
          </b-field>
          <p class="content">
            <b>selectedTypes:</b>
            {{ selectedTypes }}
          </p>

          <b-field label="Labels">
            <div>
              <div v-for="(label, index) in labels" :key="index">
                <span>{{ label }}</span>
                <button type="is-danger" @click="removeLabel(index)"
                    icon-left="delete">删除</button>
              </div>
              <input v-model="newLabel" placeholder="输入新关键词" />
              <button @click="addNewLabel">添加关键词</button>
            </div>
          </b-field>
          
        <b-button @click="submit" type="is-primary">提交</b-button>
      </div>
    </section>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      id: '',
      title: '',
      content: '',
      author: '',
      date: null,
      labels: [],
      types: [],

      selectedTypes: [],
      newLabel: '', // 新添加的关键词
    };
  },
  created() {
    const newsData = this.$route.params.newsData;
    this.id = newsData.id;
    this.title = newsData.title;
    this.content = newsData.content;
    this.author = newsData.author;
    this.data = newsData.date;
    this.labels = newsData.labels;
    this.types = newsData.types;
  },

  methods: {
    submit() {
      // 校验
      if (this.title === '' || this.content === ''|| this.author === ''|| this.date === null || this.selectedTypes.length === 0 || this.labels.length === 0) {
        alert("提交失败，请重试！");
        return;
      }

      const newNews = {
        // id: this.id,  //  后端不需要传过去的news结构中包含id
        title: this.title,
        content: this.content,
        author: this.author,
        date: this.date,
        types: this.selectedTypes,
        labels: this.labels
      };
        
      // 调用异步函数提交新闻数据并清空表单
      this.submitNews(newNews, this.id)
        .then(() => {
          this.id = '';
          this.title = '';
          this.content = '';
          this.author = '';
          this.date = null;
          this.selectedTypes = [];
          this.labels = [];
          alert("新闻修改成功！");
        })
        .catch(() => {
          alert("提交失败，请重试！！");
        //   alert(JSON.stringify(newNews));
        });
    },
    async submitNews(newNews, id) {
      try {
        await axios.put('/home/editNews?id=${id}', newNews);
      } catch (error) {
        console.error('Error submitting news:', error);
        throw error;
      }
    },

    removeLabel(index) {
      this.labels.splice(index, 1); // 删除选定索引的关键词
    },
    addNewLabel() {
      if (this.newLabel) {
        this.labels.push(this.newLabel); // 添加新关键词到数组
        this.newLabel = ''; // 清空输入框
      }
    },
  }
};
</script>
  
<style>
</style>