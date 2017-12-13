/**
 * Created by LiLiuzhu on 2017/9/22.
 */
import Vue from 'vue'
//这是按钮和单选
import {Button,Radio,DatePicker,Rate,Pagination} from "element-ui"
//import 'element-ui/lib/theme-default/index.css'
Vue.use(Button);//Vue.component(Button.name,Button);
Vue.use(Radio);//Vue.component(Radio.name,Radio);
Vue.use(DatePicker);//Vue.component(Radio.name,Radio);
Vue.use(Rate);//Vue.component(Radio.name,Radio);
Vue.use(Pagination);//Vue.component(Radio.name,Radio);

import {Switch,Badge,TabPane,Tabs,Table,TableColumn} from 'element-ui';
Vue.use(Switch);
Vue.use(Badge);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(Table);
Vue.use(TableColumn);