/**
 * Created by LiLiuzhu on 2017/5/23.
 */
new Vue({
    el:".container",
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shoppingMethod:1,
        delFlag:false,
        editFlag:false
    },
    computed:{
        filterAddress:function(){
            return this.addressList.slice(0,this.limitNum)
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    methods:{
        getAddressList:function(){
            this.$http.get("data/address.json").then(function(response){
                var res=response.data;
                if(res.status=="0"){
                    return this.addressList = res.result;
                }
            });
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            });
        },
        delAddress:function(){
            this.addressList.splice(this.currentIndex,1);
            this.delFlag=false;
        },
        saveAddress:function(){
        }
    }
});