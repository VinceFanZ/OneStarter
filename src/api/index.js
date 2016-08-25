import request from 'reqwest'

const isMock = 1
const domain = (function () {
  if (process.env.NODE_ENV === 'development') {
    return isMock ? location.origin : '//'
  } else if (process.env.DEV_ENV === 'production') {
    return '//'
  }
  return '//'
}())
