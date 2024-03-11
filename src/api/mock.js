import Mock from 'mockjs'
import NewsAPI from './MockData/news'

Mock.mock('/home/getNews', 'get', NewsAPI.getNews)
Mock.mock('/home/getSearchData', 'get', NewsAPI.getSearchDatachData)
