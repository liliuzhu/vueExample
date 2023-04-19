import { defineStore } from 'pinia'
import { Names } from './store-name'
type User ={
    name: string,
    age:number,
    // [propName:string]: any
    // [propName:string]: any
}
let result:User = {
    name: '飞机',
    age: 999
}

const login = (): Promise<User> => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(result)
        }, 2000)
    })
}
export const useTestStore = defineStore(Names.TEST, {
    state:()=>{
        return {
            current: 100,
            name: '小满3',
            user: <User>{}
        }
    },
    // computed 修饰一些值
    getters:{
        newName():string {
            return  `$-${this.name}`
        },
        getUserAge():number{
            return this.user.age
        }
    },
    // methods 可以同步和异步
    actions:{
        setCurrent(num:number){
            this.current = num
        },
        async setUser(){
            const result = await login()
            this.user = result
            this.setName('打飞机')
        },
        setName (name:string) {
            this.name = name
        }
    }
})
