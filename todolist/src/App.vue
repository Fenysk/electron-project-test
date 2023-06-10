<template>
  <div class="
  app
  flex flex-col
  relative
  md:flex-row md:items-start
  ">
    <h1 class="
    absolute top-4 left-4 text-4xl text-gray-100
    ">Games Stock</h1>
    <nav class="
    flex justify-center items-center gap-8
    bg-gray-800 text-2xl text-gray-100 font-500
    md:min-h-screen md:flex-col md:items-start
    ">
      <router-link class="
      hover:bg-gray-300 hover:text-black px-12 py-6
      md:px-24 md:py-8 md:w-full
      " to="/">Dashboard</router-link>
      <router-link class="
      hover:bg-gray-300 hover:text-black px-12 py-6
      md:px-24 md:py-8 md:w-full
      " to="/saled">Ventes</router-link>
      <router-link class="
      hover:bg-gray-300 hover:text-black px-12 py-6
      md:px-24 md:py-8 md:w-full
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

select {
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
