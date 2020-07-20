/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 * 当需要更多组件依赖时，在该文件加入即可
 */
import Vue from 'vue'
import {
  Radio,
  Switch,
  Upload,
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Icon,
  Avatar,
  Dropdown,
  Form,
  Checkbox,
  Input,
  Tabs,
  Select,
  Modal,
  Table,
  Card,
  List,
  Alert,
  Row,
  Col,
  Tag,
  Divider,
  Progress,
  Popover,
  DatePicker,
  Popconfirm,
  Spin,
  notification, 
  Calendar,
  Steps,
  LocaleProvider,
  Cascader,
  TimePicker,
  InputNumber,
  Carousel,
  Tooltip,
  pagination,
  drawer
} from 'ant-design-vue'
Vue.use(Layout).use(Input).use(Button).use(Switch).use(Radio).use(Checkbox).use(Select)
  .use(Card).use(Form).use(Row).use(Col).use(Modal).use(Table).use(Tabs).use(Icon).use(Popover)
  .use(Dropdown).use(List).use(Avatar).use(Breadcrumb).use(Spin).use(Menu).use(Steps).use(Alert)
  .use(Tag).use(Divider).use(DatePicker).use(Upload).use(Progress).use(Popconfirm).use(notification)
  .use(Calendar).use(LocaleProvider).use(Cascader).use(TimePicker).use(InputNumber).use(Carousel).use(Tooltip).use(pagination).use(drawer)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
