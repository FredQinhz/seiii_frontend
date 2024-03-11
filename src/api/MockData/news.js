export default {
    getNews: () => {
        return {
            code: 200,
            data: [
                {
                    id: 1,
                    title: 'Ant Design Pro',
                    content: 'An out-of-box UI solution for enterprise applications as a React boilerplate.',
                    author: 'Ant Design',
                    date: '2021-01-01',
                    labels: ['React', 'Ant Design','Boilerplate'],
                    cover : 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                },
                {
                    id: 2,
                    title: 'Vue.js 3.0 Release',
                    content: 'Vue.js 3.0, the latest version of the popular JavaScript framework, has been officially released, bringing numerous improvements and features.',
                    author: 'Vue.js Team',
                    date: '2021-02-15',
                    labels: ['Vue.js', 'JavaScript', 'Frontend'],
                    cover: 'https://vuejs.org/images/logo.png'
                },

                {
                    id: 3,
                    title: 'Python 3.9 Features',
                    content: 'Python 3.9 introduces several new features and optimizations, including improved performance, new syntax features, and enhancements to existing modules.',
                    author: 'Python Software Foundation',
                    date: '2021-03-10',
                    labels: ['Python', 'Programming', 'Release'],
                    cover: 'https://www.python.org/static/community_logos/python-logo.png'
                },

                {
                    id: 4,
                    title: 'Machine Learning Advances',
                    content: 'Recent advancements in machine learning technologies have led to breakthroughs in various domains, including natural language processing, computer vision, and reinforcement learning.',
                    author: 'AI Research Group',
                    date: '2021-04-20',
                    labels: ['Machine Learning', 'Artificial Intelligence', 'Technology'],
                    cover: 'https://i.imgur.com/d3cRfWV.jpg'
                },

                {
                    id: 5,
                    title: 'WebAssembly Becomes Mainstream',
                    content: 'WebAssembly (Wasm) gains widespread adoption, enabling high-performance execution of code in web browsers and opening up new possibilities for web development.',
                    author: 'WebAssembly Community',
                    date: '2021-05-15',
                    labels: ['WebAssembly', 'Web Development', 'Technology'],
                    cover: 'https://webassembly.org/css/webassembly.svg'
                }







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
