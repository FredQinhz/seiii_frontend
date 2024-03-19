/**
* Component for displaying a selection with filtering options.
*
* @component TestPage
* @description This component renders a selection with filtering options. It includes a collapse section with a button trigger and a content area for filtering options such as checkboxes, radio buttons, and input fields. It also includes a search container with an autocomplete input field for filtering the selection options.
*
* @props {Array} data - The array of options for the selection.
* @props {String} name - The value of the selected option.
* @props {String} selected - The currently selected option.
*
* @computed filteredDataArray - A computed property that filters the data array based on the entered search query.
*
* @example
* <TestPage :data="['Angular', 'Angular 2', 'Aurelia', 'Backbone', 'Ember', 'jQuery', 'Meteor', 'Node.js', 'Polymer', 'React', 'RxJS', 'Vue.js']" :name="name" :selected="selected" />
*/
<template>

  <div>
    <!--    以下section条为搜索栏,包括搜索框,筛选按钮与筛选条件等-->
    <section class="section-center">
      <!-- <p class="content"><b>Selected:</b> {{ selected }}</p> -->
      <b-collapse :open="false" aria-id="contentIdForA11y1">
        <template #trigger="props">
          <b-button label="筛选" type="is-primary" aria-controls="contentIdForA11y1" class="button-margin" rounded
                    :aria-expanded="props.open" />
        </template>
        <!-- 下面是是筛选框的内容 -->
        <!--   TODO:搜索框内部或者右边加个搜索按钮     -->
        <div class="notification collapse-content">
          <div class="content">
            <h3>
              选择或输入你筛选的标准
            </h3>
            <div class="block">
              <div>
                <b-field label="搜索范围">
                  <b-checkbox-button v-model="searchAtt.search.fields"
                    native-value="title" required>
                    <span>标题</span>
                  </b-checkbox-button>
                  <b-checkbox-button v-model="searchAtt.search.fields"
                    native-value="content" required>
                    <span>内容</span>
                  </b-checkbox-button>
                   
                </b-field>
                <b-field grouped group-multiline label="匹配模式">
                  <b-radio v-model.number="searchAtt.search.mode" native-value="0">
                    模糊匹配
                  </b-radio>  
                  <b-radio v-model.number="searchAtt.search.mode" native-value="1">
                    严格匹配
                  </b-radio>
                </b-field>
              </div>
              <br>
              <b-field label="作者名">
                <b-input v-model="searchAtt.author"></b-input>
              </b-field>
            </div>
            <div class="block">
              <b-field grouped group-multiline label="时间范围">
                <b-datetimepicker
                    v-model="searchAtt.date.gte"
                    rounded
                    placeholder="Start Time"
                    icon="calendar-today"
                    :icon-right="searchAtt.date.gte ? 'close-circle' : ''"
                    icon-right-clickable
                    @icon-right-click="clearStartTime"
                    horizontal-time-picker
                    @input="validateDates">
                </b-datetimepicker>
                <b-datetimepicker
                    v-model="searchAtt.date.lte"
                    rounded
                    placeholder="End Time"
                    icon="calendar-today"
                    :icon-right="searchAtt.date.lte ? 'close-circle' : ''"
                    icon-right-clickable
                    @icon-right-click="clearEndTime"
                    horizontal-time-picker
                    @input="validateDates">
                </b-datetimepicker>
              </b-field>
              <p :style="{ color:  'red'}" v-if="isInvalidDateRange">结束时间必须大于开始时间</p>
            </div>
            <b-field label="标签">
              <b-taginput
                  v-model="labelTexts"
                  :maxtags="10"
                  :disabled="score">
              </b-taginput>
            </b-field>
            <b-field>
              <b-button type="is-primary" outlined @click="performSearch">
                筛选
              </b-button>
            </b-field>
          </div>
        </div>
      </b-collapse>
      <!-- 如下部分为搜索框 -->
      <div class="search-container">
        <b-field class="autocompleteWidth">
          <b-autocomplete rounded v-model="searchAtt.search.content"
                          :data="filteredDataArray"
                          placeholder="请输入搜索内容"
                          icon="magnify"
                          clearable class="inputheight"
                          @select="option => selected = option"
                          @keydown.enter="performSearch"
                          ref="autocomplete"
          >

            <template #empty>No results found</template>
          </b-autocomplete>
        </b-field>
        <a-button type="is-ghost" shape="circle" icon="search" class="searchbutton" @click="performSearch"/>
      </div>
    </section>

    <!--    下面是表格所在-->
    <!--    默认打开:@details-open="(row) => $buefy.toast.open(`Expanded ${row.user.first_name}`)"-->
    <b-field class="table-buttons">
      <b-tooltip label="Add" class="add-button">
        <router-link to="/addNews">
          <b-button type="is-primary"
                    icon-left="plus"
          ></b-button>
        </router-link>

      </b-tooltip>

      <b-tooltip label="Delete selected" class="delete-selected" type="is-danger">
        <b-button type="is-danger" @click="deleteSelected"
                  icon-left="delete"
                  v-if="checkedRows.length > 0"
        ></b-button>
      </b-tooltip>
    </b-field>
    <section class="table-width">
      <b-table
          :data="tableData"
          ref="table"
          paginated
          per-page="10"
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="id"
          :detail-transition="transitionName"
          :show-detail-icon="showDetailIcon"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          checkable
          :checkbox-position="'right'"
          :checked-rows.sync="checkedRows"
          checkbox-type="is-danger"
          hoverable
          @page-change="pageChanged"
      >

        <!--  下面是图表项      -->
        <b-table-column field="id" label="ID" width="40" numeric sortable v-slot="props">
          {{ props.row.id }}
          
        </b-table-column>

        <!-- <b-table-column field="title" label="Title" sortable v-slot="props">
          <a @click="props.toggleDetails(props.row)">
            {{ props.row.title }}
          </a>
        </b-table-column> -->
        <b-table-column field="title" label="Title" sortable v-slot="props">
          <a @click="newsItem(props.row.id)">
            {{ props.row.title }}
          </a>
        </b-table-column>

        <b-table-column field="author" label="Author" sortable v-slot="props">
          {{ props.row.author }}
        </b-table-column>

        <b-table-column field="date" label="Date" sortable centered v-slot="props">
                <span class="tag is-success">
                    {{ new Date(props.row.date).toLocaleDateString() }}
                </span>
        </b-table-column>

        <!--        <b-table-column label="Labels" v-slot="props">-->
        <!--          <b-tag-->
        <!--              v-for="(label, index) in props.row.labels"-->
        <!--              :key="index"-->
        <!--              v-if="index < 2"-->
        <!--              type="is-info"-->
        <!--              class="tag-spacing"-->
        <!--          >-->
        <!--            {{ label }}-->
        <!--          </b-tag>-->
        <!--        </b-table-column>-->

        <b-table-column v-slot="props">
          <b-tooltip label="Edit">
            <b-button class="row-button" size="is-middle" icon-right="pencil" @click="editItem(props.row.id)"></b-button>
          </b-tooltip>
        </b-table-column>

        <b-table-column v-slot="props">
          <b-tooltip label="Delete">
            <b-button class="row-button" size="is-middle" icon-right="delete" @click="deleteItem(props.row.id)"></b-button>
          </b-tooltip>
        </b-table-column>

        <template #detail="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="props.row.cover">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ props.row.title }}</strong> |
                  <i>{{ props.row.author }}</i> |
                  <small>@{{ props.row.labels.join(',') }}</small>
                  <br>
                  {{ props.row.content }}
                </p>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </section>

  </div>

