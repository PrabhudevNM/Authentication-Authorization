import User from "../model/user-model.js"

export const userRegisterSchema={               //from model to validation
    email:{
        exists:{
            errorMessage:"Email feild is required"
        },
        notEmpty:{
            errorMessage:"Email cannot be empty"
        },
        isEmail:{
            errorMessage:"Email should be valid format"
        },
        trim:true,
        normalizeEmail:true,
        custom:{                                                  //this is for only uniq email
            options: async function(value){                                 
                try{
                    const user=await User.findOne({email:value})
                    if(user){
                        throw new Error('Email is already taken')
                    }
                }catch(err){
                    throw new Error(err.message)
                }
                return true
            }
        }
    },

    password:{
        exists:{
            errorMessage:"password field is required"
        },
        notEmpty:{
            errorMessage:"Password cannot be Empty"
        },
        isStrongPassword:{
            options:{
                minLength:8,
                maxLength:128,
                minUppercase:1,
                minLowercase:1,
                minNumber:1,
                minSymbole:1,
            },
            errorMessage:"Passowrd contain eight character, one upperCase, one lowerCase, one Numbers, one Symbol and maximum 128 characters",
        },
        trim:true
    }
}

export const userLoginSchema={
    email:{
        exists:{
            errorMessage:"Email feild is required"
        },
        notEmpty:{
            errorMessage:"Email cannot be empty"
        },
        isEmail:{
            errorMessage:"Email should be valid format"
        },
        trim:true,
        normalizeEmail:true,
    },

    password:{
        exists:{
            errorMessage:"password field is required"
        },
        notEmpty:{
            errorMessage:"Password cannot be Empty"
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minUppercase:1,
                minLowercase:1,
                minNumber:1,
                minSymbole:1,
            },
            errorMessage:"Passowrd contain eight character, one upperCase, one lowerCase, one Numbers, one Symbol",
        },
        trim:true
    }

}