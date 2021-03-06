export default interface IRoute {
  path: string;
  name: string;
  component: any;
  exact: boolean;
  props?: any;
  protected?: boolean;
  adminOnly?: boolean;
}
