<template lang="pug">
box-layout.boxer
  section.section(v-if="!hasRegistered")
    h3.title {{$t('view.auth.register.title')}}
    h4.subtitle() {{$t('misc.words.or')}}
      router-link(:to="loginRoute")  {{$t('view.auth.register.login_action')}}
    
    message.is-danger(v-model="apiErrors", clearable)
    
    .login-form
      .field
        label.label {{$t('view.auth.register.name_field.label')}}
        input.input(
          type="text",
          autocomplete='name',
          v-model="fullname",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.name_field.placeholder')"
        )
      .field
        label.label {{$t('view.auth.register.email_field.label')}}
        input.input(
          type="email",
          autocomplete="email",
          v-model.trim="email",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.email_field.placeholder')"
        )
      .field
        label.label {{$t('view.auth.register.pass_field.label')}}
        input.input(
          type="password",
          autocomplete="current-password",
          v-model="password",
          @keyup.enter="register",
          :placeholder="$t('view.auth.register.pass_field.placeholder')"
        )
      .field
        label.label {{$t('view.auth.register.age')}}
        .control
          span.select.is-fullwidth
            select(v-model="age")
              option(:value="age.id", v-for="age in AGES") {{ age.title }}
      .field
        label.label {{$t('view.auth.register.gender.title')}}
        .control
          span.select.is-fullwidth
            select(v-model="gender")
              option(:value="gender.id", v-for="gender in genderByLanguage") {{ gender.title }}

      .field(v-if="customGenderSelected")
        label.label {{$t('view.auth.register.gender.custom')}}
        input.input(
          type="text",
          v-model.trim="custom",
          @keyup.enter="register"
        )
      .field
        label.label {{$t('view.auth.register.society')}}
        .control
          span.select.is-fullwidth
            select(v-model="society")
              option(:value="society.id", v-for="society in NATIONAL_SOCS") {{ society.name }}
      .field
        label.label {{$t('view.auth.register.role')}}
        .control
          span.select.is-fullwidth
            select(v-model="role")
              option(:value="role.id", v-for="role in roleByLanguage") {{ role.title }}
      .field
        label.label {{$t('view.auth.register.language.title')}}
        p.is-size-7.is-italic {{$t('view.auth.register.language.description')}}
        .control
          span.select.is-fullwidth
            select(v-model="lang")
              option(:value="locale.id", v-for="locale in availableLocales") {{ locale.endonym }}
      p
        | {{$t('view.auth.register.terms_body')}}
        router-link(:to="termsRoute", target="_blank")
          |  {{$t('view.base.terms.nav_title')}}
        = ' &'
        router-link(:to="privacyRoute", target="_blank")
          |  {{$t('view.base.privacy.nav_title')}}
      br
      .buttons.is-centered
        router-link.button.is-link(:to="returnRoute")
          | {{$t('view.auth.register.cancel_action')}}
        button.button.is-success(@click="register", :disabled="!canRegister")
          | {{$t('view.auth.register.submit_action')}}

  section.section.has-registered(v-else)
    h2.title.is-2.has-text-centered
      fa.email(icon="envelope-open", size="lg")
      span {{$t('view.auth.register.success_title')}}
    .message.is-success.is-medium
      .message-header {{$t('view.auth.register.success_subtitle')}}
      .message-body.content
        markdown(name="registered")
</template>

<script>
import { TERMS_ROUTE, PRIVACY_ROUTE, PROJECT_LIST_ROUTE, LOGIN_ROUTE } from '@/const/routes'
import ApiWorkerMixin from '@/mixins/ApiWorker'
import BoxLayout from '@/layouts/BoxLayout'
import Message from '@/components/utils/Message'
import Markdown from '@/components/utils/Markdown'

