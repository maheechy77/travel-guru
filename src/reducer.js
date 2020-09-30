export const initialState = {
	basket: [],
	places: [
		{
			id: "1",
			name: "Sajek",
			image: "../../Image/Sajek.png",
			description:
				"Sajek valley is known for its natural environment and is surrounded by mountains, dense forest, and grassland hill tracks. Many small rivers flow through the mountains among which the Kachalong and the Machalong are notable. On the way to Sajek valley, one has to cross the Mayni range and the Mayni river. The road to Sajek has high peaks and falls.",
		},
		{
			id: "2",
			name: "Sreemongol",
			image: "../../Image/Sreemongol.png",
			description:
				"It is said the name Sreemangal (or Srimangal) is named after Sri Das and Mangal Das; two brothers who settled on the banks of the Hail Haor.[2] A copper plate of Raja Marundanath from the 11th century was found in Kalapur. During an excavation at Lamua, an ancient statue of Ananta Narayan was dug out. In 1454, the Nirmai Shiva Bari was built and still stands today. ",
		},
		{
			id: "3",
			name: "Sundorbon",
			image: "../../Image/sundorbon.png",
			description:
				"The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal. It spans from the Hooghly River in India's state of West Bengal to the Baleswar River in Bangladesh. It comprises closed and open mangrove forests, agriculturally used land, mudflats and barren land, and is intersected by multiple tidal streams and channels.",
		},
	],
	user: null,
	isLoggedIn: false,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_BASKET":
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "LoggedIn":
			return {
				...state,
				isLoggedIn: action.isLoggedIn,
			};
		default:
			return state;
	}
};
