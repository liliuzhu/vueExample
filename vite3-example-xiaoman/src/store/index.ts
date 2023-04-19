import { toRaw } from 'vue'
import { createPinia,PiniaPluginContext } from 'pinia'

const __piniaKey__:string = 'xiaomi'
const setStorage = (key: string, value: any) =>{
    localStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key: string) =>{
    const storage = localStorage.getItem(key)
    return storage ? JSON.parse(storage as string) : {}
}
const piniaPlugin = (option:any)=>{
    return (context: PiniaPluginContext) => {
        console.log(context, 'context')
        const { store } = context
        const data = getStorage(`${option?.key ?? __piniaKey__}-${store.$id}`)
        console.log(data)
        store.$subscribe(()=>{
            setStorage(`${option?.key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state))
        })
        return {
            ... data
        }
    }
}
const store  = createPinia()
store.use(piniaPlugin({
    key:'pinia'
}))

export default store
