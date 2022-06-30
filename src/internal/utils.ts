/**
 * Copyright Trian Damai 2022
 * triandamai@gmail.com
 * 
*/
export function safe_not_equal(a:any|null, b:any|null) {

	return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}