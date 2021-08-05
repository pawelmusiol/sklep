import {useRouter} from "next/router"

const usePre = () => {
	let router = useRouter()
	let path = router.pathname

	if (path === "/") {
		return "/"
	}
	else if (path.split("/").length === 1) {
		return "/"
	}
	else if (path.split("/").length > 1) {
		let pre = ""
		for (let i = 1; i < path.split("/").length; i++) {
			pre += "../"
		}
		return pre
	}
}

export default usePre