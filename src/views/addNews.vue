<template>
    <div>
      <section class="section">
        <div class="container">
          <h1 class="title">Add News</h1>
          <b-field label="Title">
            <b-input v-model="title" type="text" placeholder="Enter title" required></b-input>
          </b-field>
          
          <b-field label="Content">
            <b-input v-model="content" type="textarea" placeholder="Enter content" required></b-input>
          </b-field>
          
          <b-field label="Source">
            <b-input v-model="source" type="text" placeholder="Enter source" required></b-input>
          </b-field>
          
          <b-field label="Date">
            <b-datepicker v-model="date" placeholder="Select date" required></b-datepicker>
          </b-field>
          
          <b-field label="Labels">
            <b-checkbox-button v-model="selectedLabels"
                native-value="科技" required>
                <span>科技</span>
            </b-checkbox-button>
  
            <b-checkbox-button v-model="selectedLabels"
                native-value="体育" required>
                <span>体育</span>
            </b-checkbox-button>
    
            <b-checkbox-button v-model="selectedLabels"
                native-value="娱乐" required>
                <span>娱乐</span>
            </b-checkbox-button>
    
            <b-checkbox-button v-model="selectedLabels"
                native-value="财经" required>
                <span>财经</span>
            </b-checkbox-button>
    
            <b-checkbox-button v-model="selectedLabels"
                native-value="其他" required>
                <span>其他</span>
            </b-checkbox-button>
          </b-field>
          <p class="content">
            <b>selectedLabels:</b>
            {{ selectedLabels }}
          </p>
          
        <b-button @click="addNews" type="is-primary">Add News</b-button>
      </div>
    </section>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      title: '',
      content: '',
      source: '',
      date: null,
      labels: ['科技', '体育', '娱乐', '财经', '其他'],
      selectedLabels: [],
    };
  },
  methods: {
    addNews() {
      // 校验
      if (this.title === '' || this.content === ''|| this.source === ''|| this.date === null || this.selectedLabels.length === 0) {
        alert("提交失败，请重试！");
        return;
      }

      const newNews = {
        title: this.title,
        content: this.content,
        source: this.source,
        date: this.date,
        labels: this.selectedLabels
      };
        
      // 调用异步函数提交新闻数据并清空表单
      this.submitNews(newNews)
        .then(() => {
          this.title = '';
          this.content = '';
          this.source = '';
          this.date = null;
          this.selectedLabels = [];
          alert("新闻添加成功！");
        })
        .catch(() => {
          alert("提交失败，请重试！!");
        });
    },
    async submitNews(newNews) {
      try {
        await axios.post('/home/addNews', newNews);
      } catch (error) {
        console.error('Error submitting news:', error);
        throw error;
      }
    }
  }
};
</script>
  
<style>
</style>