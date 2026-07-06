import { uniqueId } from 'lodash'

export interface ChildItem {
  id?: number | string
  name?: string
  icon?: string
  children?: ChildItem[]
  item?: unknown
  url?: string
  color?: string
  disabled?: boolean
  subtitle?: string
  badge?: boolean
  badgeType?: string
  isPro?: boolean
}

export interface MenuItem {
  heading?: string
  name?: string
  icon?: string
  id?: number | string
  to?: string
  items?: MenuItem[]
  children?: ChildItem[]
  url?: string
  disabled?: boolean
  subtitle?: string
  badgeType?: string
  badge?: boolean
  isPro?: boolean
}

const SidebarContent: MenuItem[] = [
  // ==================== NON-PRO SECTIONS ====================
  {
    heading: 'Dashboard',
    children: [
      {
        name: 'Home',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/orgstatus',
        isPro: false,
      },
    ],
  },


  {
    heading: 'Users Management',
    children: [
      {
        id: uniqueId(),
        name: 'Roles',
        icon: 'solar:notes-linear',
        url: '/superAdmin/usersmanagement/roles',
        isPro: false,
      },
      {
        id: uniqueId(),
        name: 'User',
        icon: 'solar:ticker-star-linear',
        url: '/superAdmin/usersmanagement/users',
        isPro: false,
      },

    ],
  },








  {
    heading: 'Doctor Management',
    children: [
      {
        name: 'Doctor',
        id: uniqueId(),
        icon: 'solar:login-2-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Doctors',
            url: '/superAdmin/doctormanagement/doctors',
            isPro: true,
          }
        ],
      },


    ],
  },


  {
    heading: 'Patient Management',
    children: [
      {
        name: 'Patients',
        id: uniqueId(),
        icon: 'solar:login-2-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Patients',
            url: '/superAdmin/patientmanagement/Patients',
            isPro: true,
          },
              
    
        ],
      },


    ],
  },

]

export default SidebarContent
