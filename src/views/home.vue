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
              <b-field grouped group-multiline label="选择匹配模式">
                <b-radio v-model="searchMode" native-value=true>
                  严格匹配
                </b-radio>
                <b-radio v-model="searchMode" native-value=false>
                  模糊匹配
                </b-radio>
              </b-field>
            </div>
            <div class="block">
              <b-field grouped group-multiline label="选择时间范围">
                <b-datetimepicker
                    v-model="startTime"
                    rounded
                    placeholder="Start Time"
                    icon="calendar-today"
                    :icon-right="startTime ? 'close-circle' : ''"
                    icon-right-clickable
                    @icon-right-click="clearStartTime"
                    horizontal-time-picker>
                </b-datetimepicker>
                <b-datetimepicker
                    v-model="endTime"
                    rounded
                    placeholder="End Time"
                    icon="calendar-today"
                    :icon-right="endTime ? 'close-circle' : ''"
                    icon-right-clickable
                    @icon-right-click="clearEndTime"
                    horizontal-time-picker>
                </b-datetimepicker>
              </b-field>
            </div>
            <b-field label="输入标签">
              <b-taginput
                  v-model="texts"
                  :maxtags="10"
                  :disabled="score">
              </b-taginput>
            </b-field>
          </div>
        </div>
      </b-collapse>
      <!-- 如下部分为搜索框 -->
      <div class="search-container">
        <b-field class="autocompleteWidth">
          <b-autocomplete rounded v-model="searchName"
                          :data="filteredDataArray"
                          placeholder="e.g. jQuery"
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

      <b-tooltip label="Edit" class="edit-button">
        <router-link to="/editNews">
          <b-button type="is-primary"
                    icon-left="minus"
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
          :data="fliteredData"
          ref="table"
          paginated
          per-page="3"
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
        <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="title" label="Title" sortable v-slot="props">
          <a @click="props.toggleDetails(props.row)">
            {{ props.row.title }}
          </a>
        </b-table-column>

        <b-table-column field="author" label="Author" sortable v-slot="props">
          {{ props.row.source }}
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
            <b-icon icon="pencil" @click="editItem(props.row.id)"></b-icon>
          </b-tooltip>
        </b-table-column>

        <b-table-column v-slot="props">
          <b-icon icon="delete" @click="deleteItem(props.row.id)"></b-icon>
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
                  <small>31m</small>
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
const searchData = []
//表格数据:包括id,用户信息,日期,性别
const tableData =[]
// const tableData = require('@/data/sample.json')
export default {
  data() {
    return {
      searchData,
      tableData,
      searchName: '',
      name:'',
      selected: null,
      searchMode:false,
      custom:'',
      sizes: '',
      texts: ['Points', 'Total reviews'],
      score: false,
      checkboxGroup: ['Flint'],
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: false,
      searchStatus: false,
      checkedRows : [],
      startTime: null,
      endTime: null,
    }
  },
  computed: {
    filteredDataArray() {
      return this.searchData.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.searchName.toLowerCase()) >= 0
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
      if(this.searchName === '') {
        return this.tableData
      }
      const searchTerm = this.searchName.toLowerCase()
      this.searchStatus = false
      return this.tableData.filter(item => {
        return item.title.toLowerCase().includes(searchTerm) ||
            item.source.toLowerCase().includes(searchTerm) ||
            item.labels.some(label => label.toLowerCase().includes(searchTerm))
      })
    }
  },
  methods: {
    editItem(id) {
      this.$buefy.toast.open(`Edit item ${id}`)
    },
    deleteItem(id) {
      this.$buefy.toast.open(`Delete item ${id}`)
    },
    async getTableData() {
      await axios.get('/home/getNews').then(res => {
        if(res.data.code === 200) {
          this.tableData = res.data.data
        }
      })
    },
    async getSearchData() {
      await axios.get('/home/getNews').then(res => {
        if(res.data.code === 200) {
          this.tableData = res.data.data
          this.tableData.forEach(item => {
            this.searchData.push(item.title, item.source, ...item.labels)
          })
        }
      })
    },
    performSearch() {
      this.searchStatus = true
      console.log(this.searchName)
    },
    deleteSelected() {
      console.log(this.checkedRows.length)
      this.checkedRows.forEach(row => {
        // 找到 row 在 tableData 中的索引
        const index = this.tableData.indexOf(row)
        // 如果找到了，就从 tableData 中删除
        if (index !== -1) {
          this.tableData.splice(index, 1)
        }
      })
      // 清空 checkedRows 数组
      this.checkedRows = []
    },
    pageChanged(pageNumber) {
      console.log(pageNumber)
      console.log(this.searchMode)
    },
    clearStartTime () {
      this.startTime = null
    },
    clearEndTime () {
      this.endTime = null
    }

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
</style>
