import Framework from "./basic/framework";
import Navigator from "./basic/navigator";
import Layout from "./basic/layout";
import LayoutSolution from "./basic/layout/src/solution";
import Breadcrumb from "./basic/breadcrumb";
import TableLayout from "./basic/table-layout";

import Button from "./form/button";
import Input from "./form/input";
import Autocomplete from "./form/autocomplete";
import Text from "./form/text";
import InputNumber from "./form/input-number";
import DatePicker from "./form/date-picker";
import ColorPicker from "./form/color-picker";
import Select from "./form/select";
import Cascader from "./form/cascader";
import Switch from "./form/switch";
import Slider from "./form/slider";
import RadioGroup from "./form/radio-group";
import ApiEditor from "./form/api-editor";
import DialogForm from "./form/dialog-form";
import FormEditor from "./form/form-editor";
import FormItemLib from "./form/form-item-lib";
import ParamEditor from "./form/param-editor";
import ButtonGroupEditor from "./form/button-group-editor";
import TreeEditor from "./form/tree-editor";
import SimpleForm from "./form/simple-form";
import AceEditor from "./form/ace-editor";
import AceEditorDebugger from "./form/ace-editor-debugger";
import DropDownTree from "./form/dropdown-tree";
import RichTextEditor from "./form/rich-text-editor";
import UploadFile from "./form/upload-file";
import SelectPage from "./form/select-page";
import uploadFileMultipart from "./form/upload-file-multipart";
import SearchInput from "./form/search-input";

import Tree from "./data/tree";
import Table from "./data/table";
import List from "./data/list";
import Chart from "./data/echarts";

import ComponentRoot from "./other/component-root";
import ComponentFormItemWrap from "./other/component-form-item-wrap";
import CustomPanel from "./other/custom-panel";
import Scrollbar from "./other/scrollbar";
import FlexLayout from "./other/flex-layout";

import ApiDesign from "./api/api-design";
import ApiBodys from "./api/bodys";
import ApiCustomVarible from "./api/custom-varible";
import ApiCustomBlockVarible from "./api/custom-block-varible";
import ApiCustomVaribleFlag from "./api/custom-varible-flag";
import ApiCustomVaribleNew from "./api/custom-varible-new";
import ApiEditParam from "./api/edit-param";
import ApiFindParam from "./api/find-param";
import ApiViewFindParam from "./api/view-find-param";
import ApiBeyonFindParam from "./api/beyon-find-param";
import ApiViewBeyonFindParam from "./api/view-beyon-find-param";
import ApiHeaders from "./api/headers";
import ApiPathParam from "./api/path-param";
import ApiQuery from "./api/query";
import ApiSql from "./api/sql";
import ApiUneditParam from "./api/unedit-param";

const components = {
  Framework,
  Navigator,
  Layout,
  Breadcrumb,
  TableLayout,
  Button,
  Input,
  Autocomplete,
  Text,
  InputNumber,
  DatePicker,
  ColorPicker,
  Select,
  Cascader,
  Switch,
  Slider,
  RadioGroup,
  ApiEditor,
  DialogForm,
  FormEditor,
  FormItemLib,
  ParamEditor,
  ButtonGroupEditor,
  TreeEditor,
  SimpleForm,
  AceEditor,
  AceEditorDebugger,
  DropDownTree,
  RichTextEditor,
  UploadFile,
  SelectPage,
  uploadFileMultipart,
  SearchInput,

  Tree,
  Table,
  List,
  Chart,

  ComponentRoot,
  ComponentFormItemWrap,
  Scrollbar,
  CustomPanel,
  FlexLayout,

  ApiDesign,
  ApiBodys,
  ApiCustomVarible,
  ApiCustomBlockVarible,
  ApiCustomVaribleFlag,
  ApiCustomVaribleNew,
  ApiEditParam,
  ApiFindParam,
  ApiViewFindParam,
  ApiBeyonFindParam,
  ApiViewBeyonFindParam,
  ApiHeaders,
  ApiPathParam,
  ApiQuery,
  ApiSql,
  ApiUneditParam,
};

// import "./less/index.less";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

const install = function (Vue) {
  if (install.installed) return;

  Vue.use(Element, { size: "mini" }); // 设置Element组件默认size为mini

  Object.values(components).map((component) => Vue.component(component.name, component));
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components,

  LayoutSolution,
};