export const GENDERS = {
  'ar': [
    {'id': 0, 'title': 'إناثا'},
    {'id': 1, 'title': 'الذكر'},
    {'id': 2, 'title': 'يرجى التحديد'},
    {'id': 3, 'title': 'الأفضل أن لا يقال'}
  ],
  'en': [
    {'id': 0, 'title': 'Female'},
    {'id': 1, 'title': 'Male'},
    {'id': 2, 'title': 'Please Specify'},
    {'id': 3, 'title': 'Rather not say'}
  ],
  'es': [
    {'id': 0, 'title': 'Femenino'},
    {'id': 1, 'title': 'Masculino'},
    {'id': 2, 'title': 'Por favor especifica'},
    {'id': 3, 'title': 'Prefiero no decirlo'}
  ],
  'fr': [
    {'id': 0, 'title': 'Femelle'},
    {'id': 1, 'title': 'Mâle'},
    {'id': 2, 'title': 'Veuillez préciser'},
    {'id': 3, 'title': 'Plutôt pas dire'}
  ]
}

export const AGES = [
  {'id': 0, 'title': '< 21'},
  {'id': 1, 'title': '21–30'},
  {'id': 2, 'title': '31–40'},
  {'id': 3, 'title': '41+'}
]

export const ROLES = {
  'ar': [
    {'id': 0, 'title': 'تطوع'},
    {'id': 1, 'title': 'المتدرب'},
    {'id': 2, 'title': 'العاملين'},
    {'id': 3, 'title': 'قيادة'},
    {'id': 4, 'title': 'خارجي'}
  ],
  'en': [
    {'id': 0, 'title': 'Volunteer'},
    {'id': 1, 'title': 'Intern'},
    {'id': 2, 'title': 'Staff'},
    {'id': 3, 'title': 'Liderazgo'},
    {'id': 4, 'title': 'External'}
  ],
  'es': [
    {'id': 0, 'title': 'Voluntario'},
    {'id': 1, 'title': 'Interno'},
    {'id': 2, 'title': 'Personal'},
    {'id': 3, 'title': 'Liderazgo'},
    {'id': 4, 'title': 'Externo'}
  ],
  'fr': [
    {'id': 0, 'title': 'Bénévole'},
    {'id': 1, 'title': 'Interne'},
    {'id': 2, 'title': 'Personnel'},
    {'id': 3, 'title': 'Direction'},
    {'id': 4, 'title': 'Externe'}
  ]
}

