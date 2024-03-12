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
 <script setup>

 import {right} from "core-js/internals/array-reduce";
 </script>
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
              Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus.
              <br />
              Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            </p>
            <b-field grouped group-multiline>
              <b-field label="选择数值">
                <b-numberinput v-model="maxs"></b-numberinput>
              </b-field>
              <b-field label="输入内容">
                <b-input v-model="packs" placeholder="e.g. mdi, fa or other"></b-input>
              </b-field>
              <b-field label="输入内容">
                <b-input v-model="icons"></b-input>
              </b-field>
            </b-field>
            <div class="block">
              <b-field grouped group-multiline>
                <b-field label="Custom Text">
                  <b-input v-model="custom" placeholder="e.g. Points or Total reviews">
                  </b-input>
                </b-field>
                <b-field label="下拉选择">
                  <b-select v-model="sizes">
                    <option value="">default</option>
                    <option value="is-small">is-small</option>
                    <option value="is-medium">is-medium</option>
                    <option value="is-large">is-large</option>
                  </b-select>
                </b-field>
              </b-field>
            </div>
            <b-field label="输入标签">
              <b-taginput
                  v-model="texts"
                  :maxtags="maxs"
                  :disabled="score">
              </b-taginput>
            </b-field>
            <div class="block">
              <b-field label="多选框">
                <b-checkbox v-model="checkboxGroup"
                            native-value="Silver">
                  Silver
                </b-checkbox>
                <b-checkbox v-model="checkboxGroup"
                            native-value="Flint">
                  Flint
                </b-checkbox>
                <b-checkbox v-model="checkboxGroup"
                            native-value="Vane">
                  Vane
                </b-checkbox>
                <b-checkbox v-model="checkboxGroup"
                            native-value="Billy" disabled>
                  Billy
                </b-checkbox>
              </b-field>
            </div>
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

    <section class="table-width">
      <b-field>
        <b-button type="is-danger" @click="deleteSelected"
                  label="删除选中" icon-left="close"
                  class="delete-selected"
        ></b-button>
      </b-field>
      <b-table
          :data="fliteredData"
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
          {{ props.row.author }}
        </b-table-column>

        <b-table-column field="date" label="Date" sortable centered v-slot="props">
                <span class="tag is-success">
                    {{ new Date(props.row.date).toLocaleDateString() }}
                </span>
        </b-table-column>

        <b-table-column label="Labels" v-slot="props">
          <b-tag
              v-for="(label, index) in props.row.labels"
              :key="index"
              v-if="index < 2"
              type="is-info"
              class="tag-spacing"
          >
            {{ label }}
          </b-tag>
        </b-table-column>

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
      maxs: 5,
      packs: 'mdi',
      icons: 'star',
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
            item.author.toLowerCase().includes(searchTerm) ||
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
            this.searchData.push(item.title, item.author, ...item.labels)
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
  margin-top: 5%;
}
.tag-spacing{
  margin-right: 5px;
  /* 调整这个值来改变标签之间的间距 */
}
.delete-selected{
  margin-left: 20px;
  /* 调整这个值来改变删除选中按钮的左边外边距 */
  margin-bottom: 10px;
}
.icon{
  visibility: visible;
}
</style>
