// import { format } from 'date-fns'

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    sticky: 'left'
  },
  {
    Header: 'Name',
    accessor: 'name',
    sticky: 'left'
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    sticky: 'left'
  },
  {
    Header: 'Designation',
    accessor: 'designation',
    sticky: 'left'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  
]

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name'
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name'
      }
    ]
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth'
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
      }
    ]
  }
]
