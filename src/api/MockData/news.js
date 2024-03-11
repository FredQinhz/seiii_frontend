export default {
    getNews: () => {
        return {
            code: 200,
            data: [
                {
                    id: 1,
                    user: {
                        first_name: 'John',
                        last_name: 'Doe',
                    },
                    date: '2019-9-8',
                    gender:'Male'
                },
                {
                    id: 2,
                    user: {
                        first_name: 'Sam',
                        last_name: 'Smith',
                    },
                    date: '2019-9-8',
                    gender: 'Male'
                },
                {
                    id: 3,
                    user: {
                        first_name: 'Charlie',
                        last_name: 'Brown',
                    },
                    date: '2019-11-8',
                    gender: 'Female'
                },
                {
                    id: 4,
                    user: {
                        first_name: 'Diana',
                        last_name: 'Ross',
                    },
                    date: '2023-3-11',
                    gender: 'Male'
                },
                {
                    id: 5,
                    user: {
                        first_name: 'Judy',
                        last_name: 'Collins',
                    },
                    date: '2011-1-1',
                    gender: 'Female'
                },
                {
                    id: 6,
                    user: {
                        first_name: 'Michael',
                        last_name: 'Jackson',
                    },
                    date: '2000-1-1',
                    gender: 'Male'
                },
            ]
        }
    },
    getSearchDatachData() {
        return {
            code: 200,
            data: [
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
        }
    }
}
