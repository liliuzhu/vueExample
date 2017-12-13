<template>
    <div id="list">
        <ul class="list_user" ref="listUser" @touchmove="bMove=true">
            <li v-for="item in userData">
                <p>{{item.index}}</p>
                <ul>
                    <li @touchend="showTel(user)" v-for="user in item.users">{{user.name}}
                        <span>{{user.tel}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="list_index" ref="listIndex">
            <li @touchstart="setScroll" v-for="item in userIndex">{{item}}</li>
        </ul>
    </div>
</template>
<script>
    import myAlert from "./Alert.js"
    export default{
        name:"my-list",
        data:function(){
            return {
                bMove:false
            }
        },
        props:{
            userData:{
                type:Array,
                default:[]
            }
        },
        computed:{
            userIndex:function(){
                return this.filterIndex(this.userData);
            }
        },
        methods:{
            filterIndex:function(data){
                var result=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].index){
                        result.push(data[i].index);
                    }
                }
                return result;
            },
            setListIndexPos:function(){
                var listIndex=this.$refs.listIndex;
                var iH=listIndex.offsetHeight;
                listIndex.style.marginTop=-iH/2+"px";
            },
            setScroll:function(ev){
                var aP=this.$refs.listUser.getElementsByTagName("p");
                for(var i=0;i<aP.length;i++){
                    if(aP[i].innerHTML==ev.target.innerHTML){
                        document.body.scrollTop=aP[i].offsetTop;
                        break;
                    }
                }
            },
            showTel:function(user){
                if(!this.bMove){
                    myAlert({
                        title:"呼叫",
                        body:user.name+":"+user.tel,
                        confirm:function(){
                            console.log("确定");
                        },
                        cancel:function(){
                            console.log("取消");
                            document.body.removeChild(document.getElementById("alert"));
                        }

                    });
                }else{
                    this.bMove=false;
                }
            }
        },
        mounted:function(){
            this.setListIndexPos();
        }
    }
</script>
<style>
    #list{
        position: relative;
        top:40px;
        overflow: hidden;
    }
    #list .list_user p{background-color: #ccc;padding-left: 10px;}
    #list .list_user ul li{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        padding-left: 10px;
    }
    #list .list_user ul li span{
        float: right;
        margin-right: 15%;
    }
    #list .list_index{
        position: fixed;
        right: 10px;
        top:50%;
        font-size: 20px;
    }
    #list .list_index li{
        margin: 5px 0;
        padding: 0 5px;
    }
</style>