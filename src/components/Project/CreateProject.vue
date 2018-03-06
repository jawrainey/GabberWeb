<template>
    <div class="box">
        <article>
            <div class="control">
                <input v-model="title" placeholder="Project Title"><br><br>
            </div>
            <div class="control">
                <input v-model="description" placeholder="Project Description"><br><br>
            </div>

            <h3>Add Topics</h3>
            <div class="control">
                <input :value=addTopicValue placeholder="Add a new topic and press enter to create" @keyup.enter="addTopicField"><br><br>
            </div>

            <div class="control" v-for="(topic, index) in topics">
                <input type="text" v-model=topics[index] v-if="topics[index]"> |
                <span @click="removeTopic(topic)">Remove</span>
            </div>
            <p>Privacy Settings</p>
            <select v-model="privacy">
                <option value="public" selected>
                    Public
                    Anyone can search for and view
                </option>
                <option value="private">
                    Private
                    Only project members can search and view
                </option>
            </select>
            <br><br>
            <button v-on:click.stop="onSubmit">Create Project</button>
        </article>
    </div>
</template>

<script>
export default {
  data: () => ({
    title: '',
    description: '',
    privacy: 'public',
    topics: [],
    // Used to reset the add topic field when AddTopicField called
    addTopicValue: ''
  }),
  methods: {
    addTopicField (event) {
      // Reset the value
      this.addTopicValue = ''
      this.topics.push(event.target.value)
    },
    removeTopic (topicText) {
      this.topics = this.topics.filter(topic => topic !== topicText)
    },
    onSubmit () {
      // TODO: validate form fields; must have title/description; topics are required.
      let project = this.$data
      this.$store.dispatch('CREATE_PROJECT', project)
        .then(() => this.$emit('projectCreated'))
        .catch((e) => console.log(e))
    }
  }
}
</script>
