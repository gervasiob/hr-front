export const candidateColumns = [
  { 
    field: 'name', 
    title: 'Name', 
    width: 200, 
    sortable: true 
  },
  { 
    field: 'email', 
    title: 'Email', 
    width: 200 
  },
  { 
    field: 'phone', 
    title: 'Phone', 
    width: 150 
  },
  { 
    field: 'status', 
    title: 'Status', 
    width: 120,
    slots: { default: 'status' }
  },
  { 
    field: 'actions', 
    title: 'Actions', 
    width: 150,
    slots: { default: 'actions' }
  }
]