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
    <section class="section-center">
      <!-- <p class="content"><b>Selected:</b> {{ selected }}</p> -->
      <b-collapse :open="false" aria-id="contentIdForA11y1">
        <template #trigger="props">
          <b-button label="筛选" type="is-primary" aria-controls="contentIdForA11y1" class="button-margin" rounded
                    :aria-expanded="props.open" />
        </template>
        <!-- 下面是是筛选框的内容 -->
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
          <b-autocomplete rounded v-model="searchName" :data="filteredDataArray" placeholder="e.g. jQuery" icon="magnify"
                          clearable class="inputheight" @select="option => selected = option">

            <template #empty>No results found</template>
          </b-autocomplete>
        </b-field>
        <!-- <a-button type="primary" shape="circle" icon="search" class="searchbutton" /> -->
      </div>
    </section>
    <!-- Projects Table -->
    <a-row :gutter="24" type="flex" class="table-margin">

      <!-- Projects Table Column -->
      <a-col :span="24" class="mb-24">

        <!-- Projects Table Column -->
        <CardProjectTable2
            :data="projectTableData"
            :columns="projectTableColumns"
        ></CardProjectTable2>
        <!-- / Projects Table Column -->

      </a-col>
      <!-- / Projects Table Column -->

    </a-row>
    <!-- / Projects Table -->
  </div>

</template>


<script>
// "Authors" table component.
// import CardAuthorTable from '../components/Cards/CardAuthorTable' ;
// "Projects" table component.
// "Projects" table list of columns and their properties.
import CardProjectTable2 from '../components/Cards/CardProjectTable2' ;
// "Projects" table list of columns and their properties.
const projectTableColumns = [
  {
    title: 'COMPANIES',
    dataIndex: 'company',
    scopedSlots: { customRender: 'company' },
    width: 300,
  },
  {
    title: 'BUDGET',
    dataIndex: 'budget',
    class: 'font-semibold text-muted',
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    class: 'font-semibold text-muted text-sm',
  },
  {
    title: 'COMPLETION',
    scopedSlots: { customRender: 'completion' },
    dataIndex: 'completion',
  },
  {
    title: '',
    scopedSlots: { customRender: 'editBtn' },
    width: 50,
  },
];
// "Projects" table list of rows and their properties.
const projectTableData = [
  {
    key: '1',
    company: {
      name: 'Spotify Version',
      logo: 'images/logos/logo-spotify.svg',
    },
    status: "working",
    budget: '$14,000',
    completion: 60,
  },
  {
    key: '2',
    company: {
      name: 'Progress Track',
      logo: 'images/logos/logo-atlassian.svg',
    },
    status: "working",
    budget: '$3,000',
    completion: 10,
  },
  {
    key: '3',
    company: {
      name: 'Jira Platform Errors',
      logo: 'images/logos/logo-slack.svg',
    },
    status: "done",
    budget: 'Not Set',
    completion: {
      status: 'success',
      value: 100,
    },
  },
  {
    key: '4',
    company: {
      name: 'Launch new Mobile App',
      logo: 'images/logos/logo-spotify.svg',
    },
    status: "canceled",
    budget: '$20,600',
    completion: {
      status: 'exception',
      value: 50,
    },
  },
  {
    key: '5',
    company: {
      name: 'Web Dev',
      logo: 'images/logos/logo-webdev.svg',
    },
    status: "working",
    budget: '$4,000',
    completion: 80,
  },
  {
    key: '6',
    company: {
      name: 'Redesign Online Store',
      logo: 'images/logos/logo-invision.svg',
    },
    status: "canceled",
    budget: '$2,000',
    completion: {
      status: 'exception',
      value: 0,
    },
  },
];
export default {
  components: {
    CardProjectTable2,
  },
  data() {
    return {
      searchData: [
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
      ],
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
      projectTableColumns,
      projectTableData,
      data: [
        { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
        { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
        { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
        { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
        { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'First Name',
        },
        {
          field: 'last_name',
          label: 'Last Name',
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'gender',
          label: 'Gender',
        }
      ],
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
