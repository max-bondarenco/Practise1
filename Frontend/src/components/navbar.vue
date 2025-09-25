<template>
  <nav class="sidebar">
    <ul>
      <router-link :to="{ name: 'add-file' }" class="nav-link">
        <li>Create new file</li>
      </router-link>
      <router-link :to="{ name: 'file-list' }" class="nav-link">
        <li>View existing files</li>
      </router-link>
      <router-link :to="{ name: 'info' }" class="nav-link">
        <li>Info</li>
      </router-link>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
}

.sidebar ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.nav-link li {
  padding: 1rem;
}

.router-link-exact-active li {
  background-color: #1abc9c;
  color: #fff;
}
</style>
