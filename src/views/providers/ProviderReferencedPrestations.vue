<template>
  <div v-if="isAuthenticated">
    <main class="content">
    <h1>Catalogue de prestations</h1>
    <table >
      <thead>
      <tr>
        <th>Nom</th>
        <th>Description</th>
        <th>Validation </th>
        <th>Type de prix</th>
        <th>Détails</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.serviceName }}</td>
          <td>{{ item.serviceDescription }}</td>
          <td :class="getCellClass(item.approvalStatus)">{{ item.approvalStatus === 'PENDING' ? "En Attente": item.approvalStatus
 === "APPROVED" ? "Approuvée" : "Refusée"
            }}</td>
          <td>{{ item.priceType === "FIXED" ? 'Fixe': item.priceType === "DYNAMIC" ? "Dynamique" : "Forfait" }}</td>
          <td><button class="log-button" @click="prestationDetails(item.id)">Détails</button></td>
        </tr>
      </tbody>
    </table>

    </main>

  </div>

</template>

<script>
import {findMyPrestations} from "@/services/parisjanitor/endpoints/users";

export default {
  data() {
    return {
      items: [],
      isAuthenticated: this.$store.state.isAuthenticated,
      providerId: this.$store.state.provider ? this.$store.state.provider.id : null,
    };
  },
  async mounted() {
    if(this.isAuthenticated){
      const res = await findMyPrestations(this.providerId)
      this.items = res.data;
    }
  },
  methods : {
    getCellClass(cell) {
      if (cell === "REFUSED") {
        return 'refused-value';
      } else if (cell === "APPROVED") {
        return 'approved-value';
      } else {
        return 'pending-value';
      }
    },
    prestationDetails(refPrestId) {
      const dataToSend = { refPrestId: refPrestId};
      this.$router.push({
        name: 'refPrestationDetails',
        params: dataToSend
      });
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
.content {
  margin-top: 60px; /* Adjust this value to create space */
  padding: 20px;
}
.approved-value {
  color: green;
}
.refused-value {
  color: darkred;
}
.pending-value {
  color: darkorange;
}
</style>
