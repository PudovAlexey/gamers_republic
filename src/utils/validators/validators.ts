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

export function validators(value, type) {
    const __data = {
        email: () => checkEmail(value),
        name: () => checkName(value, 'name'),
        surname: () => checkName(value, 'surname'),
        userName: () => checkUserName(value)
    }
    return __data[type]()
}