</template>


<script>

import axios from "axios";
import Vue from 'vue'
import {getArticles,deleteArticle,deleteArticles,getKeywords,searchArticles} from "@/api/articles";

const searchData = [];
const tableData =[];

export default {
  data() {
    return {
      searchData,
      tableData,
      // searchName: '',
      name:'',
      selected: null,
      // searchMode:false,
      // checkboxGroup: ['Flint'],
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: false,
      searchStatus: false,
      checkedRows : [],
      // startTime: null,
      // endTime: null,
      isInvalidDateRange: false,
      searchAtt :{
        "search":{
          "content": "",
          "mode": 0,
          "fields":["title","content"]
        },
        "author": "",
        "date": {
            "gte": null,
            "lte": null,
        },
      },
      labelTexts: ['标签1', '标签2'],
      score: true, //控制labelTexts可用与否，目前不可用
    }
  },
  computed: {
    filteredDataArray() {
      return this.searchData.filter((option) => {
        return option
            .toString()
            .toLowerCase()
            .indexOf(this.searchAtt.search.content.toLowerCase()) >= 0
      })
    },
    transitionName() {
      if (this.useTransition) {
        return 'fade'
      }
    },
    fliteredData() {
      if(!this.searchStatus) {
        return this.tableData
      }
      if(this.searchAtt.search.content === '') {
        return this.tableData
      }
      const searchTerm = this.searchAtt.search.content.toLowerCase()
      this.searchStatus = false
      return this.tableData.filter(item => {
        return item.title.toLowerCase().includes(searchTerm) ||
            item.source.toLowerCase().includes(searchTerm) ||
            item.labels.some(label => label.toLowerCase().includes(searchTerm))
      })
    },
    validateDates() {
      if (this.searchAtt.date.gte && this.searchAtt.date.lte) {
        this.isInvalidDateRange = this.searchAtt.date.gte >= this.searchAtt.date.lte;
      } else {
        this.isInvalidDateRange = false;
      }
    },
  },
  methods: {
    editItem(id) {
      // this.$buefy.toast.open(`Edit item ${id}`)
      this.$router.push({ path: `/addNews/${id}` });
    },
    newsItem(id) {
      // this.$buefy.toast.open(`Edit item ${id}`)
      this.$router.push({ path: `/news/${id}` });
    },
    async deleteItem(id) {
      // console.log(id)
      await deleteArticle(id).then(res => {
        this.getTableData()
      })
    },
    async getTableData(page=0, size=10) {
      // 调用articles.js
      await getArticles(page,size).then(res => {
        // console.log(res)
        this.tableData = res.data
      })
    },
    async getSearchData() {
      await getKeywords().then(res => {
        this.searchData = res.data
      })
    },
    dateWarning() {
      this.$buefy.snackbar.open({
        message: '日期选择有误，请重试！',
        type: 'is-warning',
        position: 'is-top',
        actionText: '重试',
        indefinite: true,
      })
    },
    test(){
      if(this.isInvalidDateRange === true){
        this.dateWarning()
        return
      }      
      alert(JSON.stringify(this.searchAtt));

    },
    performSearch(page = 0, size = 10, search = this.searchAtt) {
      // alert(JSON.stringify(this.searchAtt));

      if(this.isInvalidDateRange === true){
        this.dateWarning()
        return
      }    

      this.searchStatus = true
      console.log(JSON.stringify(this.searchAtta))

      searchArticles(page, size, search).then(res => {
        // console.log(res)
        this.tableData = res.data
      })
   
    },
    deleteSelected() {
      // 使用id删除
      var ids = {
        ids:this.checkedRows.map(item => item.id)
      }
      deleteArticles(ids).then(res => {
        this.getTableData()
      })
    },
    pageChanged(pageNumber) {
      console.log(pageNumber)
      console.log(this.searchAtt.search.mode)
      this.getTableData(pageNumber-1)
    },
    clearStartTime () {
      this.searchAtt.date.gte = null
    },
    clearEndTime () {
      this.searchAtt.date.lte = null
    },
    // //实现筛选功能
    // filterData() {
    //   var query = {
    //     "range": {
    //       "date": {
    //         "gt": "2022-01-01",
    //         "lt": "2024-01-01"
    //       }
    //     },
    //     "contains": {
    //       "labels":labelTexts
    //     },


    //   }
    // }

  },
  created() {
    this.getTableData()
    this.getSearchData()
  },
  mounted() {
    this.$refs.autocomplete.focus()
  }
}
</script>

