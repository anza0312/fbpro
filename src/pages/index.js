import { useEffect, useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();
	const elementRef = useRef(null);

	const [template, setTemplate] = useState('comment_1');
	const [custom_background, setCustomBackground] = useState('');
	const [relevan, setRelevan] = useState('false');
	const [profile_url, setProfileUrl] = useState('');
	const [profile_name, setProfileName] = useState('');
	const [profile_verified, setProfileVerified] = useState('false');
	const [words, setWords] = useState('');
	const [html_words, setHtmlWords] = useState('');
	const [star_image, setStarImage] = useState('images/star 1.gif');
	const [stars, setStars] = useState(0);
	const [popular, setPopular] = useState('false');
	const [weeks, setWeeks] = useState(0);
	const [minutes, setMinutes] = useState('Baru Saja');
	const [reaction, setReactions] = useState(0);
	const [reaction_type, setReactionType] = useState('');

	const reactions = {
		'like': "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E",
		'love': "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9963 8c0 4.4179-3.5811 7.9993-7.9986 7.9993-4.4176 0-7.9987-3.5814-7.9987-7.9992 0-4.4179 3.5811-7.9992 7.9987-7.9992 4.4175 0 7.9986 3.5813 7.9986 7.9992Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M7.9996 5.9081c-.3528-.8845-1.1936-1.507-2.1748-1.507-1.4323 0-2.4254 1.328-2.4254 2.6797 0 2.2718 2.3938 4.0094 4.0816 5.1589.3168.2157.7205.2157 1.0373 0 1.6878-1.1495 4.0815-2.8871 4.0815-5.159 0-1.3517-.993-2.6796-2.4254-2.6796-.9811 0-1.822.6225-2.1748 1.507Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23E11731' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23E11731' stop-opacity='.1'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3986' y1='2.4007' x2='13.5975' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF74AE'/%3E%3Cstop offset='.5001' stop-color='%23FA2E3E'/%3E%3Cstop offset='1' stop-color='%23FF5758'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.001.0009h15.9992v15.9984H-.001z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
		'care': "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9982 7.9998c0 4.4181-3.5815 7.9996-7.9996 7.9996-4.418 0-7.9996-3.5815-7.9996-7.9996 0-4.418 3.5816-7.9996 7.9996-7.9996 4.4181 0 7.9996 3.5816 7.9996 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cmask id='mask0_15251_63610' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='6' y='13' width='8' height='3'%3E%3Cpath d='M13.6084 13.7029c-1.4438 1.4203-3.4244 2.2965-5.6097 2.2965a8.0393 8.0393 0 0 1-1.5715-.1543c.6898-.2867 1.6353-.7368 2.5437-1.3171 1.2793.5295 3.4828.2415 4.6285-.8326l.009.0075Z' fill='%23D9D9D9'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_15251_63610)'%3E%3Cpath d='M15.9982 7.9998c0 4.4181-3.5815 7.9996-7.9996 7.9996-4.418 0-7.9996-3.5815-7.9996-7.9996 0-4.418 3.5816-7.9996 7.9996-7.9996 4.4181 0 7.9996 3.5816 7.9996 7.9996Z' fill='url(%23paint2_linear_15251_63610)'/%3E%3C/g%3E%3Cpath d='M15.9962 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S-.003 12.4176-.003 7.9996 3.5786 0 7.9967 0c4.418 0 7.9995 3.5815 7.9995 7.9996Z' fill='url(%23paint3_radial_15251_63610)'/%3E%3Cpath d='M15.9962 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S-.003 12.4176-.003 7.9996 3.5786 0 7.9967 0c4.418 0 7.9995 3.5815 7.9995 7.9996Z' fill='url(%23paint4_radial_15251_63610)'/%3E%3Cpath d='M15.9962 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S-.003 12.4176-.003 7.9996 3.5786 0 7.9967 0c4.418 0 7.9995 3.5815 7.9995 7.9996Z' fill='url(%23paint5_radial_15251_63610)' style='mix-blend-mode:multiply'/%3E%3Cpath d='M15.9962 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S-.003 12.4176-.003 7.9996 3.5786 0 7.9967 0c4.418 0 7.9995 3.5815 7.9995 7.9996Z' fill='url(%23paint6_radial_15251_63610)' style='mix-blend-mode:multiply'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.585 7.7886a.499.499 0 0 1 .026.0043 2.849 2.849 0 0 1 1.8175 1.202 2.8423 2.8423 0 0 1 .4349 2.1333c-.2461 1.2665-1.3291 2.3137-2.4304 3.0886-1.1259.7923-2.3926 1.3839-3.2016 1.7072a1.08 1.08 0 0 1-1.151-.2237c-.6289-.6028-1.5818-1.6259-2.329-2.7823-.7307-1.131-1.3425-2.5076-1.0963-3.7741a2.8425 2.8425 0 0 1 1.2024-1.8151 2.8492 2.8492 0 0 1 2.1354-.4336.5086.5086 0 0 1 .0268.006 2.9735 2.9735 0 0 1 1.4594.8686c.1647.1788.3813.4853.5716.8626.3155-.2781.6296-.482.8526-.5874a2.9734 2.9734 0 0 1 1.6817-.2564Z' fill='url(%23paint7_radial_15251_63610)'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.585 7.7886a.499.499 0 0 1 .026.0043 2.849 2.849 0 0 1 1.8175 1.202 2.8423 2.8423 0 0 1 .4349 2.1333c-.2461 1.2665-1.3291 2.3137-2.4304 3.0886-1.1259.7923-2.3926 1.3839-3.2016 1.7072a1.08 1.08 0 0 1-1.151-.2237c-.6289-.6028-1.5818-1.6259-2.329-2.7823-.7307-1.131-1.3425-2.5076-1.0963-3.7741a2.8425 2.8425 0 0 1 1.2024-1.8151 2.8492 2.8492 0 0 1 2.1354-.4336.5086.5086 0 0 1 .0268.006 2.9735 2.9735 0 0 1 1.4594.8686c.1647.1788.3813.4853.5716.8626.3155-.2781.6296-.482.8526-.5874a2.9734 2.9734 0 0 1 1.6817-.2564Z' fill='url(%23paint8_radial_15251_63610)'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.585 7.7886a.499.499 0 0 1 .026.0043 2.849 2.849 0 0 1 1.8175 1.202 2.8423 2.8423 0 0 1 .4349 2.1333c-.2461 1.2665-1.3291 2.3137-2.4304 3.0886-1.1259.7923-2.3926 1.3839-3.2016 1.7072a1.08 1.08 0 0 1-1.151-.2237c-.6289-.6028-1.5818-1.6259-2.329-2.7823-.7307-1.131-1.3425-2.5076-1.0963-3.7741a2.8425 2.8425 0 0 1 1.2024-1.8151 2.8492 2.8492 0 0 1 2.1354-.4336.5086.5086 0 0 1 .0268.006 2.9735 2.9735 0 0 1 1.4594.8686c.1647.1788.3813.4853.5716.8626.3155-.2781.6296-.482.8526-.5874a2.9734 2.9734 0 0 1 1.6817-.2564Z' fill='url(%23paint9_radial_15251_63610)'/%3E%3Cmask id='mask1_15251_63610' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='-1' y='0' width='17' height='16'%3E%3Ccircle cx='7.9976' cy='7.9998' r='7.9996' fill='%23fff'/%3E%3C/mask%3E%3Cg mask='url(%23mask1_15251_63610)' fill-rule='evenodd' clip-rule='evenodd'%3E%3Cpath d='M1.3582 7.6194C.836 7.1064.318 7.2994.118 7.9596c-.2.6603-.0513 2.4955 1.0427 3.3962 2.752 2.2662 5.464.8613 5.5191-.5247.0498-1.2472-1.3555-1.113-1.8127-1.0879-.0311.0018-.0445-.0412-.0178-.0582.096-.0626.2535-.1719.4198-.3125.3594-.3044.1753-.8326-.3264-.6813-.0756.0224-1.2968.3904-2.0707.0967-.8778-.3331-.9828-.6465-1.5147-1.1685h.0009Z' fill='%23FFF287'/%3E%3Cpath d='M1.3582 7.6194C.836 7.1064.318 7.2994.118 7.9596c-.2.6603-.0513 2.4955 1.0427 3.3962 2.752 2.2662 5.464.8613 5.5191-.5247.0498-1.2472-1.3555-1.113-1.8127-1.0879-.0311.0018-.0445-.0412-.0178-.0582.096-.0626.2535-.1719.4198-.3125.3594-.3044.1753-.8326-.3264-.6813-.0756.0224-1.2968.3904-2.0707.0967-.8778-.3331-.9828-.6465-1.5147-1.1685h.0009Z' fill='url(%23paint10_linear_15251_63610)'/%3E%3Cpath d='M1.3582 7.6194C.836 7.1064.318 7.2994.118 7.9596c-.2.6603-.0513 2.4955 1.0427 3.3962 2.752 2.2662 5.464.8613 5.5191-.5247.0498-1.2472-1.3555-1.113-1.8127-1.0879-.0311.0018-.0445-.0412-.0178-.0582.096-.0626.2535-.1719.4198-.3125.3594-.3044.1753-.8326-.3264-.6813-.0756.0224-1.2968.3904-2.0707.0967-.8778-.3331-.9828-.6465-1.5147-1.1685h.0009Z' fill='url(%23paint11_radial_15251_63610)' fill-opacity='.6'/%3E%3Cpath d='M1.3582 7.6194C.836 7.1064.318 7.2994.118 7.9596c-.2.6603-.0513 2.4955 1.0427 3.3962 2.752 2.2662 5.464.8613 5.5191-.5247.0498-1.2472-1.3555-1.113-1.8127-1.0879-.0311.0018-.0445-.0412-.0178-.0582.096-.0626.2535-.1719.4198-.3125.3594-.3044.1753-.8326-.3264-.6813-.0756.0224-1.2968.3904-2.0707.0967-.8778-.3331-.9828-.6465-1.5147-1.1685h.0009Z' fill='url(%23paint12_radial_15251_63610)'/%3E%3Cpath d='M1.3582 7.6194C.836 7.1064.318 7.2994.118 7.9596c-.2.6603-.0513 2.4955 1.0427 3.3962 2.752 2.2662 5.464.8613 5.5191-.5247.0498-1.2472-1.3555-1.113-1.8127-1.0879-.0311.0018-.0445-.0412-.0178-.0582.096-.0626.2535-.1719.4198-.3125.3594-.3044.1753-.8326-.3264-.6813-.0756.0224-1.2968.3904-2.0707.0967-.8778-.3331-.9828-.6465-1.5147-1.1685h.0009Z' fill='url(%23paint13_radial_15251_63610)'/%3E%3Cpath d='M1.3582 7.6194C.836 7.1064.318 7.2994.118 7.9596c-.2.6603-.0513 2.4955 1.0427 3.3962 2.752 2.2662 5.464.8613 5.5191-.5247.0498-1.2472-1.3555-1.113-1.8127-1.0879-.0311.0018-.0445-.0412-.0178-.0582.096-.0626.2535-.1719.4198-.3125.3594-.3044.1753-.8326-.3264-.6813-.0756.0224-1.2968.3904-2.0707.0967-.8778-.3331-.9828-.6465-1.5147-1.1685h.0009Z' fill='url(%23paint14_radial_15251_63610)'/%3E%3Cpath d='M14.2827 7.7582c.3146-.7585.3146-1.1585.7145-1.3585.4-.2 1 .4 1 1.6 0 1.9998-.8 4.1957-2.3999 5.6956-1.5999 1.5-5.2626 1.4668-5.5906-.1845-.2727-1.3695 1.1697-1.5059 1.6332-1.571.0316-.0045.0378-.0542.0079-.0677a4.201 4.201 0 0 1-.474-.262c-.4125-.2647-.3176-.8871.211-.8203.599.0913 1.3395.2647 1.978.1997 1.8469-.1888 2.6052-2.4728 2.9199-3.2313Z' fill='%23FFF287'/%3E%3Cpath d='M14.2827 7.7582c.3146-.7585.3146-1.1585.7145-1.3585.4-.2 1 .4 1 1.6 0 1.9998-.8 4.1957-2.3999 5.6956-1.5999 1.5-5.2626 1.4668-5.5906-.1845-.2727-1.3695 1.1697-1.5059 1.6332-1.571.0316-.0045.0378-.0542.0079-.0677a4.201 4.201 0 0 1-.474-.262c-.4125-.2647-.3176-.8871.211-.8203.599.0913 1.3395.2647 1.978.1997 1.8469-.1888 2.6052-2.4728 2.9199-3.2313Z' fill='url(%23paint15_linear_15251_63610)'/%3E%3Cpath d='M14.2827 7.7582c.3146-.7585.3146-1.1585.7145-1.3585.4-.2 1 .4 1 1.6 0 1.9998-.8 4.1957-2.3999 5.6956-1.5999 1.5-5.2626 1.4668-5.5906-.1845-.2727-1.3695 1.1697-1.5059 1.6332-1.571.0316-.0045.0378-.0542.0079-.0677a4.201 4.201 0 0 1-.474-.262c-.4125-.2647-.3176-.8871.211-.8203.599.0913 1.3395.2647 1.978.1997 1.8469-.1888 2.6052-2.4728 2.9199-3.2313Z' fill='url(%23paint16_radial_15251_63610)' fill-opacity='.8'/%3E%3Cpath d='M14.2827 7.7582c.3146-.7585.3146-1.1585.7145-1.3585.4-.2 1 .4 1 1.6 0 1.9998-.8 4.1957-2.3999 5.6956-1.5999 1.5-5.2626 1.4668-5.5906-.1845-.2727-1.3695 1.1697-1.5059 1.6332-1.571.0316-.0045.0378-.0542.0079-.0677a4.201 4.201 0 0 1-.474-.262c-.4125-.2647-.3176-.8871.211-.8203.599.0913 1.3395.2647 1.978.1997 1.8469-.1888 2.6052-2.4728 2.9199-3.2313Z' fill='url(%23paint17_radial_15251_63610)'/%3E%3Cpath d='M14.2827 7.7582c.3146-.7585.3146-1.1585.7145-1.3585.4-.2 1 .4 1 1.6 0 1.9998-.8 4.1957-2.3999 5.6956-1.5999 1.5-5.2626 1.4668-5.5906-.1845-.2727-1.3695 1.1697-1.5059 1.6332-1.571.0316-.0045.0378-.0542.0079-.0677a4.201 4.201 0 0 1-.474-.262c-.4125-.2647-.3176-.8871.211-.8203.599.0913 1.3395.2647 1.978.1997 1.8469-.1888 2.6052-2.4728 2.9199-3.2313Z' fill='url(%23paint18_radial_15251_63610)' fill-opacity='.9' style='mix-blend-mode:screen'/%3E%3C/g%3E%3Cpath d='M7.9977 6.8c.71 0 1.1723-.1164 1.4952-.2331.3063-.1108.4-.4145.08-.4762C9.277 6.0336 8.7886 6 7.9978 6c-.7753 0-1.2813.0342-1.5903.0988-.3085.0646-.2235.3583.073.4654.3257.1177.8017.2357 1.5173.2357Z' fill='%234B280E'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.1526 2.0928a3.3945 3.3945 0 0 1 2.0299.699.4.4 0 0 0 .4863-.6352 4.1946 4.1946 0 0 0-2.5083-.8637.4.4 0 1 0-.0079.7999ZM5.843 2.0928a3.3946 3.3946 0 0 0-2.03.699.4.4 0 1 1-.4862-.6352 4.1945 4.1945 0 0 1 2.5083-.8637.4.4 0 1 1 .008.7999Z' fill='%23E0761A'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.998 4.3577c-.001.7238.483.936 1.1999 1.023.7099.1024 1.1878-.1978 1.1998-1.023.01-.6941-.3809-1.5413-1.1998-1.5575-.8189.0162-1.1999.8634-1.1999 1.5575ZM5.998 4.3577c.001.7238-.483.936-1.1998 1.023-.71.1024-1.1879-.1978-1.1999-1.023-.01-.6941.381-1.5413 1.1999-1.5575.8189.0162 1.1998.8634 1.1998 1.5575Z' fill='%231C1C1D'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23FF5758' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FF5758' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint3_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(.1233 -1.60292 4.45604 .34277 10.6837 13.9363)'%3E%3Cstop stop-color='%23791119' stop-opacity='.7'/%3E%3Cstop offset='1' stop-color='%23791119' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint4_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(.92919 2.03556 -13.3287 6.08424 12.9748 11.0609)'%3E%3Cstop stop-color='%23791119' stop-opacity='.08'/%3E%3Cstop offset='1' stop-color='%23791119' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint5_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(.5 -2 2.8733 .71832 3 11)'%3E%3Cstop offset='.2088' stop-color='%23791119' stop-opacity='.4'/%3E%3Cstop offset='1' stop-color='%23791119' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint6_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(1.5 -1 1.43665 2.15497 2 10)'%3E%3Cstop offset='.2088' stop-color='%23791119' stop-opacity='.3'/%3E%3Cstop offset='1' stop-color='%23791119' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint7_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(4.40005 5.20005 -6.1455 5.20005 4.198 9.4003)'%3E%3Cstop offset='.3729' stop-color='%23FA2E3E'/%3E%3Cstop offset='.9266' stop-color='%23E11731'/%3E%3C/radialGradient%3E%3CradialGradient id='paint8_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(-92.693 7.5086 3.7543) scale(1.72921 2.52467)'%3E%3Cstop stop-color='%23791119' stop-opacity='.9'/%3E%3Cstop offset='1' stop-color='%23791119' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint9_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(-65.627 15.8732 -.8589) scale(1.94093 2.8338)'%3E%3Cstop stop-color='%23791119' stop-opacity='.9'/%3E%3Cstop offset='1' stop-color='%23791119' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint11_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(93.472 -1.1146 5.8598) scale(4.00047 8.84233)'%3E%3Cstop stop-color='%23FFF287' stop-opacity='0'/%3E%3Cstop offset='.9846' stop-color='%23FF5758' stop-opacity='.8'/%3E%3C/radialGradient%3E%3CradialGradient id='paint12_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(131.396 1.7386 3.9605) scale(7.98139 8.42047)'%3E%3Cstop offset='.6481' stop-color='%23FFE480'/%3E%3Cstop offset='.9167' stop-color='%23FFE480' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint13_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(115.036 -.1572 5.1636) scale(5.20766 4.5125)'%3E%3Cstop offset='.9124' stop-color='%23FFE480' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FFE480'/%3E%3C/radialGradient%3E%3CradialGradient id='paint14_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(1.35706 1.5577 -3.27818 2.85593 0 7.5)'%3E%3Cstop stop-color='%23FFE483'/%3E%3Cstop offset='.9167' stop-color='%23FFEB80' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint16_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(38.267 -7.741 22.3658) scale(3.94718 18.9414)'%3E%3Cstop stop-color='%23FFF287' stop-opacity='0'/%3E%3Cstop offset='.7371' stop-color='%23FF5758' stop-opacity='.4'/%3E%3C/radialGradient%3E%3CradialGradient id='paint17_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(2.93607 2.57398 -2.89968 3.3076 10.5 8)'%3E%3Cstop offset='.8254' stop-color='%23FFE480'/%3E%3Cstop offset='1' stop-color='%23FFE480' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='paint18_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(4.5 2.5 -3.1886 5.73949 11 9)'%3E%3Cstop offset='.897' stop-color='%23FFE480' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FFE480'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.5019' y1='2.5002' x2='16.002' y2='16.0002' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2619' stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23F68628'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_15251_63610' x1='10' y1='14.5002' x2='10' y2='17.0002' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFF287' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FFF287'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint10_linear_15251_63610' x1='4.4115' y1='6.5983' x2='2.6271' y2='9.9854' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23F68628' stop-opacity='.3'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint15_linear_15251_63610' x1='7.9727' y1='12.4766' x2='18.4483' y2='13.8876' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.0835' stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23F68628'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.002.0002h16.0001v16h-16z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
		'haha': "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9953 7.9996c0 4.418-3.5816 7.9996-7.9996 7.9996S-.004 12.4176-.004 7.9996 3.5776 0 7.9957 0c4.418 0 7.9996 3.5815 7.9996 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M15.9953 7.9996c0 4.418-3.5816 7.9996-7.9996 7.9996S-.004 12.4176-.004 7.9996 3.5776 0 7.9957 0c4.418 0 7.9996 3.5815 7.9996 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.8'/%3E%3Cpath d='M12.5278 8.1957c.4057.1104.6772.4854.623.9024-.3379 2.6001-2.5167 4.9012-5.1542 4.9012s-4.8163-2.3011-5.1542-4.9012c-.0542-.417.2173-.792.623-.9024.8708-.237 2.5215-.596 4.5312-.596 2.0098 0 3.6605.359 4.5312.596Z' fill='%234B280E'/%3E%3Cpath d='M11.5809 12.3764c-.9328.9843-2.1948 1.6228-3.5841 1.6228-1.3892 0-2.6512-.6383-3.5839-1.6225a1.5425 1.5425 0 0 0-.016-.0174c.4475-1.0137 2.2-1.3599 3.5999-1.3599 1.4 0 3.1514.3468 3.5998 1.3599l-.0157.0171Z' fill='url(%23paint3_linear_15251_63610)'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.3049 5.8793c.1614-1.1485-.6387-2.2103-1.7872-2.3717l-.0979-.0138c-1.1484-.1614-2.2103.6388-2.3717 1.7872l-.0163.1164a.5.5 0 0 0 .9902.1392l.0163-.1164c.0846-.6016.6408-1.0207 1.2424-.9362l.0978.0138c.6016.0845 1.0207.6407.9362 1.2423l-.0164.1164a.5.5 0 0 0 .9903.1392l.0163-.1164ZM2.6902 5.8793c-.1614-1.1485.6387-2.2103 1.7872-2.3717l.0979-.0138c1.1484-.1614 2.2103.6388 2.3717 1.7872l.0164.1164a.5.5 0 1 1-.9903.1392l-.0163-.1164c-.0846-.6016-.6408-1.0207-1.2423-.9362l-.098.0138c-.6015.0845-1.0206.6407-.936 1.2423l.0163.1164a.5.5 0 0 1-.9902.1392l-.0164-.1164Z' fill='%231C1C1D'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23FF5758' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FF5758' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5272 10.9202) scale(10.1818)'%3E%3Cstop stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23FFF287' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.396' y1='2.3999' x2='13.5954' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23F68628'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear_15251_63610' x1='5.1979' y1='10.7996' x2='5.245' y2='14.2452' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF60A4'/%3E%3Cstop offset='.2417' stop-color='%23FA2E3E'/%3E%3Cstop offset='1' stop-color='%23BC0A26'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.002 0h16v15.9992h-16z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
		'wow': "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9972 7.9996c0 4.418-3.5815 7.9996-7.9996 7.9996-4.418 0-7.9996-3.5816-7.9996-7.9996S3.5796 0 7.9976 0c4.4181 0 7.9996 3.5815 7.9996 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M15.9972 7.9996c0 4.418-3.5815 7.9996-7.9996 7.9996-4.418 0-7.9996-3.5816-7.9996-7.9996S3.5796 0 7.9976 0c4.4181 0 7.9996 3.5815 7.9996 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.8'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.6144 10.8866c.159-1.8461 1.127-2.887 2.382-2.887 1.2551 0 2.2231 1.0418 2.3822 2.887.1591 1.8461-.7342 3.1127-2.3821 3.1127-1.648 0-2.5412-1.2666-2.3821-3.1127Z' fill='%234B280E'/%3E%3Cellipse cx='11.1978' cy='5.6997' rx='1.3999' ry='1.6999' fill='%231C1C1D'/%3E%3Cellipse cx='4.7979' cy='5.6997' rx='1.3999' ry='1.6999' fill='%231C1C1D'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.3528 3.166a1.4744 1.4744 0 0 0-1.8591-.3279.4.4 0 1 1-.3976-.6941c.9527-.5457 2.1592-.333 2.8678.5056a.4.4 0 0 1-.6111.5163ZM5.4998 2.8381a1.4744 1.4744 0 0 0-1.859.3278.4.4 0 0 1-.6111-.5162c.7085-.8387 1.915-1.0514 2.8677-.5057a.4.4 0 0 1-.3976.6941Z' fill='%23E0761A'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23FF5758' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FF5758' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5262 10.9226) scale(10.1818)'%3E%3Cstop stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23FFF287' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3979' y1='2.3999' x2='13.5973' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23F68628'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.002 0h15.9992v15.9992H-.002z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
		'sad': "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9943 8.0004c0 4.4181-3.5815 7.9996-7.9996 7.9996-4.418 0-7.9996-3.5815-7.9996-7.9996 0-4.418 3.5816-7.9995 7.9996-7.9995 4.4181 0 7.9996 3.5815 7.9996 7.9995Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M15.9943 8.0004c0 4.4181-3.5815 7.9996-7.9996 7.9996-4.418 0-7.9996-3.5815-7.9996-7.9996 0-4.418 3.5816-7.9995 7.9996-7.9995 4.4181 0 7.9996 3.5815 7.9996 7.9995Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.8'/%3E%3Cpath d='M12.3964 9.0861c0 1.1142-.3999 1.1142-1.1999 1.1142-.7999 0-1.2 0-1.2-1.1142 0-.8205.5373-1.4856 1.2-1.4856s1.1999.6651 1.1999 1.4856ZM5.9965 9.0861c0 1.1142-.4 1.1142-1.1999 1.1142-.8 0-1.2 0-1.2-1.1142 0-.8205.5373-1.4856 1.2-1.4856s1.2.6651 1.2 1.4856Z' fill='%231C1C1D'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.9946 11.2002c1.6447 0 2.3999 1.0936 2.3999 1.4122 0 .1095-.084.1877-.2248.1877-.3152 0-.752-.4-2.1751-.4s-1.8599.4-2.175.4c-.1409 0-.2249-.0782-.2249-.1877 0-.3186.7552-1.4122 2.3999-1.4122Z' fill='%234B280E'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.7861 6.3078a3.3942 3.3942 0 0 1 1.8777 1.0409.4.4 0 0 0 .5892-.5411 4.1944 4.1944 0 0 0-2.3202-1.2862.4.4 0 1 0-.1467.7864ZM5.206 6.3078a3.3946 3.3946 0 0 0-1.8777 1.0409.4.4 0 1 1-.5891-.5411 4.1946 4.1946 0 0 1 2.3202-1.2862.4.4 0 0 1 .1467.7864Z' fill='%23E0761A'/%3E%3Cg filter='url(%23filter0_i_15251_63610)'%3E%3Cpath d='M2.9952 11.2004c-.2647-.003-.435.1598-1.1536 1.3088-.3267.5231-.6468 1.0515-.6468 1.691 0 .994.8 1.7999 1.8 1.7999.9999 0 1.8008-.8 1.8008-1.7999 0-.6395-.32-1.1679-.6468-1.691-.7186-1.149-.8887-1.3118-1.1536-1.3088Z' fill='%2302ADFC' fill-opacity='.9'/%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23FF5758' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FF5758' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5287 10.9195) scale(10.1818)'%3E%3Cstop stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23FFF287' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.395' y1='2.4007' x2='13.5944' y2='13.6001' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFF287'/%3E%3Cstop offset='1' stop-color='%23F68628'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.003.0009h15.9993v15.9984H-.003z'/%3E%3C/clipPath%3E%3Cfilter id='filter0_i_15251_63610' x='1.1948' y='11.2003' width='3.6006' height='4.7998' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'/%3E%3CfeColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation='1.1999'/%3E%3CfeComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1'/%3E%3CfeColorMatrix values='0 0 0 0 0.278431 0 0 0 0 0.196078 0 0 0 0 0.952941 0 0 0 0.1 0'/%3E%3CfeBlend in2='shape' result='effect1_innerShadow_15251_63610'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E",
		'angry': "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9972 7.9996c0 4.418-3.5815 7.9996-7.9996 7.9996-4.418 0-7.9996-3.5816-7.9996-7.9996S3.5796 0 7.9976 0c4.4181 0 7.9996 3.5815 7.9996 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M15.9972 7.9996c0 4.418-3.5815 7.9996-7.9996 7.9996-4.418 0-7.9996-3.5816-7.9996-7.9996S3.5796 0 7.9976 0c4.4181 0 7.9996 3.5815 7.9996 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.8'/%3E%3Cpath d='M12.3955 9.0853c0 1.1142-.4 1.1142-1.2 1.1142-.7999 0-1.1999 0-1.1999-1.1143 0-.8205.5372-1.4856 1.1999-1.4856s1.2.6651 1.2 1.4857ZM5.9956 9.0853c0 1.1142-.4 1.1142-1.2 1.1142-.8 0-1.1999 0-1.1999-1.1143 0-.8205.5372-1.4856 1.2-1.4856.6626 0 1.1999.6651 1.1999 1.4857Z' fill='%231C1C1D'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.9936 11.5994c1.3257 0 2.3999.292 2.3999.8023 0 .4234-1.0742.3973-2.3999.3973-1.3256 0-2.3998.0261-2.3998-.3973 0-.5103 1.0742-.8023 2.3998-.8023Z' fill='%234B280E'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.3283 7.0331a.4.4 0 0 0-.5444-.1535c-.4415.2472-1.0866.4228-1.7434.5373-.6488.1132-1.2697.1604-1.6367.1691a.4.4 0 1 0 .0191.7997c.4037-.0096 1.0643-.0602 1.755-.1807.6828-.119 1.4354-.313 1.9969-.6275a.4.4 0 0 0 .1535-.5444ZM2.491 7.0331a.4.4 0 0 1 .5444-.1535c.4416.2472 1.0866.4228 1.7434.5373.6488.1132 1.2697.1604 1.6367.1691a.4.4 0 1 1-.019.7997c-.4038-.0096-1.0643-.0602-1.7551-.1807-.6827-.119-1.4353-.313-1.9968-.6275a.4.4 0 0 1-.1536-.5444Z' fill='%23BC0A26'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.8134' stop-color='%23FA2E3E' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA2E3E' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5272 10.9202) scale(10.1818)'%3E%3Cstop stop-color='%23FFB169'/%3E%3Cstop offset='1' stop-color='%23FFB169' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.396' y1='2.3999' x2='13.5954' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFB169'/%3E%3Cstop offset='1' stop-color='%23FF5758'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.004 0h15.9993v15.9992H-.004z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
		'3': "https://i.ibb.co.com/JKf3Zy5/Screenshot-2024-11-04-233329.png"
	};

	useEffect(() => {
		const user = window.sessionStorage.getItem('user');
		if (user == null) {
			router.push('/login');
		} else {
			var dataUser = JSON.parse(user);

			const checkUser = async (dataUser) => {
				try {
					const checkLogin = await fetch('/api/user/detail', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ id: dataUser?.id }),
					});

					const data = await checkLogin.json();

					if (data?.status == true) {
						sessionStorage.setItem('user', JSON.stringify(data?.data));
						dataUser = data?.data;
					} else {
						sessionStorage.removeItem('user');
						router.push('/login');
					}
				} catch (err) {
					sessionStorage.removeItem('user');
					alert('Tidak dapat terhubung ke server.');
					router.push('/login');
				}
			}

			checkUser(dataUser);
		}
	}, []);

	return (
		<>
			<title>Nugi Template</title>
			<div className="m-4">
				<div className="bg-white p-[10px] rounded-[5px]">
					<div className="form-group">
						<label className="block text-black">Template</label>
						<select className="form-control" onChange={(e) => {
							if (e.target.value == 'comment_1') {
								setStarImage('images/star 1.gif');
							}

							if (e.target.value == 'comment_2') {
								setStarImage('https://i.ibb.co.com/gzKrQf0/download-11.png');
							}

							return setTemplate(e.target.value);
						}} value={template}>
							<option value="comment_1">Komen Biasa</option>
							<option value="comment_2">Komen Biru</option>
						</select>
					</div>
					{template == 'comment_1' ? (
						<div className="form-group">
							<label className="block text-black">Relevan</label>
							<select className="form-control" onChange={(e) => setRelevan(e.target.value)} value={relevan}>
								<option value="false">No</option>
								<option value="true">Yes</option>
							</select>
						</div>
					) : ''}
					{template == 'comment_2' ? (
						<div className="form-group">
							<label className="block text-black">Custom Background URL</label>
							<textarea className="form-control" rows={4} onChange={(e) => setCustomBackground(e.target.value)} value={custom_background} />
						</div>
					) : ''}
					<div className="form-group">
						<label className="block text-black">Profile Image URL</label>
						<textarea className="form-control" rows={4} onChange={(e) => setProfileUrl(e.target.value)} value={profile_url} />
					</div>
					<div className="form-group">
						<div className="flex gap-[10px]">
							<div className="form-group-control">
								<label className="block text-black">Profile Name</label>
								<input className="form-control" onChange={(e) => setProfileName(e.target.value)} value={profile_name} />
							</div>
							<div className="form-group-control">
								<label className="block text-black">Verified Profile</label>
								<select className="form-control" onChange={(e) => setProfileVerified(e.target.value)} value={profile_verified}>
									<option value="false">No</option>
									<option value="true">Yes</option>
								</select>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label className="block text-black">Text</label>
						<textarea className="form-control" rows={4} onChange={(e) => {
							var e_words = e.target.value;
							setWords(e_words);
							e_words = e_words.replaceAll("\n", '<br />');
							e_words = e_words.replaceAll('[link]', '<span class="text-link">');
							e_words = e_words.replaceAll('[/link]', '</span>');

							return setHtmlWords(e_words);
						}} value={words} />
					</div>
					<div className="form-group">
						<label className="block text-black">Star Image</label>
						<select className="form-control" onChange={(e) => setStarImage(e.target.value)} value={star_image}>
							{template == 'comment_1' ? (
								<>
									<option value="images/star 1.gif">Bunga</option>
									<option value="images/star 2.gif">Sarung Tinju</option>
									<option value="images/star 3.gif">Pelampung</option>
									<option value="images/star 4.gif">Papan Panah</option>
									<option value="images/star 5.gif">Surat Cinta</option>
									<option value="images/star 6.gif">Televisi Hijau</option>
									<option value="images/star 7.gif">Pizza</option>
									<option value="images/star 8.gif">Roti Kucing</option>
									<option value="images/star 9.gif">Sepatu Terbang</option>
									<option value="images/star 10.gif">Naga</option>
									<option value="images/star 11.gif">Tangan Metal</option>
									<option value="images/star 12.gif">Ufo Cinta</option>
									<option value="images/star live 1.gif">Live :: Lampu</option>
									<option value="images/star live 2.gif">Live :: Bintang</option>
									<option value="images/star live 3.gif">Live :: Bintang Berputar</option>
									<option value="images/star live 4.gif">Live :: Bintang Naik</option>
									<option value="images/star live 5.gif">Live :: Tepuk Tangan</option>
									<option value="images/star live 6.gif">Live :: 2 Jari</option>
									<option value="images/star live 7.gif">Live :: Bunga</option>
									<option value="images/star live 8.gif">Live :: Naga Mangap</option>
									<option value="images/star live 9.gif">Live :: Topeng 2 Face</option>
									<option value="images/star live 10.gif">Live :: Tangan Berotot</option>
									<option value="images/star live 11.gif">Live :: Kado Bintang</option>
									<option value="images/star live 12.gif">Live :: Awan Pelangi</option>
									<option value="images/star live 13.gif">Live :: Roket</option>
								</>
							) : ''}
							{template == 'comment_2' ? (
								<>
									<option value="https://i.ibb.co.com/gzKrQf0/download-11.png">2 Jari</option>
									<option value="https://i.ibb.co.com/j3Wg3t3/download-21.png">Naga Mangap</option>
									<option value="https://i.ibb.co.com/7nHKqk0/download-5.png">Topeng 2 Face</option>
									<option value="https://i.ibb.co.com/kSK7rJj/download-3.png">Kado Bintang</option>
								</>
							) : ''}
						</select>
					</div>
					<div className="form-group">
						<div className="flex gap-[10px]">
							<div className="form-group-control three">
								<label className="block text-black">Stars</label>
								<input className="form-control" onChange={(e) => setStars(e.target.value)} value={stars} />
							</div>
							{template == 'comment_1' ? (
								<div className="form-group-control three">
									<label className="block text-black">Popular</label>
									<select className="form-control" onChange={(e) => setPopular(e.target.value)} value={popular}>
										<option value="false">No</option>
										<option value="true">Yes</option>
									</select>
								</div>
							) : ''}
							<div className="form-group-control three">
								<label className="block text-black">Weeks</label>
								<input className="form-control" onChange={(e) => setWeeks(e.target.value)} value={weeks} />
							</div>
						</div>
					</div>
					{template == 'comment_1' ? (
						<div className="form-group">
							<div className="flex gap-[10px]">
								<div className="form-group-control three">
									<label className="block text-black">Minutes</label>
									<input className="form-control" onChange={(e) => setMinutes(e.target.value)} value={minutes} />
								</div>
								<div className="form-group-control three">
									<label className="block text-black">Reaction</label>
									<input className="form-control" onChange={(e) => setReactions(e.target.value)} value={reaction} />
								</div>
								<div className="form-group-control three">
									<label className="block text-black">Reaction Type</label>
									<select className="form-control" onChange={(e) => setReactionType(e.target.value)} value={reaction_type}>
										<option value="">No</option>
										<option value="like">Like</option>
										<option value="love">Love</option>
										<option value="care">Care</option>
										<option value="haha">Haha</option>
										<option value="wow">Wow</option>
										<option value="sad">Sad</option>
										<option value="angry">Angry</option>
										<option value="3">3 Reaction</option>
									</select>
								</div>
							</div>
						</div>
					) : ''}
					<div className="form-group">
						<button className="text-white bg-black px-[10px] py-[5px] rounded-[5px]" onClick={() => {
							toJpeg(elementRef.current, { quality: 0.95 })
								.then((dataUrl) => {
									const link = document.createElement("a");
									link.download = "Result.jpeg";
									link.href = dataUrl;
									link.click();
									link.remove();
								})
								.catch((err) => {
									console.log(err);
								});
						}}>Download Results</button>
					</div>
				</div>
			</div>
			<div className="m-4">
				{template == 'comment_1' ? (
					<div ref={elementRef} className="bg-white pl-[10px] pt-[10px] pr-[10px] w-[510px]">
						{relevan == 'true' ? (
							<div className="mb-[10px] flex gap-[5px]">
								<span className="text-[#020305] text-[15px] font-bold my-auto">Paling Relevan</span>
								<img src="https://i.ibb.co.com/3k52rBq/image.png" className="my-auto" alt="" border="0" />
							</div>
						) : ''}
						<div className="flex gap-[10px]">
							{profile_url != '' ? (
								<img
									src={profile_url}
									className="w-[50px] h-[50px] rounded-full" />
							) : ''}
							<div className="bg-[#E9EAEE] p-[10px] rounded-[15px]">
								<div className="flex gap-[5px]">
									<img
										src="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/RspGykINsgP.png?_nc_eui2=AeHt7nr8BOHcFXVHdNHVrGcQiSgyKapSUE2JKDIpqlJQTW6-Vc-phyiP-ONOiCd3qwbaNQsagNSU8ACwEgpI8yPL"
										className="w-[12px] h-[12px] my-auto" />
									<span className="text-[#5F6575] text-[13px] font-bold">Pengirim Bintang</span>
								</div>
								<div className="flex gap-[5px]">
									<span className="text-[#020305] text-[15px] font-bold my-auto">{profile_name}</span>
									{profile_verified == 'true' ? (
										<img className="w-[15px] my-auto"
											src="https://i.ibb.co.com/PMv7v51/Screenshot-20241030-115016-removebg-preview.png" alt="" />
									) : ''}
								</div>
								<div className="mt-[-3px]">
									<p className="text-[18px] text-[#020305] max-w-full leading-[19px]" dangerouslySetInnerHTML={{
										__html: html_words
									}}></p>
								</div>
							</div>
						</div>
						<div className="ml-[60px]">
							{star_image != '' ? (
								<div className="ml-[10px] mt-[10px]">
									<img src={star_image} className="max-w-[80px] my-[10px]" />
								</div>
							) : ''}
							<div className="flex gap-[5px]">
								{stars != 0 ? (
									<>
										<img src="https://i.ibb.co.com/syTh8gQ/image.png" className="w-[24px] h-[24px] ml-[-3px] my-auto" />
										<span className="text-[#A65F1D] text-[16px] font-bold ml-[-3px]">Mengirim {stars} Bintang</span>
									</>
								) : ''}
								{popular == 'true' ? (
									<>
										<span className="text-[#5F6064] text-[10px] mx-[3px] my-auto">•</span>
										<img src="https://i.ibb.co.com/60gH2Pb/image.png" className="w-[20px] h-[20px] mr-[3px] my-auto" />
										<span className="text-[#5F6064] text-[16px] font-bold ml-[-3px]">Popular</span>
									</>
								) : ''}
								{weeks != 0 ? (
									<>
										<span className="text-[#5F6064] text-[10px] mx-[3px] my-auto">•</span>
										<img src="https://i.ibb.co.com/WPsv6Bf/Screenshot-2024-11-04-223703.png" className="w-[20px] h-[20px] ml-[-3px] my-auto" />
										<span className="text-[#c66f1e] text-[16px] font-bold ml-[-3px]">{weeks} minggu</span>
									</>
								) : ''}
							</div>
							<div className="flex gap-[10px]">
								<span className="text-[#5F6064] text-[15px] ml-[15px] my-auto">{minutes}</span>
								<span className="text-[#5F6064] text-[15px] font-bold ml-[13px] my-auto">Suka</span>
								<span className="text-[#5F6064] text-[15px] font-bold ml-[13px] my-auto">Balas</span>
								{reaction != 0 ? (
									<span className="ml-auto text-[#5F6064] text-[15px] my-auto">{reaction}</span>
								) : ''}
								{reaction_type != '' ? (
									<img src={reactions[reaction_type]} className={`ml-[-7px] ${reaction_type == '3' ? 'w-[52px]' : 'w-[18px]'} my-auto`} alt="" />
								) : ''}
							</div>
						</div>
					</div>
				) : ''}
				{template == 'comment_2' ? (
					<div ref={elementRef} className="p-[10px] w-[490px]" style={{
						backgroundImage: `url("${custom_background}")`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover'
					}}>
						<div className="flex gap-[10px]">
							{profile_url != '' ? (
								<img
									src={profile_url}
									className="w-[50px] h-[50px] rounded-full" />
							) : ''}
							<div>
								<div class="bg-gradient-to-r from-[#0250a2] to-[#022452] p-[10px] rounded-tl-[15px] rounded-tr-[15px]">
									<div class="flex gap-[5px]">
										<span class="text-white text-[15px] font-bold my-auto">{profile_name}</span>
										{profile_verified == 'true' ? (
											<img className="w-[15px] my-auto"
												src="https://i.ibb.co.com/PMv7v51/Screenshot-20241030-115016-removebg-preview.png" alt="" />
										) : ''}
										<div class="bg-white bg-opacity-[0.15] p-[3px] rounded-[5px] my-auto">
											<img class="w-[15px]" src="https://i.ibb.co.com/3fHYHV7/w-Bv-Mv-UH-RYi.png" alt="" />
										</div>
									</div>
									<div class="mt-[5px] flex">
										<p class="text-white text-[18px]" dangerouslySetInnerHTML={{
											__html: html_words
										}}></p>
										<img src={star_image} class="mt-[10px]" alt="" />
									</div>
								</div>
								<div class="bg-gradient-to-r from-[#1370b1] to-[#284b6f] p-[10px] rounded-bl-[15px] rounded-br-[15px]">
									<div class="flex gap-[5px]">
										{stars != 0 ? (
											<>
												<i class="icon-star my-auto"></i>
												<span class="text-white text-[14px] font-semibold">{`Mengirim ${stars} Bintang`}</span>
											</>
										) : ''}
										{weeks != 0 ? (
											<>
												<span class="text-white text-[10px] font-semibold my-auto">•</span>
												<i class="icon-fire my-auto"></i>
												<span class="text-white text-[14px] font-semibold">{`${weeks} minggu`}</span>
											</>
										) : ''}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : ''}
			</div>
		</>
	);
}
