<template>
  <div class="admin-roles">
    <h1>Administración de Roles</h1>
    
    <!-- Lista de usuarios -->
    <div class="user-list-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <select v-model="user.role" class="role-select">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="user">Usuario</option>
              </select>
            </td>
            <td>
              <button @click="saveUserRole(user)" class="action-button square-button">Guardar</button>
              <button @click="resetUserRole(user)" class="action-button square-button">Resetear</button>
              <button @click="deleteUserRole(index)" class="delete-button square-button">Eliminar</button>
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
        { id: '1', name: 'Juan Pérez', email: 'juan@example.com', role: 'admin' },
        { id: '2', name: 'María García', email: 'maria@example.com', role: 'editor' },
        { id: '3', name: 'Pedro López', email: 'pedro@example.com', role: 'user' }
      ]
    };
  },
  methods: {
    saveUserRole(user) {
      // Implementa la lógica para guardar el rol del usuario
      console.log(`Guardando rol para ${user.name}: ${user.role}`);
    },
    resetUserRole(user) {
      // Implementa la lógica para resetear el rol del usuario
      user.role = ''; // Ejemplo de resetear a valor inicial
    },
    deleteUserRole(index) {
      // Implementa la lógica para eliminar el usuario del rol
      console.log(`Eliminando usuario ${this.users[index].name}`);
      this.users.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.admin-roles {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.admin-roles h1 {
  text-align: center;
  margin-bottom: 20px;
}

.user-list-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
}

th, td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.role-select {
  padding: 4px;
}

.action-button {
  padding: 4px 8px;
  margin-left: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 11px;
  width: 70px;
  height: 28px;
  line-height: 1;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #0056b3;
}

.delete-button {
  padding: 3px 6px;
  margin-left: 5px;
  cursor: pointer;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 11px;
  width: 70px;
  height: 28px;
  line-height: 1;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>

  
  

  
  