export const NATIONAL_SOCS = [
  {
    'id': 1,
    'name': 'Afghan Red Crescent'
  },
  {
    'id': 2,
    'name': 'Albanian Red Cross'
  },
  {
    'id': 3,
    'name': 'Algerian Red Crescent'
  },
  {
    'id': 4,
    'name': 'American Red Cross'
  },
  {
    'id': 5,
    'name': 'Andorran Red Cross'
  },
  {
    'id': 6,
    'name': 'Angola Red Cross'
  },
  {
    'id': 7,
    'name': 'Antigua and Barbuda Red Cross'
  },
  {
    'id': 8,
    'name': 'Argentine Red Cross'
  },
  {
    'id': 9,
    'name': 'Armenian Red Cross Society'
  },
  {
    'id': 10,
    'name': 'Australian Red Cross'
  },
  {
    'id': 11,
    'name': 'Austrian Red Cross'
  },
  {
    'id': 12,
    'name': 'Bahrain Red Crescent Society'
  },
  {
    'id': 13,
    'name': 'Bangladesh Red Crescent Society'
  },
  {
    'id': 14,
    'name': 'Baphalali Swaziland Red Cross Society'
  },
  {
    'id': 15,
    'name': 'Belarus Red Cross'
  },
  {
    'id': 16,
    'name': 'Belgian Red Cross'
  },
  {
    'id': 17,
    'name': 'Belize Red Cross Society'
  },
  {
    'id': 18,
    'name': 'Bolivian Red Cross'
  },
  {
    'id': 19,
    'name': 'Botswana Red Cross Society'
  },
  {
    'id': 20,
    'name': 'Brazilian Red Cross'
  },
  {
    'id': 21,
    'name': 'British Red Cross'
  },
  {
    'id': 22,
    'name': 'Brunei Darussalam Red Crescent Society'
  },
  {
    'id': 23,
    'name': 'Bulgarian Red Cross'
  },
  {
    'id': 24,
    'name': 'Burkinabe Red Cross Society'
  },
  {
    'id': 25,
    'name': 'Burundi Red Cross'
  },
  {
    'id': 26,
    'name': 'Cambodian Red Cross Society'
  },
  {
    'id': 27,
    'name': 'Cameroon Red Cross Society'
  },
  {
    'id': 28,
    'name': 'Central African Red Cross Society'
  },
  {
    'id': 29,
    'name': 'Chilean Red Cross'
  },
  {
    'id': 30,
    'name': 'Colombian Red Cross'
  },
  {
    'id': 31,
    'name': 'Congolese Red Cross'
  },
  {
    'id': 32,
    'name': 'Cook Islands Red Cross Society'
  },
  {
    'id': 33,
    'name': 'Costa Rican Red Cross'
  },
  {
    'id': 34,
    'name': 'Croatian Red Cross'
  },
  {
    'id': 35,
    'name': 'Cuban Red Cross'
  },
  {
    'id': 36,
    'name': 'Cyprus Red Cross Society'
  },
  {
    'id': 37,
    'name': 'Czech Red Cross'
  },
  {
    'id': 38,
    'name': 'Danish Red Cross'
  },
  {
    'id': 39,
    'name': 'Dominica Red Cross Society'
  },
  {
    'id': 40,
    'name': 'Dominican Red Cross'
  },
  {
    'id': 41,
    'name': 'Ecuadorian Red Cross'
  },
  {
    'id': 42,
    'name': 'Egyptian Red Crescent Society'
  },
  {
    'id': 43,
    'name': 'Estonian Red Cross'
  },
  {
    'id': 44,
    'name': 'Ethiopian Red Cross Society'
  },
  {
    'id': 45,
    'name': 'Fiji Red Cross Society'
  },
  {
    'id': 46,
    'name': 'Finnish Red Cross'
  },
  {
    'id': 47,
    'name': 'French Red Cross'
  },
  {
    'id': 48,
    'name': 'Gabonese Red Cross Society'
  },
  {
    'id': 49,
    'name': 'German Red Cross'
  },
  {
    'id': 50,
    'name': 'Ghana Red Cross Society'
  },
  {
    'id': 51,
    'name': 'Grenada Red Cross Society'
  },
  {
    'id': 52,
    'name': 'Guatemalan Red Cross'
  },
  {
    'id': 53,
    'name': 'Haiti Red Cross Society'
  },
  {
    'id': 54,
    'name': 'Hellenic Red Cross'
  },
  {
    'id': 55,
    'name': 'Honduran Red Cross'
  },
  {
    'id': 56,
    'name': 'Hungarian Red Cross'
  },
  {
    'id': 57,
    'name': 'Icelandic Red Cross'
  },
  {
    'id': 58,
    'name': 'Indian Red Cross Society'
  },
  {
    'id': 59,
    'name': 'Indonesian Red Cross Society'
  },
  {
    'id': 60,
    'name': 'Iraqi Red Crescent Society'
  },
  {
    'id': 61,
    'name': 'Irish Red Cross Society'
  },
  {
    'id': 62,
    'name': 'Israel - Magen David Adom in Israel'
  },
  {
    'id': 63,
    'name': 'Italian Red Cross'
  },
  {
    'id': 64,
    'name': 'Jamaica Red Cross'
  },
  {
    'id': 65,
    'name': 'Japanese Red Cross Society'
  },
  {
    'id': 66,
    'name': 'Jordan National Red Crescent Society'
  },
  {
    'id': 67,
    'name': 'Kazakh Red Crescent'
  },
  {
    'id': 68,
    'name': 'Kenya Red Cross Society'
  },
  {
    'id': 69,
    'name': 'Kiribati Red Cross Society'
  },
  {
    'id': 70,
    'name': 'Kuwait Red Crescent Society'
  },
  {
    'id': 71,
    'name': 'Lao Red Cross'
  },
  {
    'id': 72,
    'name': 'Latvian Red Cross'
  },
  {
    'id': 73,
    'name': 'Lebanese Red Cross'
  },
  {
    'id': 74,
    'name': 'Lesotho Red Cross Society'
  },
  {
    'id': 75,
    'name': 'Liberian Red Cross Society'
  },
  {
    'id': 76,
    'name': 'Libyan Red Crescent'
  },
  {
    'id': 77,
    'name': 'Liechtenstein Red Cross'
  },
  {
    'id': 78,
    'name': 'Lithuanian Red Cross Society'
  },
  {
    'id': 79,
    'name': 'Luxembourg Red Cross'
  },
  {
    'id': 80,
    'name': 'Malagasy Red Cross Society'
  },
  {
    'id': 81,
    'name': 'Malawi Red Cross Society'
  },
  {
    'id': 82,
    'name': 'Malaysian Red Crescent Society'
  },
  {
    'id': 83,
    'name': 'Maldivian Red Crescent'
  },
  {
    'id': 84,
    'name': 'Mali Red Cross'
  },
  {
    'id': 85,
    'name': 'Malta Red Cross Society'
  },
  {
    'id': 86,
    'name': 'Mauritanian Red Crescent'
  },
  {
    'id': 87,
    'name': 'Mauritius Red Cross Society'
  },
  {
    'id': 88,
    'name': 'Mexican Red Cross'
  },
  {
    'id': 89,
    'name': 'Micronesia Red Cross'
  },
  {
    'id': 90,
    'name': 'Mongolian Red Cross Society'
  },
  {
    'id': 91,
    'name': 'Moroccan Red Crescent'
  },
  {
    'id': 92,
    'name': 'Mozambique Red Cross Society'
  },
  {
    'id': 93,
    'name': 'Myanmar Red Cross Society'
  },
  {
    'id': 94,
    'name': 'Namibia Red Cross'
  },
  {
    'id': 95,
    'name': 'Nepal Red Cross Society'
  },
  {
    'id': 96,
    'name': 'New Zealand Red Cross'
  },
  {
    'id': 97,
    'name': 'Nicaraguan Red Cross'
  },
  {
    'id': 98,
    'name': 'Nigerian Red Cross Society'
  },
  {
    'id': 99,
    'name': 'Norwegian Red Cross'
  },
  {
    'id': 100,
    'name': 'Pakistan Red Crescent'
  },
  {
    'id': 101,
    'name': 'Palau Red Cross Society'
  },
  {
    'id': 102,
    'name': 'Papua New Guinea Red Cross Society'
  },
  {
    'id': 103,
    'name': 'Paraguayan Red Cross'
  },
  {
    'id': 104,
    'name': 'Peruvian Red Cross'
  },
  {
    'id': 105,
    'name': 'Philippine Red Cross'
  },
  {
    'id': 106,
    'name': 'Polish Red Cross'
  },
  {
    'id': 107,
    'name': 'Portuguese Red Cross'
  },
  {
    'id': 108,
    'name': 'Qatar Red Crescent Society'
  },
  {
    'id': 109,
    'name': 'Red Crescent Society of Azerbaijan'
  },
  {
    'id': 110,
    'name': 'Red Crescent Society of Djibouti'
  },
  {
    'id': 111,
    'name': 'Red Crescent Society of Kyrgyzstan'
  },
  {
    'id': 112,
    'name': 'Red Crescent Society of Tajikistan'
  },
  {
    'id': 113,
    'name': 'Red Crescent Society of the Islamic Republic of Iran'
  },
  {
    'id': 114,
    'name': 'Red Crescent Society of the United Arab Emirates'
  },
  {
    'id': 115,
    'name': 'Red Crescent Society of Turkmenistan'
  },
  {
    'id': 116,
    'name': 'Red Crescent Society of Uzbekistan'
  },
  {
    'id': 117,
    'name': 'Red Cross of Benin'
  },
  {
    'id': 118,
    'name': 'Red Cross of Cape Verde'
  },
  {
    'id': 119,
    'name': 'Red Cross of Chad'
  },
  {
    'id': 120,
    'name': 'Red Cross of Monaco'
  },
  {
    'id': 121,
    'name': 'Red Cross of Montenegro'
  },
  {
    'id': 122,
    'name': 'Red Cross of the Democratic Republic of the Congo'
  },
  {
    'id': 123,
    'name': 'Red Cross of the Republic of San Marino'
  },
  {
    'id': 124,
    'name': 'Red Cross Society of China'
  },
  {
    'id': 125,
    'name': "Red Cross Society of Côte d'Ivoire"
  },
  {
    'id': 126,
    'name': 'Red Cross Society of Georgia'
  },
  {
    'id': 127,
    'name': 'Red Cross Society of Guinea'
  },
  {
    'id': 128,
    'name': 'Red Cross Society of Guinea-Bissau'
  },
  {
    'id': 129,
    'name': 'Red Cross Society of Niger'
  },
  {
    'id': 130,
    'name': 'Red Cross Society of Panama'
  },
  {
    'id': 131,
    'name': "Red Cross Society of the Democratic People's Republic of Korea"
  },
  {
    'id': 132,
    'name': 'Red Cross Society of the Republic of Moldova'
  },
  {
    'id': 133,
    'name': 'Romanian Red Cross'
  },
  {
    'id': 134,
    'name': 'Rwandan Red Cross'
  },
  {
    'id': 135,
    'name': 'Saint Kitts and Nevis Red Cross Society'
  },
  {
    'id': 136,
    'name': 'Saint Lucia Red Cross'
  },
  {
    'id': 137,
    'name': 'Saint Vincent and the Grenadines Red Cross'
  },
  {
    'id': 138,
    'name': 'Salvadorean Red Cross Society'
  },
  {
    'id': 139,
    'name': 'Samoa Red Cross Society'
  },
  {
    'id': 140,
    'name': 'Sao Tome and Principe Red Cross'
  },
  {
    'id': 141,
    'name': 'Saudi Red Crescent Authority'
  },
  {
    'id': 142,
    'name': 'Senegalese Red Cross Society'
  },
  {
    'id': 143,
    'name': 'Seychelles Red Cross Society'
  },
  {
    'id': 144,
    'name': 'Sierra Leone Red Cross Society'
  },
  {
    'id': 145,
    'name': 'Singapore Red Cross Society'
  },
  {
    'id': 146,
    'name': 'Slovak Red Cross'
  },
  {
    'id': 147,
    'name': 'Slovenian Red Cross'
  },
  {
    'id': 148,
    'name': 'Somali Red Crescent Society'
  },
  {
    'id': 149,
    'name': 'South Sudan Red Cross'
  },
  {
    'id': 150,
    'name': 'Spanish Red Cross'
  },
  {
    'id': 151,
    'name': 'Sri Lanka Red Cross Society'
  },
  {
    'id': 152,
    'name': 'Suriname Red Cross'
  },
  {
    'id': 153,
    'name': 'Swedish Red Cross'
  },
  {
    'id': 154,
    'name': 'Swiss Red Cross'
  },
  {
    'id': 155,
    'name': 'Syrian Arab Red Crescent'
  },
  {
    'id': 156,
    'name': 'Tanzania Red Cross National Society'
  },
  {
    'id': 157,
    'name': 'The Bahamas Red Cross Society'
  },
  {
    'id': 158,
    'name': 'The Barbados Red Cross Society'
  },
  {
    'id': 159,
    'name': 'The Canadian Red Cross Society'
  },
  {
    'id': 160,
    'name': 'The Comoros Red Crescent'
  },
  {
    'id': 161,
    'name': 'The Gambia Red Cross Society'
  },
  {
    'id': 162,
    'name': 'The Guyana Red Cross Society'
  },
  {
    'id': 163,
    'name': 'The Netherlands Red Cross'
  },
  {
    'id': 164,
    'name': 'The Palestine Red Crescent Society'
  },
  {
    'id': 165,
    'name': 'The Red Cross of Serbia'
  },
  {
    'id': 166,
    'name': 'The Red Cross of The Former Yugoslav Republic of Macedonia'
  },
  {
    'id': 167,
    'name': 'The Red Cross Society of Bosnia and Herzegovina'
  },
  {
    'id': 168,
    'name': 'The Republic of Korea National Red Cross'
  },
  {
    'id': 169,
    'name': 'The Russian Red Cross Society'
  },
  {
    'id': 170,
    'name': 'The Solomon Islands Red Cross'
  },
  {
    'id': 171,
    'name': 'The South African Red Cross Society'
  },
  {
    'id': 172,
    'name': 'The Sudanese Red Crescent'
  },
  {
    'id': 173,
    'name': 'The Thai Red Cross Society'
  },
  {
    'id': 174,
    'name': 'The Trinidad and Tobago Red Cross Society'
  },
  {
    'id': 175,
    'name': 'The Uganda Red Cross Society'
  },
  {
    'id': 176,
    'name': 'Timor-Leste Red Cross Society'
  },
  {
    'id': 177,
    'name': 'Togolese Red Cross'
  },
  {
    'id': 178,
    'name': 'Tonga Red Cross Society'
  },
  {
    'id': 179,
    'name': 'Tunisian Red Crescent'
  },
  {
    'id': 180,
    'name': 'Turkish Red Crescent Society'
  },
  {
    'id': 181,
    'name': 'Tuvalu Red Cross Society'
  },
  {
    'id': 182,
    'name': 'Ukrainian Red Cross Society'
  },
  {
    'id': 183,
    'name': 'Uruguayan Red Cross'
  },
  {
    'id': 184,
    'name': 'Vanuatu Red Cross Society'
  },
  {
    'id': 185,
    'name': 'Venezuelan Red Cross'
  },
  {
    'id': 186,
    'name': 'Vietnam Red Cross Society'
  },
  {
    'id': 187,
    'name': 'Yemen Red Crescent Society'
  },
  {
    'id': 188,
    'name': 'Zambia Red Cross Society'
  },
  {
    'id': 189,
    'name': 'Zimbabwe Red Cross Society'
  },
  {
    'id': 190,
    'name': 'Was your society not listed? Select this and we will be in touch.'
  }
]

