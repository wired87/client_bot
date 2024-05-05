/*declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
*/
declare module "*.css" {
  const content: string;
  export default content;
}