<template>
  <div class="about">
    <div>
      <h1>Text: {{getText}}</h1>
      <button type="button" @click="setText">Change Text</button>
    </div>
    <div>
      <h1>groups: {{getGroups}}</h1>
      <button type="button" @click="setGroup(getGroups.length + 1)">Change Groups</button>
    </div>
    <div>
      <h1>Http Data: {{dataStatus}}</h1>
      <button type="button" @click="getHttpData">get github data</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getTestData } from '_ser/moduleA'

export default {
  name: 'about',
  data() {
    return {
      dataStatus: 'no data'
    }
  },
  computed: {
    ...mapGetters([
      'getText',
      'getGroups'
    ])
  },
  methods: {
    ...mapActions([
      'setText',
      'setGroup'
    ]),
    getHttpData() {
      getTestData()
      .then(response => {
        console.log(response)
        this.dataStatus = 'get success'
      })
    }
  }
}
</script>
<style>
button {
  border: 1px solid #ccc;
	border-radius: 5px;
}
</style>


