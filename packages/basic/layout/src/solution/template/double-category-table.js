import Component from "../component";

export default function() {
  return {
    breadcrumb: Component.BreadcrumbConfig(),
    list1: Component.ListConfig(),
    list2: Component.ListConfig(),
    table: Component.TableConfig()
  };
}
