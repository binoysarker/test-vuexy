/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
// import dashboard from './dashboard'
// import appsAndPages from './apps-and-pages'
// import others from './others'
// import chartsAndMaps from './charts-and-maps'
// import uiElements from './ui-elements'
// import formAndTable from './forms-and-table'

// Array of sections
// export default [...dashboard, ...appsAndPages, ...uiElements, ...formAndTable, ...chartsAndMaps, ...others]

export default [
  {
    title: 'Spaces',
    icon: 'BoxIcon',
    children: [
      {
        title: 'Buildings',
        route: 'all-buildings',
      },
      {
        title: 'Units',
        route: 'all-units',
      },
    ],
  },
  {
    title: 'Reservations',
    route: 'all-buildings',
    icon: 'ClipboardIcon',
    children: [
      {
        title: 'New Reservation',
        route: 'reservations-new',
      },
      {
        title: 'Check-in',
        route: 'check-in',
      },
    ],
  },
  {
    title: 'Add-ons',
    icon: 'FilePlusIcon',
  },
  {
    title: 'CRM',
    // route: 'apps-email',
    icon: 'UsersIcon',
    // disabled: true,

  },
  {
    title: 'Billings',
    // route: 'apps-email',
    icon: 'DollarSignIcon',
    // disabled: true,

  },
  {
    title: 'Contracts',
    // route: 'apps-email',
    icon: 'PenToolIcon',
    // disabled: true,

  },
  {
    title: 'Reporting',
    // route: 'apps-email',
    icon: 'FlagIcon',
    // disabled: true,

  },
]
