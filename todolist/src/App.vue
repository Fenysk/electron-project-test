<template>
  <div class="app
  flex flex-col
  h-screen
  md:flex-row md:items-start
  ">
    <header class="
    bg-gray-800
    text-gray-100
    flex flex-col justify-center items-center
    md:h-full md:items-end
    ">
      <h1 class="
      text-4xl text-gray-100
      px-12 py-4
      md:py-6
      whitespace-nowrap
      ">Games Stock</h1>
      <nav class="
      flex justify-center flex-wrap
      text-2xl font-500
      md:flex-col md:items-start md:h-full md:max-h-96 md:mt-12 md:min-w-[80%]
      ">
        <router-link class="
        hover:bg-gray-200 hover:text-black px-8 py-4 rounded-t-lg
        md:px-12 md:py-8 md:rounded-none md:w-full md:rounded-l-lg
        " to="/">Dashboard</router-link>
        <router-link class="
        hover:bg-gray-200 hover:text-black px-8 py-4 rounded-t-lg
        md:px-12 md:py-8 md:rounded-none md:w-full md:rounded-l-lg
        " to="/saled">Ventes</router-link>
        <router-link class="
        hover:bg-gray-200 hover:text-black px-8 py-4 rounded-t-lg
        md:px-12 md:py-8 md:rounded-none md:w-full md:rounded-l-lg
        " to="/stock">Stock</router-link>
      </nav>
    </header>
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
