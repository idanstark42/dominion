import heb from '../heb.js'

export function translate(str) {
	return heb[str] || str
}