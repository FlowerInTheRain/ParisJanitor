<template>
  <div v-if="items.length > 0">
    <h1>Référentiel de prestations</h1>
    <table >
      <thead>
      <tr>
        <th>Nom</th>
        <th>Description</th>
        <th>Statut</th>
        <th>Type de prix</th>
        <th>Détails</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.serviceName }}</td>
          <td>{{ item.serviceDescription }}</td>
          <td>{{ item.approvalStatus }}</td>
          <td>{{ item.priceType }}</td>
          <td><button class="log-button">Détails</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {findMyPrestations} from "@/services/parisjanitor/endpoints/users";

export default {
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    console.log(localStorage.getItem("providerId"))
    if(localStorage.getItem("providerId")){
      const res = await findMyPrestations(localStorage.getItem("providerId"))
      console.log(res.data)
      this.items = res.data;
    }

  }
};
</script>

<style>
h1 {
  text-align: center;
}

table {
  width: 80%;
  margin: 0 auto; /* Centrer la table sur la page */
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

/* Suppression de la bordure du cadre de la table */
table {
  border: none;
}

button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
