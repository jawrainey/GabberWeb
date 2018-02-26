<template>
    <tbody>
        <tr @click="isShown=!isShown">
            <td>{{ projectSession.topics.length }}</td>
            <td>{{ projectSession.creator }}</td>
            <td>{{ participantInits }}</td>
            <td>{{ projectSession.date }}</td>
            <td>{{ projectSession.location }}</td>
            <td>
                <button class="arrow-right" v-bind:class="[isShown ? 'arrow-down' : 'arrow-right']"></button>
            </td>
        </tr>
        <tr v-if="isShown">
            <td colspan="2">
                <template v-for="topic in projectSession.topics">
                    <p>{{ topic }}</p>
                </template>
            </td>
            <td colspan="2">
                <template v-for="participant in projectSession.participants">
                    <p>{{ participant }}</p>
                </template>
            </td>
            <td colspan="2">
                Number of annotations: {{ projectSession.meta.numAnnotations }}
            </td>
        </tr>
    </tbody>
</template>

<script>
  export default {
    props: ['projectSession'],
    data: () => ({
      isShown: false
    }),
    computed: {
      // TODO: this should be encapsulated in a ParticipantCircle component
      participantInits () {
        return this.projectSession.participants.map(p => p.split(' ').map(w => w[0].toUpperCase()).join('')).join(", ")
      }
    }
  }
</script>

<style>
    .arrow-right, .arrow-down {
        height: 24px;
        width: 24px;
        margin-left: 10px;
        cursor: pointer;
        border: none;
        background-repeat: no-repeat;
        background-color: transparent;
        float: right;
    }

    .arrow-right { background-image: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTguNTkgMTYuMzRsNC41OC00LjU5LTQuNTgtNC41OUwxMCA1Ljc1bDYgNi02IDZ6Ii8+ICAgIDxwYXRoIGQ9Ik0wLS4yNWgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==); }
    .arrow-down { background-image: url("data:image/svg+xml;base64, PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik03LjQxIDcuODRMMTIgMTIuNDJsNC41OS00LjU4TDE4IDkuMjVsLTYgNi02LTZ6Ii8+CiAgICA8cGF0aCBkPSJNMC0uNzVoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+"); }
</style>