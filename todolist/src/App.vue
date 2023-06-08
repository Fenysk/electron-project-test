<template>
  <div class="
  app
  flex flex-row items-start
  ">
    <nav class="
    flex h-screen flex-col justify-center text-2xl
    bg-gray-800 text-gray-100 font-500
    ">
      <router-link class="
      px-24 py-8
      hover:bg-gray-300 hover:text-black
      " to="/">Dashboard</router-link>
      <router-link class="
      px-24 py-8
      hover:bg-gray-300 hover:text-black
      " to="/saled">Ventes</router-link>
      <router-link class="
      px-24 py-8
      hover:bg-gray-300 hover:text-black
      " to="/stock">Stock</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #eee;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

h1 {
  font-size: 3em;
}

h2 {
  font-size: 2.5em;
}

h3 {
  font-size: 2em;
}

h4 {
  font-size: 1.5em;
}

h5 {
  font-size: 1.3em;
}
</style>
