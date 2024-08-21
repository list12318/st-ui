import Component from "../component";

export default function() {
  return {
    breadcrumb: Component.BreadcrumbConfig(),
    list: Component.ListConfig(),
    table: Component.TableConfig()
  };
}
