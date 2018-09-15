/*
 * A mixin for shared hard-coded values for TalkFutures
 * - NATIONAL_SOCS: Red Cross Red Crescent (RCRC) societies
 * - ROLES: the role of a participant within the RCRC
 * - GENDERS: the gender of a participant
 * - AGES: the age range of a selected participant
 */

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
    {'id': 3, 'title': 'Leader'},
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

export const GENDERS = {
  'ar': [
    {'id': 0, 'text': 'إناثا'},
    {'id': 1, 'text': 'الذكر'},
    {'id': 2, 'text': 'يرجى التحديد'},
    {'id': 3, 'text': 'الأفضل أن لا يقال'}
  ],
  'en': [
    {'id': 0, 'text': 'Female'},
    {'id': 1, 'text': 'Male'},
    {'id': 2, 'text': 'Please Specify'},
    {'id': 3, 'text': 'Rather not say'}
  ],
  'es': [
    {'id': 0, 'text': 'Femenino'},
    {'id': 1, 'text': 'Masculino'},
    {'id': 2, 'text': 'Por favor especifica'},
    {'id': 3, 'text': 'Prefiero no decirlo'}
  ],
  'fr': [
    {'id': 0, 'text': 'Femelle'},
    {'id': 1, 'text': 'Mâle'},
    {'id': 2, 'text': 'Veuillez préciser'},
    {'id': 3, 'text': 'Plutôt pas dire'}
  ]
}

export const AGES = [
  {'id': 0, 'text': '< 21'},
  {'id': 1, 'text': '21–30'},
  {'id': 2, 'text': '31–40'},
  {'id': 3, 'text': '41+'}
]

export default {
  data: () => ({ GENDERS, NATIONAL_SOCS, ROLES, AGES })
}
