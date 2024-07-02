<template>
  <div>
    <h1>Administración de Usuarios</h1>
    
    <div id="user-form-container">
      <form @submit.prevent="saveUser">
        <input type="hidden" v-model="form.id">
        <input type="text" v-model="form.name" placeholder="Nombre" required>
        <input type="email" v-model="form.email" placeholder="Email" required>
        <button type="submit">Guardar</button>
      </form>
    </div>
    
    <div id="user-list-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="editUser(index)" class="small-button">Editar</button>
              <button @click="deleteUser(index)" class="delete-button small-button">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
        { id: '2', name: 'María García', email: 'maria@example.com' },
        { id: '3', name: 'Pedro López', email: 'pedro@example.com' }
      ],
      form: {
        id: '',
        name: '',
        email: ''
      },
      editIndex: null
    };
  },
  methods: {
    saveUser() {
      if (this.editIndex !== null) {
        this.$set(this.users, this.editIndex, { ...this.form });
        this.editIndex = null;
      } else {
        const newId = this.users.length ? Math.max(...this.users.map(u => parseInt(u.id))) + 1 : 1;
        this.users.push({ ...this.form, id: newId.toString() });
      }
      this.resetForm();
    },
    editUser(index) {
      this.form = { ...this.users[index] };
      this.editIndex = index;
    },
    deleteUser(index) {
      this.users.splice(index, 1);
      this.resetForm();
    },
    resetForm() {
      this.form = { id: '', name: '', email: '' };
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 5px;
}

h1 {
  text-align: center;
}

#user-form-container {
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"] {
  padding: 4px;
  width: 130px;
  font-size: 12px;
}

button[type="submit"],
.small-button {
  padding: 4px 8px;
  font-size: 11px;
  width: 70px;
  height: 28px;
  line-height: 1;
}

button.delete-button {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 3px 6px;
  font-size: 11px;
  width: 70px;
  height: 28px;
  line-height: 1;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}

button {
  cursor: pointer;
}
</style>


