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
              <!--   TODO:此处存在样式bug,无法显示数值加减号的样式-->
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
          <b-autocomplete rounded v-model="searchName" :data="filteredDataArray" placeholder="e.g. jQuery" icon="magnify"
                          clearable class="inputheight" @select="option => selected = option">

            <template #empty>No results found</template>
          </b-autocomplete>
        </b-field>
        <!-- <a-button type="primary" shape="circle" icon="search" class="searchbutton" /> -->
      </div>
    </section>
<!--    下面是表格所在-->
    <section>

    </section>

  </div>

</template>


<script>
// "Authors" table component.
// import CardAuthorTable from '../components/Cards/CardAuthorTable' ;
// "Projects" table component.
// "Projects" table list of columns and their properties.
import CardProjectTable2 from '../components/Cards/CardProjectTable2' ;
// "Projects" table list of columns and their properties.

const searchData = [
  'Angular',
  'Angular 2',
  'Aurelia',
  'Backbone',
  'Ember',
  'jQuery',
  'Meteor',
  'Node.js',
  'Polymer',
  'React',
  'RxJS',
  'Vue.js'
]
// const tableData = require('@/data/sample.json')
export default {
  data() {
    return {
      searchData,
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
    }
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
</style>
