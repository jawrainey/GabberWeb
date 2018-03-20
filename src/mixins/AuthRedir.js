import { LOGIN_ROUTE, REGISTER_ROUTE } from '@/const/routes'
import { LOGIN_RETURN_ROUTE } from '@/const/mutations'

export default {
  methods: {
    pushLogin () {
      this.$store.commit(LOGIN_RETURN_ROUTE, {
        name: this.$route.name,
        params: this.$route.params
      })
      this.$router.push({ name: LOGIN_ROUTE })
    },
    pushRegister () {
      this.$store.commit(LOGIN_RETURN_ROUTE, {
        name: this.$route.name,
        params: this.$route.params
      })
      this.$router.push({ name: REGISTER_ROUTE })
    }
  }
}
