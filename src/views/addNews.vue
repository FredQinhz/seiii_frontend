<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">{{isEdit ? 'Edit News' : 'Add News'}}</h1>
        <b-field label="Title">
          <b-input v-model="title" type="text" placeholder="Enter title" required></b-input>
        </b-field>

        <b-field label="author">
          <b-input v-model="author" type="text" placeholder="Enter author" required></b-input>
        </b-field>

      <b-field label="Date">
          <b-datepicker v-model="date" placeholder="Select date" required></b-datepicker>
        </b-field>

        <b-field label="Content">
          <b-input v-model="content" type="textarea" placeholder="Enter content" rows="10" required></b-input>
        </b-field>


        <!--          <b-field label="Labels">-->
        <!--            <b-checkbox-button v-model="selectedLabels"-->
        <!--                native-value="科技" required>-->
        <!--                <span>科技</span>-->
        <!--            </b-checkbox-button>-->

        <!--            <b-checkbox-button v-model="selectedLabels"-->
        <!--                native-value="体育" required>-->
        <!--                <span>体育</span>-->
        <!--            </b-checkbox-button>-->

        <!--            <b-checkbox-button v-model="selectedLabels"-->
        <!--                native-value="娱乐" required>-->
        <!--                <span>娱乐</span>-->
        <!--            </b-checkbox-button>-->

        <!--            <b-checkbox-button v-model="selectedLabels"-->
        <!--                native-value="财经" required>-->
        <!--                <span>财经</span>-->
        <!--            </b-checkbox-button>-->

        <!--            <b-checkbox-button v-model="selectedLabels"-->
        <!--                native-value="其他" required>-->
        <!--                <span>其他</span>-->
        <!--            </b-checkbox-button>-->
        <!--          </b-field>-->
        <!--          <p class="content">-->
        <!--            <b>selectedLabels:</b>-->
        <!--            {{ selectedLabels }}-->
        <!--          </p>-->

        <b-button @click="addNews" type="is-primary">{{isEdit ? 'Save' : 'Add News'}} </b-button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import {addArticle,getArticle,updateArticle} from "@/api/articles";

export default {
  data() {
    return {
      id: '',
      title: '',
      content: '',
      author: '',
      date: null,
      // labels: ['科技', '体育', '娱乐', '财经', '其他'],
      // selectedLabels: [],
      isEdit: false
    };
  },
  methods: {
    addNews() {
      // 校验
      if (this.title === '' || this.content === ''|| this.author === ''|| this.date === null) {
        alert("提交失败，请重试！");
        return;
      }

      const newNews = {
        title: this.title,
        content: this.content,
        author: this.author,
        date: this.date,
        // labels: this.selectedLabels
      };

      // 调用异步函数提交新闻数据并清空表单
      if (this.isEdit) {
        // 如果是编辑状态，调用更新新闻的函数
        this.updateNews(this.id,newNews)
            .then(() => {
              this.$buefy.snackbar.open({
                duration: 3000,
                message: '编辑成功!',
                type: 'is-primary',
                position: 'is-top',
                actionText: '关闭',
                indefinite: true,
              })
              //跳转到新闻列表页面
              this.$router.push({ path: "/home" });
            })
            .catch(() => {
              alert("提交失败，请重试！!");
            });
      } else{
        this.submitNews(newNews)
            .then(() => {
              this.title = '';
              this.content = '';
              this.author = '';
              this.date = null;
              // this.selectedLabels = [];
              alert("新闻添加成功！");
              //跳转到新闻列表页面
              this.$router.push({ path: "/home" });
            })
            .catch(() => {
              alert("提交失败，请重试！!");
            });
      }
    },
    async submitNews(newNews) {
      // 将日期转换为年月日的形式
      newNews.date = new Date(newNews.date).toISOString().split('T')[0];
      try {
        await addArticle(newNews);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async updateNews(id,newNews) {
      // 将日期转换为年月日的形式
      newNews.date = new Date(newNews.date).toISOString().split('T')[0];
      try {
        await updateArticle(id,newNews);
      } catch (error) {
        console.error(error);
        throw error;
      }
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
          // this.selectedLabels = res.data.labels;
        });
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    // id不为空则调用fetchItems函数获取新闻数据
    if (id) {
      this.isEdit = true;
      this.fetchItems(id);
    }
  }
};
</script>

<style>
</style>