<style scoped lang="scss">
.section-center {
  display: flex;
  justify-content: center;
  width: 100%;

}

.autocompleteWidth {
  width: 100%;
}

.inputheight {
  position: relative;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
}

.searchbutton {
  top: -5px;
  border: 0px;
}

.collapse-content {
  position: absolute;
  z-index: 1;
  /* 调整这个值来改变元素的堆叠顺序 */
}

.button-margin {
  margin-right: 20px;
  /* 调整这个值来改变按钮右边的外边距 */
}
.table-margin {
  margin-top: 20px;
  /* 调整这个值来改变表格上边的外边距 */
}
.table-width {
  width: 70%;
  /* 调整这个值来改变表格的宽度 */
  margin: auto;
  margin-top: 20px;
}
.tag-spacing{
  margin-right: 5px;
  /* 调整这个值来改变标签之间的间距 */
}
.delete-selected{
  //margin-left: 94%;
  margin-left: 63%;
  /* 调整这个值来改变删除选中按钮的左边外边距 */
  margin-bottom: 10px;
}
.add-button{
  margin-left: 5%;
  /* 调整这个值来改变添加按钮的左边外边距 */
  margin-bottom: 10px;
}
.icon{
  visibility: visible;
}
.table-buttons{
  width: 100%;
  margin-left: 10%;
  margin-top: 20px;
}
.row-button{
  border: 0px;
  margin-top: -2px;
}
</style>
