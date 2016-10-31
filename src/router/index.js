import home from '../home'
import board from '../components/board'

export default [
  {
    path: '/',
    component: home
  },
  {
    path: '/b',
    name: 'board',
    component: board
  }
]
