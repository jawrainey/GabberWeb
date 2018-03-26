/*
 * A mixin for components that want to redirect to login/reg pages
 * - Adds methods to push the login/register page
 * - Stores the current route so it can be redirected back to afterwards
 */
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
