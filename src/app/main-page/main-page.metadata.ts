export enum MenuType {
  BRAND,
  LEFT,
  RIGHT
}

export interface RouteInfo {
  path: string;
  title: string;
  menuType: MenuType;
  icon: string;
}

export const MAINPAGE_SIDEROUTES: RouteInfo[] = [
  {path: 'dashboard', title: 'Dashboard', menuType: MenuType.LEFT, icon: 'icon-chart-pie'},
  {path: 'requests', title: 'Produce needed', menuType: MenuType.LEFT, icon: 'icon-leaf'},
  {path: 'new', title: 'Supply bids', menuType: MenuType.LEFT, icon: 'icon-list-alt'},
  {path: 'approved', title: 'On market', menuType: MenuType.LEFT, icon: 'icon-cart'},
  {path: 'closed', title: 'Closed Deals', menuType: MenuType.LEFT, icon: 'icon-lock'},
  {path: 'marketinfo', title: 'Market info', menuType: MenuType.LEFT, icon: 'icon-list'},
  {path: 'report', title: 'Reports', menuType: MenuType.LEFT, icon: 'icon-bell-alt'}
];