export default {
  mixins: [ ApiWorkerMixin ],
  components: { BoxLayout, Message, Markdown },
  data: () => ({
    fullname: '',
    email: '',
    password: '',
    hasRegistered: false,
    lang: null,
    age: null,
    gender: null,
    society: null,
    role: null,
    custom: '',
    GENDERS,
    AGES,
    ROLES,
    NATIONAL_SOCS
  }),
  computed: {
    errorMessage () { return this.$store.getters.AUTH_ERROR },
    termsRoute () { return { name: TERMS_ROUTE } },
    privacyRoute () { return { name: PRIVACY_ROUTE } },
    projectListRoute () { return { name: PROJECT_LIST_ROUTE } },
    loginRoute () { return { name: LOGIN_ROUTE } },
    returnRoute () { return this.$store.getters.returnRoute || this.projectListRoute },
    availableLocales () { return this.$store.getters.availableLanguages },
    genderByLanguage () { return GENDERS[this.$i18n.locale] },
    roleByLanguage () { return ROLES[this.$i18n.locale] },
    customGenderSelected () { return this.gender === 2 },
    canRegister () {
      return this.fullname !== '' &&
        this.email !== '' &&
        this.password !== '' &&
        this.lang !== null &&
        this.age != null &&
        this.gender != null &&
        this.society != null &&
        this.role != null
    }
  },
  mounted () {
    if (this.$store.getters.currentUser) {
      this.$router.push(this.returnRoute)
    }
  },
  methods: {
    async register () {
      if (!this.canRegister || this.apiInProgress) return
      this.startApiWork()
      
      let { meta } = await this.$api.register(
        this.fullname, this.email, this.password, this.lang,
        this.age, this.gender, this.role, this.society, this.custom
      )
      
      this.hasRegistered = meta.success
      
      this.endApiWork(meta, this.$t('view.auth.register.failed_body'))
    }
  }
}
</script>

<style lang="sass">
.boxer
  padding: 1em 0

.has-registered
  .email
    margin-right: 0.3em

</style>
