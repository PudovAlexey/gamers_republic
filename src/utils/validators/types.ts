enum EValidators {
    Email = 'email',
    Name = 'name',
    SurName = 'surname',
    UserName = 'username',
    Password = 'password'
}

type TCheck = {
    value: string,
    type: EValidators
}

export type {
    TCheck
}

export {
    EValidators
}