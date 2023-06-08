<template>
  <div class="home p-4">
    <h2>ToDo List</h2>

    <input autofocus type="text" v-model="newTask" placeholder="Ajouter une tâche" />
    <button @click="addTask">Ajouter</button>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
        <button @click="editTask(index)">Modifier</button>
        <button @click="removeTask(index)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTasks, postTask, deleteTask, putTask } from '@/services/tasks'

export default {
  name: 'HomeView',

  data() {
    return {
      newTask: '',
      tasks: [],
    }
  },

  async mounted() {
    await this.getTasks()
  },

  methods: {
    async addTask() {
      await postTask(this.newTask)
      this.newTask = ''
      await this.getTasks()
    },

    async getTasks() {
      this.tasks = await getTasks()
    },

    async editTask(index) {
      const editedTask = prompt('Modifier la tâche', this.tasks[index])
      if (editedTask) {
        await putTask(index, editedTask)
        await this.getTasks()
      }
    },

    async removeTask(index) {
      await deleteTask(index)
      await this.getTasks()
    },
  },
}
</script>