function checkEmail(value) {
    const validate = /[^@]+@[a-z]+\.[a-z]+/.test(value)
    return validate || {
        message: 'incorrect email address'
    }
}

function checkName(value, type) {
  const validate = /(^[A-Z][a-z]{1,})|(^[А-Я][а-я]{1,})/.test(value)

  return validate || {
    message: `Incorrect ${type}`
  }
}

function checkUserName(value) {
   const validate = /(^[A-Z0-9][a-z0-9]{3,})|(^[А-Я0-9][а-я0-9]{3,})/.test(value)

   return validate || {
    message: 'Incorrect UserName'
   }
}

function checkPassword(value) {
  const validate = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(value)

  return validate || {
    message: 'password must has at least 6 of more symbols' + 
              '1 UpperCase latter, 1 number and 1 speciphic symbol' 
  }
}

function validators(value, type) {
    const __data = {
        email: () => checkEmail(value),
        name: () => checkName(value, 'name'),
        surname: () => checkName(value, 'surname'),
        userName: () => checkUserName(value),
        password: () => checkPassword(value)
    }
    return __data[type]()
}

function checkAll(check) {
  return check.reduce((check, {value, type}) => {
    const checkItem = validators(value, type)
    if (checkItem?.message) {
      if (typeof check === 'boolean') check = []
      check.push(checkItem)
    }
    return check
  }, true)
}

export {
  validators,
  checkAll

}