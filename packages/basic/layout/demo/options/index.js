import Solution from "../../src/solution";

import action from "./action";
import breadcrumb from "./breadcrumb";
import tree1 from "./tree1";
import tree2 from "./tree2";
import table from "./table";
import tool from "./tool";

const solution = Solution.use("DoubleCategoryTable");
solution.bindAction(action);
solution.extends("breadcrumb", breadcrumb);
solution.extends("tree1", tree1);
solution.extends("tree2", tree2);
solution.extends("table", table);
solution.install("tool", tool);
solution.install("tool2", tool);
console.log(solution.export());
export default solution.export();
